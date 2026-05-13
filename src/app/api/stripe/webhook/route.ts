import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
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

        await db
          .update(users)
          .set({
            subscriptionTier: tier,
            stripeSubscriptionId: subscription.id,
            stripePriceId: priceId ?? null,
            stripeCurrentPeriodEnd: new Date(
              subscriptionItem.current_period_end * 1000,
            ),
          })
          .where(eq(users.id, userId));

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
        const [user] = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.stripeCustomerId, customerId))
          .limit(1);

        if (!user) {
          console.error("No user found for customer:", customerId);
          break;
        }

        await db
          .update(users)
          .set({
            subscriptionTier: tier,
            stripePriceId: priceId ?? null,
            stripeCurrentPeriodEnd: new Date(
              subscriptionItem.current_period_end * 1000,
            ),
          })
          .where(eq(users.id, user.id));

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const [user] = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.stripeCustomerId, customerId))
          .limit(1);

        if (!user) {
          console.error("No user found for customer:", customerId);
          break;
        }

        await db
          .update(users)
          .set({
            subscriptionTier: "free",
            stripeSubscriptionId: null,
            stripePriceId: null,
            stripeCurrentPeriodEnd: null,
          })
          .where(eq(users.id, user.id));

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
