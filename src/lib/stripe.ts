import Stripe from "stripe";
import { siteConfig } from "@/data/site-config";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY environment variable is required");
    }
    _stripe = new Stripe(key, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    });
  }
  return _stripe;
}

// ─── Valid price IDs for whitelist validation ────────────────

const VALID_PRICE_IDS = new Set([
  process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID,
  process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID,
  process.env.NEXT_PUBLIC_STRIPE_TEACHER_MONTHLY_PRICE_ID,
  process.env.NEXT_PUBLIC_STRIPE_TEACHER_ANNUAL_PRICE_ID,
].filter(Boolean));

export function isValidPriceId(priceId: string): boolean {
  return VALID_PRICE_IDS.has(priceId);
}

// ─── Price ID to tier mapping ─────────────────────────────────

export const priceToTier: Record<string, "pro" | "teacher"> = {
  [process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID!]: "pro",
  [process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID!]: "pro",
  [process.env.NEXT_PUBLIC_STRIPE_TEACHER_MONTHLY_PRICE_ID!]: "teacher",
  [process.env.NEXT_PUBLIC_STRIPE_TEACHER_ANNUAL_PRICE_ID!]: "teacher",
};

// ─── Helper functions ─────────────────────────────────────────

interface CreateCheckoutParams {
  userId: string;
  email: string;
  priceId: string;
  tier: "pro" | "teacher";
  customerId?: string;
}

export async function createCheckoutSession({
  userId,
  email,
  priceId,
  tier,
  customerId,
}: CreateCheckoutParams) {
  const baseUrl = siteConfig.url;

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/learn?success=true`,
    cancel_url: `${baseUrl}/pricing?canceled=true`,
    client_reference_id: userId,
    customer_email: customerId ? undefined : email,
    customer: customerId ?? undefined,
    metadata: {
      userId,
      tier,
    },
    subscription_data: {
      metadata: {
        userId,
        tier,
      },
    },
  });

  return session;
}

export async function createCustomerPortalSession(customerId: string) {
  const baseUrl = siteConfig.url;

  const session = await getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: `${baseUrl}/pricing`,
  });

  return session;
}

export function getSubscriptionPriceIds(tier: "pro" | "teacher") {
  if (tier === "pro") {
    return {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID!,
      annual: process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID!,
    };
  }
  return {
    monthly: process.env.NEXT_PUBLIC_STRIPE_TEACHER_MONTHLY_PRICE_ID!,
    annual: process.env.NEXT_PUBLIC_STRIPE_TEACHER_ANNUAL_PRICE_ID!,
  };
}
