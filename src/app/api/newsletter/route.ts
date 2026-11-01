import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = (await req.json()) as { email?: string };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "El correo no es válido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "La suscripción todavía no está configurada." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Portafolio <onboarding@resend.dev>",
    to,
    subject: "Nueva suscripción al newsletter",
    text: `Nuevo suscriptor: ${email}`,
  });

  if (error) {
    return NextResponse.json(
      { error: "No se pudo completar la suscripción." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
