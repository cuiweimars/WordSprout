"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { WordAudioButton } from "@/components/words/word-audio-button";
import { HeartWordInline } from "@/components/words/heart-word";
import { isHeartWord } from "@/data/heart-words";

interface FlashcardProps {
  wordText: string;
  wordSlug: string;
  exampleSentence: string;
  isFlipped: boolean;
  onFlip: () => void;
  className?: string;
}

export function Flashcard({
  wordText,
  wordSlug,
  exampleSentence,
  isFlipped,
  onFlip,
  className,
}: FlashcardProps) {
  return (
    <div
      className={cn("relative cursor-pointer select-none", className)}
      style={{ perspective: 1000 }}
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-sprout-200 shadow-lg p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="font-display font-bold text-5xl sm:text-6xl text-sprout-700 mb-4">
            {wordText}
          </span>
          {isHeartWord(wordSlug) && (
            <div className="mb-2">
              <HeartWordInline word={wordText} wordSlug={wordSlug} size="sm" />
            </div>
          )}
          <WordAudioButton wordSlug={wordSlug} />
          <p className="text-xs text-gray-400 mt-4">Tap to see example</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-sprout-50 rounded-3xl border-2 border-sprout-300 shadow-lg p-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="font-display font-bold text-3xl text-sprout-700 mb-3">
            {wordText}
          </span>
          <p className="text-center text-gray-700 text-base leading-relaxed max-w-xs">
            {exampleSentence}
          </p>
          <p className="text-xs text-gray-400 mt-4">Tap to flip back</p>
        </div>
      </motion.div>
    </div>
  );
}
