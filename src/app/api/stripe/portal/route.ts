import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabase } from "@/db";
import { createCustomerPortalSession } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Look up the user's Stripe customer ID
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", session.user.id)
      .maybeSingle();

    if (userError) {
      console.error("Supabase user lookup error:", userError);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 },
      );
    }

    if (!user?.stripe_customer_id) {
      return NextResponse.json(
        { error: "No billing account found" },
        { status: 400 },
      );
    }

    const portalSession = await createCustomerPortalSession(
      user.stripe_customer_id,
    );

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Stripe portal error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 },
    );
  }
}
