import Stripe from "stripe";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: Request) {
  try {
    const { cart, method } = await req.json();

    const total = cart.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0,
    );

    // STRIPE PAYMENT
    if (method === "stripe") {
      const line_items = cart.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/panier`,
      });

      return new Response(JSON.stringify({ url: session.url }), {
        status: 200,
      });
    }

    // MOBILE MONEY (FLUTTERWAVE)
    if (method === "mobilemoney") {
      // Exemple simplifié pour mobilemoney avec opérateur dynamique
      const response = await axios.post(
        "https://api.flutterwave.com/v3/payments",
        {
          tx_ref: "tx_" + Date.now(),
          amount: total,
          currency: "RWF",
          redirect_url: `${process.env.NEXT_PUBLIC_URL}/success`,
          // Ici on met l'opérateur choisi par le frontend
          payment_options:
            method === "mobilemoney"
              ? "mobilemoneyrwanda,mobilemoneyuganda,mobilemoneyzambia"
              : "card",
          customer: {
            email: "client@example.com", // Tu peux passer email du front
            phonenumber: "0780000000", // Ou du front
            name: "Client",
          },
          meta: { cart },
          customizations: {
            title: "LENGO ENGINEERING",
            description: "Paiement commande",
            logo: `${process.env.NEXT_PUBLIC_URL}/logo.png`,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      return new Response(
        JSON.stringify({
          url: response.data.data.link,
        }),
        { status: 200 },
      );
    }

    return new Response(JSON.stringify({ error: "Méthode inconnue" }), {
      status: 400,
    });
  } catch (err) {
    console.error(err);

    return new Response(JSON.stringify({ error: "Erreur lors du paiement" }), {
      status: 500,
    });
  }
}
