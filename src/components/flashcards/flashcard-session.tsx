"use client";

import { Flashcard } from "@/components/flashcards/flashcard";
import { useFlashcardStore } from "@/stores/flashcard-store";
import { useEffect, useCallback } from "react";
import { Check, X, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardSessionProps {
  cards: {
    wordId: string;
    wordText: string;
    slug: string;
    exampleSentence: string;
  }[];
  type?: "new" | "review" | "mixed";
  onComplete?: (results: { wordId: string; wordText: string; quality: "correct" | "incorrect" }[]) => void;
}

export function FlashcardSession({
  cards,
  type = "new",
  onComplete,
}: FlashcardSessionProps) {
  const {
    cards: sessionCards,
    currentIndex,
    results,
    isFlipped,
    isComplete,
    startSession,
    flipCard,
    markCard,
    resetSession,
  } = useFlashcardStore();

  useEffect(() => {
    startSession(
      cards.map((c) => ({
        wordId: c.wordId,
        wordText: c.wordText,
        exampleSentence: c.exampleSentence,
        status: "new",
      })),
      type
    );
  }, [cards, type, startSession]);

  const handleMark = useCallback(
    (quality: "correct" | "incorrect") => {
      markCard(quality);
      const state = useFlashcardStore.getState();
      if (state.isComplete && onComplete) {
        onComplete(state.results);
      }
    },
    [markCard, onComplete]
  );

  if (sessionCards.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No cards available. Try selecting a word list.
      </div>
    );
  }

  const currentCard = sessionCards[currentIndex];
  const progress = ((currentIndex + (isComplete ? 1 : 0)) / sessionCards.length) * 100;
  const correctCount = results.filter((r) => r.quality === "correct").length;
  const incorrectCount = results.filter((r) => r.quality === "incorrect").length;

  if (isComplete) {
    const accuracy =
      results.length > 0
        ? Math.round((correctCount / results.length) * 100)
        : 0;

    return (
      <div className="max-w-md mx-auto text-center py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sprout-100 mb-6">
          <Trophy className="w-10 h-10 text-sprout-600" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-gray-800 mb-2">
          Session Complete!
        </h2>
        <div className="grid grid-cols-3 gap-4 my-8">
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-2xl font-bold text-gray-800">{results.length}</p>
            <p className="text-sm text-gray-500">Words</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <p className="text-2xl font-bold text-green-600">{correctCount}</p>
            <p className="text-sm text-green-600">Correct</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <p className="text-2xl font-bold text-red-500">{incorrectCount}</p>
            <p className="text-sm text-red-500">Try Again</p>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Accuracy: <span className="font-bold text-gray-800">{accuracy}%</span>
          </p>
        </div>
        <button
          onClick={() => resetSession()}
          className="inline-flex items-center gap-2 bg-sprout-500 text-white font-medium px-6 py-3 rounded-full hover:bg-sprout-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Practice Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
          <span>
            {currentIndex + 1} / {sessionCards.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-sprout-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="h-72 sm:h-80 mb-6">
        <Flashcard
          wordText={currentCard.wordText}
          wordSlug={currentCard.wordText.toLowerCase()}
          exampleSentence={currentCard.exampleSentence}
          isFlipped={isFlipped}
          onFlip={flipCard}
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => handleMark("incorrect")}
          className={cn(
            "flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-colors",
            "bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100"
          )}
        >
          <X className="w-5 h-5" />
          Try Again
        </button>
        <button
          onClick={() => handleMark("correct")}
          className={cn(
            "flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-colors",
            "bg-sprout-500 text-white hover:bg-sprout-600"
          )}
        >
          <Check className="w-5 h-5" />
          Got It
        </button>
      </div>
    </div>
  );
}
