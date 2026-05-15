import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WordSprout — 100% Free Sight Word Learning",
  description:
    "All sight word learning tools are completely free — flashcards, games, worksheets, and progress tracking. No credit card required.",
};

export default function PricingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sprout-100 mb-6">
        <span className="text-4xl">🌱</span>
      </div>
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
        Everything Is Free
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        WordSprout is currently in beta — all features are free for everyone.
        Flashcards, games, worksheets, and progress tracking. No credit card
        required.
      </p>
      <div className="bg-white rounded-2xl border p-8 text-left mb-8">
        <h2 className="font-heading font-bold text-lg text-gray-800 mb-4 text-center">
          What you get (for free!)
        </h2>
        <ul className="space-y-3 max-w-md mx-auto">
          {[
            "Dolch 220 + Fry 300 sight words",
            "All 6 interactive games",
            "Printable flashcards & worksheets",
            "Unlimited PDF downloads",
            "Progress tracking with SRS",
            "Student profiles",
            "Text-to-speech read-aloud",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2 text-gray-600">
              <span className="text-sprout-500 mt-0.5">&#10003;</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <Link
        href="/sight-words"
        className="inline-block bg-sprout-500 text-white font-heading font-bold px-8 py-3 rounded-full hover:bg-sprout-600 transition-colors"
      >
        Start Learning Now
      </Link>
    </div>
  );
}
