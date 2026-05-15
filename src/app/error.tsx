"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-6">😵</div>
      <h1 className="font-heading text-3xl font-bold text-gray-800 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-8">
        We hit an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        className="bg-sprout-500 text-white font-heading font-bold px-6 py-3 rounded-full hover:bg-sprout-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
