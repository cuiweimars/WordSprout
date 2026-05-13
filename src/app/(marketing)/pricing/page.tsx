import { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { CheckoutButton } from "@/components/payment/checkout-button";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Pricing — Affordable Sight Word Learning",
  description: "Free sight word learning for everyone. Upgrade to Pro for unlimited access to games, worksheets, and progress tracking.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "40 Dolch Pre-Primer words",
      "Word Match game",
      "3 PDF prints per month",
      "1 student profile",
    ],
    cta: "Get Started",
    href: "/auth/sign-up",
    highlighted: false,
    tier: null,
    priceId: null,
  },
  {
    name: "Pro",
    price: `$${siteConfig.pricing.pro.monthly}`,
    period: "/month",
    features: [
      "All 1,000+ sight words",
      "All 6 games",
      "Unlimited PDF prints",
      "5 student profiles",
      "Progress tracking",
      "Parent weekly reports",
      "Voice read-aloud",
      "No ads",
    ],
    cta: "Start Free Trial",
    href: "/auth/sign-up",
    highlighted: true,
    tier: "pro" as const,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID ?? "",
  },
  {
    name: "Teacher",
    price: `$${siteConfig.pricing.teacher.monthly}`,
    period: "/month",
    features: [
      "Everything in Pro",
      "40 student profiles",
      "Custom word lists",
      "Class progress dashboard",
      "Batch printing",
      "Student assessment reports",
    ],
    cta: "Start Free Trial",
    href: "/auth/sign-up",
    highlighted: false,
    tier: "teacher" as const,
    priceId: process.env.NEXT_PUBLIC_STRIPE_TEACHER_MONTHLY_PRICE_ID ?? "",
  },
];

export default async function PricingPage() {
  const session = await auth();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold text-center text-gray-800 mb-4">
        Simple, Affordable Pricing
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Start for free and upgrade when you need more. Every plan includes our core sight word learning tools.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-6 border-2 ${
              plan.highlighted
                ? "border-sprout-500 bg-sprout-50 shadow-lg"
                : "border-gray-200 bg-white"
            }`}
          >
            {plan.highlighted && (
              <p className="text-sprout-600 font-bold text-sm mb-2">Most Popular</p>
            )}
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-1">
              {plan.name}
            </h2>
            <p className="text-3xl font-bold text-gray-800 mb-1">
              {plan.price}
              <span className="text-base font-normal text-gray-500">{plan.period}</span>
            </p>
            <ul className="mt-4 space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-sprout-500 mt-0.5">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>

            {plan.tier && plan.priceId ? (
              <CheckoutButton
                priceId={plan.priceId}
                tier={plan.tier}
                className={`block w-full text-center font-medium py-3 rounded-full transition-colors ${
                  plan.highlighted
                    ? "bg-sprout-500 text-white hover:bg-sprout-600"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-sprout-300"
                }`}
              >
                {plan.cta}
              </CheckoutButton>
            ) : (
              <a
                href={plan.href}
                className={`block text-center font-medium py-3 rounded-full transition-colors ${
                  plan.highlighted
                    ? "bg-sprout-500 text-white hover:bg-sprout-600"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-sprout-300"
                }`}
              >
                {plan.cta}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
