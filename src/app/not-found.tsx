import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-sprout-400 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! We couldn&apos;t find this page.
        </p>
        <Link
          href="/"
          className="bg-sprout-500 text-white font-medium px-6 py-3 rounded-full hover:bg-sprout-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
