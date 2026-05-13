import { Metadata } from "next";
import { dolchGrades } from "@/data/dolch-words";
import { fryGroups } from "@/data/fry-words";
import { FlashcardSession } from "@/components/flashcards/flashcard-session";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flashcard Practice",
  description:
    "Practice sight words with interactive flashcards. Flip, listen, and track your progress.",
};

export default function LearnFlashcardsPage() {
  // Default: show Dolch Pre-Primer words for unauthenticated access
  const defaultCards = dolchGrades[0].words.map((w) => ({
    wordId: w.slug,
    wordText: w.text,
    slug: w.slug,
    exampleSentence: w.exampleSentence,
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/learn"
          className="text-sm text-gray-500 hover:text-sprout-600 transition-colors"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      <h1 className="font-heading text-3xl font-bold text-gray-800 mb-2">
        Flashcard Practice
      </h1>
      <p className="text-gray-600 mb-8">
        Flip each card, listen to the pronunciation, then mark whether you got
        it right. Cards will reappear based on how well you know them.
      </p>

      {/* Word list selector */}
      <div className="mb-8">
        <h2 className="font-heading font-bold text-gray-700 mb-3">
          Choose a word list
        </h2>
        <div className="flex flex-wrap gap-2">
          {dolchGrades.map((g) => (
            <span
              key={g.slug}
              className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                g.slug === "pre-primer"
                  ? "bg-sprout-500 text-white"
                  : "bg-sprout-50 text-sprout-700 hover:bg-sprout-100"
              }`}
            >
              {g.name} ({g.words.length})
            </span>
          ))}
          {fryGroups.map((g) => (
            <span
              key={g.slug}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-sky-50 text-sky-700 hover:bg-sky-100 cursor-pointer transition-colors"
            >
              Fry {g.name} ({g.words.length})
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Sign in to save your progress and unlock all word lists
        </p>
      </div>

      {/* Session */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8">
        <div className="mb-4 text-sm text-gray-500">
          Dolch Pre-Primer &middot; {defaultCards.length} words
        </div>
        <FlashcardSession cards={defaultCards} type="new" />
      </div>
    </div>
  );
}
