import { Resend } from "resend";
import { NextResponse } from "next/server";

interface ContactBody {
  nombre?: string;
  marca?: string;
  email?: string;
  interes?: string;
  presupuesto?: string;
  mensaje?: string;
  web?: string; // campo trampa
}

export async function POST(req: Request) {
  const body = (await req.json()) as ContactBody;

  // Si el campo trampa viene lleno, es un bot: respondemos "ok" sin enviar nada
  if (body.web) return NextResponse.json({ ok: true });

  const { nombre, marca, email, interes, presupuesto, mensaje } = body;
  if (!nombre || !marca || !email || !interes || !mensaje) {
    return NextResponse.json(
      { error: "Completa todos los campos obligatorios." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "El correo no es válido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "El envío de correos todavía no está configurado." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // Con onboarding@resend.dev puedes probar sin dominio propio.
    // Al verificar tu dominio en Resend, cámbialo por hola@tudominio.com
    from: "Portafolio <onboarding@resend.dev>",
    to,
    replyTo: email, // Al pulsar "Responder" escribes directo a la marca
    subject: `Nueva propuesta de ${marca}: ${interes}`,
    text: [
      `Nombre: ${nombre}`,
      `Marca: ${marca}`,
      `Correo: ${email}`,
      `Tipo de alianza: ${interes}`,
      `Presupuesto: ${presupuesto || "No indicado"}`,
      "",
      mensaje,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
