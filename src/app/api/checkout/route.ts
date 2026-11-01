import Stripe from "stripe";
import { NextResponse } from "next/server";
import { artworks } from "@/data/artworks";

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Los pagos todavía no están configurados." },
      { status: 500 }
    );
  }

  const { artworkId } = (await req.json()) as { artworkId?: string };
  const art = artworks.find((a) => a.id === artworkId && a.available);
  if (!art) {
    return NextResponse.json(
      { error: "Esta obra ya no está disponible." },
      { status: 404 }
    );
  }

  const stripe = new Stripe(secretKey);
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: art.currency,
            unit_amount: Math.round(art.price * 100),
            product_data: {
              name: `${art.title} (${art.year})`,
              description: `${art.medium}, ${art.dimensions}`,
            },
          },
        },
      ],
      // Stripe te pide la dirección de envío en el pago
      shipping_address_collection: {
        allowed_countries: ["MX", "US", "ES", "FR", "GB", "CO", "AR", "CL", "DE", "IT"],
      },
      success_url: `${origin}/?compra=exitosa#coleccion`,
      cancel_url: `${origin}/#coleccion`,
    });

    return NextResponse.json({ url: session.url });
  } catch (stripeError) {
    // Muestra el error real en la terminal para poder depurarlo
    console.error("Stripe error:", stripeError);
    return NextResponse.json(
      { error: "No se pudo crear el pago. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
