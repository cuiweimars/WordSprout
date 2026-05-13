import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sight Word Flashcards — Interactive & Printable",
  description:
    "Free sight word flashcards for Pre-K through 3rd Grade. Practice online with interactive cards or print them at home.",
};

export default function FlashcardsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
        Sight Word Flashcards
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Practice sight words with our interactive digital flashcards or download printable
        flashcards to use at home or in the classroom.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-sprout-50 rounded-2xl p-6 border border-sprout-200">
          <h2 className="font-heading text-xl font-bold text-sprout-700 mb-3">
            🃏 Interactive Flashcards
          </h2>
          <p className="text-gray-600 mb-4">
            Flip through digital flashcards with audio pronunciation and smart spaced repetition.
          </p>
          <Link
            href="/learn/flashcards"
            className="inline-block bg-sprout-500 text-white font-medium px-5 py-2 rounded-full hover:bg-sprout-600 transition-colors"
          >
            Start Practicing
          </Link>
        </div>
        <div className="bg-sky-50 rounded-2xl p-6 border border-sky-200">
          <h2 className="font-heading text-xl font-bold text-sky-600 mb-3">
            🖨️ Printable Flashcards
          </h2>
          <p className="text-gray-600 mb-4">
            Download and print flashcards for Dolch and Fry sight word lists. Customizable by grade level.
          </p>
          <Link
            href="/flashcards/printable"
            className="inline-block bg-sky-500 text-white font-medium px-5 py-2 rounded-full hover:bg-sky-600 transition-colors"
          >
            Print Flashcards
          </Link>
        </div>
      </div>
    </div>
  );
}
