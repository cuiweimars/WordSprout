import { Metadata } from "next";
import Link from "next/link";
import { fryGroups } from "@/data/fry-words";

export const metadata: Metadata = {
  title: "Fry Sight Words — First 300 Words by Frequency",
  description:
    "The first 300 Fry sight words by frequency. These words cover about 67% of all reading material. Free flashcards and worksheets.",
};

export default function FryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-heading text-4xl font-bold text-sky-600 mb-4">
        Fry Sight Words
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-3xl">
        The Fry word list (or &ldquo;instant words&rdquo;) contains the 1,000 most frequently used
        words in English. The first 300 words alone make up approximately 67% of all written material.
      </p>

      <div className="space-y-6">
        {fryGroups.map((g) => (
          <div key={g.slug} className="bg-white rounded-2xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-gray-800">
                  Fry {g.name}
                </h2>
                <p className="text-sm text-gray-500">{g.words.length} words</p>
              </div>
              <Link
                href={`/sight-words/fry/${g.slug}`}
                className="bg-sky-500 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-sky-600 transition-colors"
              >
                View List
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.words.slice(0, 30).map((w) => (
                <Link
                  key={w.slug}
                  href={`/sight-words/word/${w.slug}`}
                  className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-sm font-medium hover:bg-sky-100 transition-colors"
                >
                  {w.text}
                </Link>
              ))}
              {g.words.length > 30 && (
                <Link
                  href={`/sight-words/fry/${g.slug}`}
                  className="px-3 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium"
                >
                  +{g.words.length - 30} more →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
