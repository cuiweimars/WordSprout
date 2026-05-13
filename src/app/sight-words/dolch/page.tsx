import { Metadata } from "next";
import Link from "next/link";
import { dolchGrades } from "@/data/dolch-words";

export const metadata: Metadata = {
  title: "Dolch Sight Words — Complete List by Grade Level",
  description:
    "All 220 Dolch sight words organized by grade level (Pre-Primer through 3rd Grade). Free flashcards, worksheets, and games for each list.",
};

export default function DolchPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-heading text-4xl font-bold text-sprout-700 mb-4">
        Dolch Sight Words
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-3xl">
        The Dolch word list contains 220 &ldquo;sight words&rdquo; that children should recognize
        instantly. Compiled by Edward William Dolch in 1936, these words make up 50-75% of all
        text in children&apos;s books.
      </p>

      <div className="space-y-6">
        {dolchGrades.map((g) => (
          <div key={g.slug} className="bg-white rounded-2xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-gray-800">
                  {g.name}
                </h2>
                <p className="text-sm text-gray-500">{g.words.length} words</p>
              </div>
              <Link
                href={`/sight-words/dolch/${g.slug}`}
                className="bg-sprout-500 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-sprout-600 transition-colors"
              >
                View List
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.words.map((w) => (
                <Link
                  key={w.slug}
                  href={`/sight-words/word/${w.slug}`}
                  className="px-3 py-1 rounded-full bg-sprout-50 text-sprout-700 text-sm font-medium hover:bg-sprout-100 transition-colors"
                >
                  {w.text}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
