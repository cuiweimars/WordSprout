"use client";

import { useState } from "react";
import { dolchGrades } from "@/data/dolch-words";
import { fryGroups } from "@/data/fry-words";
import { FlashcardSession } from "@/components/flashcards/flashcard-session";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface WordListOption {
  key: string;
  label: string;
  count: number;
  words: { wordId: string; wordText: string; slug: string; exampleSentence: string }[];
  color: "sprout" | "sky";
}

const wordLists: WordListOption[] = [
  ...dolchGrades.map((g) => ({
    key: `dolch-${g.slug}`,
    label: `Dolch ${g.name}`,
    count: g.words.length,
    words: g.words.map((w) => ({
      wordId: w.slug,
      wordText: w.text,
      slug: w.slug,
      exampleSentence: w.exampleSentence,
    })),
    color: "sprout" as const,
  })),
  ...fryGroups.map((g) => ({
    key: `fry-${g.slug}`,
    label: `Fry ${g.name}`,
    count: g.words.length,
    words: g.words.map((w) => ({
      wordId: w.slug,
      wordText: w.text,
      slug: w.slug,
      exampleSentence: w.exampleSentence,
    })),
    color: "sky" as const,
  })),
];

export default function LearnFlashcardsPage() {
  const [selectedKey, setSelectedKey] = useState("dolch-pre-primer");

  const selected = wordLists.find((w) => w.key === selectedKey) ?? wordLists[0];

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
          {wordLists.map((wl) => (
            <button
              key={wl.key}
              onClick={() => setSelectedKey(wl.key)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors",
                wl.key === selectedKey
                  ? wl.color === "sprout"
                    ? "bg-sprout-500 text-white"
                    : "bg-sky-500 text-white"
                  : wl.color === "sprout"
                    ? "bg-sprout-50 text-sprout-700 hover:bg-sprout-100"
                    : "bg-sky-50 text-sky-700 hover:bg-sky-100",
              )}
            >
              {wl.label} ({wl.count})
            </button>
          ))}
        </div>
      </div>

      {/* Session */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8">
        <div className="mb-4 text-sm text-gray-500">
          {selected.label} &middot; {selected.words.length} words
        </div>
        <FlashcardSession key={selectedKey} cards={selected.words} type="new" />
      </div>
    </div>
  );
}
