import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type LineItem = {
  name: string;
  type: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
};

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);

  let items: LineItem[];
  try {
    const body = await req.json();
    items = body.items;
    if (!Array.isArray(items) || items.length === 0) throw new Error("Empty cart");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: `${item.name} — Size ${item.size}`,
          description: item.type,
          images: item.image.startsWith("/") ? [] : [item.image],
        },
      },
    })),
    shipping_address_collection: { allowed_countries: ["US", "MX", "ES", "GB", "FR", "DE"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: lang_ship("Standard"),
          delivery_estimate: { minimum: { unit: "business_day", value: 7 }, maximum: { unit: "business_day", value: 14 } },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 1800, currency: "usd" },
          display_name: lang_ship("Express"),
          delivery_estimate: { minimum: { unit: "business_day", value: 3 }, maximum: { unit: "business_day", value: 5 } },
        },
      },
    ],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${origin}/checkout`,
  });

  return NextResponse.json({ url: session.url });
}

function lang_ship(label: string) {
  return label === "Standard" ? "Standard Shipping (7–14 days)" : "Express Shipping (3–5 days)";
}
