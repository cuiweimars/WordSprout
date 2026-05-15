import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { supabase } from "@/db";
import { stripe, priceToTier } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id ?? session.metadata?.userId;

        if (!userId) {
          console.error("No userId in checkout session:", session.id);
          break;
        }

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
        );

        const subscriptionItem = subscription.items.data[0];
        const priceId = subscriptionItem?.price.id;
        const tier = priceId ? priceToTier[priceId] : undefined;

        if (!tier) {
          console.error("Unknown price ID:", priceId);
          break;
        }

        const { error: updateError } = await supabase
          .from("users")
          .update({
            subscription_tier: tier,
            stripe_subscription_id: subscription.id,
            stripe_price_id: priceId ?? null,
            stripe_current_period_end: new Date(
              subscriptionItem.current_period_end * 1000,
            ).toISOString(),
          })
          .eq("id", userId);

        if (updateError) {
          console.error("Supabase update error (checkout completed):", updateError);
        }

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const subscriptionItem = subscription.items.data[0];
        const priceId = subscriptionItem?.price.id;
        const tier = priceId ? priceToTier[priceId] : undefined;

        if (!tier) {
          console.error("Unknown price ID in subscription update:", priceId);
          break;
        }

        // Look up user by Stripe customer ID
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .maybeSingle();

        if (userError) {
          console.error("Supabase user lookup error:", userError);
          break;
        }

        if (!user) {
          console.error("No user found for customer:", customerId);
          break;
        }

        const { error: updateError } = await supabase
          .from("users")
          .update({
            subscription_tier: tier,
            stripe_price_id: priceId ?? null,
            stripe_current_period_end: new Date(
              subscriptionItem.current_period_end * 1000,
            ).toISOString(),
          })
          .eq("id", user.id);

        if (updateError) {
          console.error("Supabase update error (subscription updated):", updateError);
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: user, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .maybeSingle();

        if (userError) {
          console.error("Supabase user lookup error:", userError);
          break;
        }

        if (!user) {
          console.error("No user found for customer:", customerId);
          break;
        }

        const { error: updateError } = await supabase
          .from("users")
          .update({
            subscription_tier: "free",
            stripe_subscription_id: null,
            stripe_price_id: null,
            stripe_current_period_end: null,
          })
          .eq("id", user.id);

        if (updateError) {
          console.error("Supabase update error (subscription deleted):", updateError);
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`Error handling ${event.type}:`, error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
