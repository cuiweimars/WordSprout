import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome Back",
  description: "Sign in to your WordSprout account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
