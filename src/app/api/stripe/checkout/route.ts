import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabase } from "@/db";
import { stripe, createCheckoutSession } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId, tier } = await req.json();

    if (!priceId || !tier) {
      return NextResponse.json(
        { error: "priceId and tier are required" },
        { status: 400 },
      );
    }

    if (tier !== "pro" && tier !== "teacher") {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    // Look up the user
    const { data: user, error: userError } = await supabase
      .from("users")
      .select()
      .eq("id", session.user.id)
      .maybeSingle();

    if (userError) {
      console.error("Supabase user lookup error:", userError);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 },
      );
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let customerId = user.stripe_customer_id;

    // Create a Stripe customer if one doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: {
          userId: user.id,
        },
      });

      customerId = customer.id;

      // Save the customer ID to the database
      const { error: updateError } = await supabase
        .from("users")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);

      if (updateError) {
        console.error("Supabase update error:", updateError);
        return NextResponse.json(
          { error: "Failed to save customer ID" },
          { status: 500 },
        );
      }
    }

    // Create the checkout session
    const checkoutSession = await createCheckoutSession({
      userId: user.id,
      email: user.email,
      priceId,
      tier,
      customerId,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
