"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface CheckoutButtonProps {
  priceId: string;
  tier: "pro" | "teacher";
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
}

export function CheckoutButton({
  priceId,
  tier,
  children,
  className,
}: CheckoutButtonProps) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (status !== "authenticated" || !session?.user) return;

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, tier }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  // Not logged in: redirect to sign up
  if (status !== "authenticated") {
    return (
      <Link href="/auth/sign-up" className={className}>
        {children}
      </Link>
    );
  }

  // Logged in: trigger Stripe checkout
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {loading ? "Redirecting..." : children}
    </button>
  );
}
