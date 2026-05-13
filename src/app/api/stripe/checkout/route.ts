import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
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
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let customerId = user.stripeCustomerId;

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
      await db
        .update(users)
        .set({ stripeCustomerId: customerId })
        .where(eq(users.id, user.id));
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
