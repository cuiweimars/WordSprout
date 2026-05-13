import { Metadata } from "next";
import Link from "next/link";
import { dolchGrades } from "@/data/dolch-words";
import { fryGroups } from "@/data/fry-words";
import { grades } from "@/data/grades";

export const metadata: Metadata = {
  title: "Sight Words — Complete List of Dolch & Fry Words",
  description:
    "Free sight word lists for Pre-K through 3rd Grade. Includes Dolch 220 words and Fry 1000 words with flashcards, games, and printable worksheets.",
};

export default function SightWordsHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
        Sight Words
      </h1>
      <p className="text-lg text-gray-600 mb-10 max-w-3xl">
        Sight words are the most frequently used words in children&apos;s books. Mastering these
        words by sight is essential for building reading fluency and confidence.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Dolch */}
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-heading text-2xl font-bold text-sprout-700 mb-4">
            Dolch Sight Words
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            220 words organized by grade level, from Pre-Primer to Third Grade. The most commonly used list in American classrooms.
          </p>
          <div className="space-y-2">
            {dolchGrades.map((g) => (
              <Link
                key={g.slug}
                href={`/sight-words/dolch/${g.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-sprout-50 transition-colors"
              >
                <span className="font-medium text-gray-700">{g.name}</span>
                <span className="text-sm text-gray-500">{g.words.length} words</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Fry */}
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-heading text-2xl font-bold text-sky-600 mb-4">
            Fry Sight Words
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Organized by frequency — the most commonly appearing words in English text. The first 300 words cover ~67% of all reading material.
          </p>
          <div className="space-y-2">
            {fryGroups.map((g) => (
              <Link
                key={g.slug}
                href={`/sight-words/fry/${g.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-sky-50 transition-colors"
              >
                <span className="font-medium text-gray-700">{g.name}</span>
                <span className="text-sm text-gray-500">{g.words.length} words</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* By Grade */}
      <h2 className="font-heading text-2xl font-bold text-gray-800 mb-4">
        Browse by Grade Level
      </h2>
      <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {grades.map((g) => (
          <Link
            key={g.slug}
            href={`/sight-words/${g.slug}`}
            className="block p-4 rounded-xl bg-white border hover:border-sprout-300 hover:shadow-sm transition-all text-center"
          >
            <p className="font-heading font-bold text-lg text-gray-800">{g.name}</p>
            <p className="text-xs text-gray-500">Ages {g.ageRange}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
