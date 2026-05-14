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

function SproutDecor({ className }: { className?: string }) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        opacity="0.08"
        d="M28 12c-12 2.5-14.6 9.8-16.6 15.5l2.3.8 1.1-2.7c.6.2 1.2.4 1.6.4C30 26 34 6 34 6c-1.2 2.4-9.6 2.7-15.6 3.9S8 13.4 8 15.8s2.1 4.5 2.1 4.5C14 12 28 12 28 12z"
      />
    </svg>
  );
}

function DotPattern({ className }: { className?: string }) {
  return (
    <svg className={className} width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.08" />
      <circle cx="30" cy="10" r="1.5" fill="currentColor" opacity="0.06" />
      <circle cx="50" cy="10" r="2" fill="currentColor" opacity="0.08" />
      <circle cx="10" cy="30" r="1.5" fill="currentColor" opacity="0.06" />
      <circle cx="50" cy="30" r="1.5" fill="currentColor" opacity="0.06" />
      <circle cx="10" cy="50" r="2" fill="currentColor" opacity="0.08" />
      <circle cx="30" cy="50" r="1.5" fill="currentColor" opacity="0.06" />
      <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

export function Flashcard({
  wordText,
  wordSlug,
  exampleSentence,
  isFlipped,
  onFlip,
  className,
}: FlashcardProps) {
  const isHeart = isHeartWord(wordSlug);

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
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center",
            "rounded-3xl border-2 border-sprout-200 shadow-lg",
            "bg-gradient-to-br from-white via-sprout-50/30 to-sprout-100/50",
            "overflow-hidden"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Decorative elements */}
          <SproutDecor className="absolute top-2 left-2 text-sprout-600 w-10 h-10" />
          <SproutDecor className="absolute bottom-2 right-2 text-sprout-600 w-10 h-10 rotate-180" />
          <DotPattern className="absolute top-3 right-3 text-sprout-600 w-12 h-12" />
          <DotPattern className="absolute bottom-3 left-3 text-sprout-600 w-12 h-12" />

          {/* Decorative top bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sprout-300 via-sprout-400 to-sprout-300" />

          {/* Word */}
          <span className="font-display font-bold text-5xl sm:text-6xl text-sprout-700 mb-4 tracking-wide drop-shadow-sm relative z-10">
            {wordText}
          </span>

          {isHeart && (
            <div className="mb-2 relative z-10">
              <HeartWordInline word={wordText} wordSlug={wordSlug} size="sm" />
            </div>
          )}

          <div className="relative z-10">
            <WordAudioButton wordSlug={wordSlug} />
          </div>

          <p className="text-xs text-sprout-400 mt-4 relative z-10 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v4m0 0l2-2m-2 2L4 3M1 7.5A2.5 2.5 0 013.5 10h5A2.5 2.5 0 0111 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tap to see example
          </p>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center",
            "rounded-3xl border-2 border-sprout-300 shadow-lg",
            "bg-gradient-to-br from-sprout-50 via-white to-sprout-100/60",
            "overflow-hidden"
          )}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Decorative elements */}
          <SproutDecor className="absolute top-2 right-2 text-sprout-600 w-8 h-8 rotate-90" />
          <SproutDecor className="absolute bottom-2 left-2 text-sprout-600 w-8 h-8 -rotate-90" />

          {/* Decorative bottom bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-sprout-300 via-sprout-400 to-sprout-300" />

          {/* Quote mark */}
          <svg className="text-sprout-200 mb-1" width="32" height="24" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14.4c0-4.8 2.4-9.6 7.2-12l1.2 2.4C5.2 6.8 3.6 9.6 3.2 12H8v12H0V14.4zm16 0c0-4.8 2.4-9.6 7.2-12l1.2 2.4c-3.2 2-4.8 4.8-5.2 7.2H24v12h-8V14.4z" fill="currentColor" />
          </svg>

          {/* Word */}
          <span className="font-display font-bold text-2xl text-sprout-700 mb-3 relative z-10">
            {wordText}
          </span>

          {/* Example sentence */}
          <p className="text-center text-gray-600 text-base leading-relaxed max-w-xs relative z-10 italic">
            {exampleSentence}
          </p>

          {/* Quote mark closing */}
          <svg className="text-sprout-200 mt-1 rotate-180" width="32" height="24" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14.4c0-4.8 2.4-9.6 7.2-12l1.2 2.4C5.2 6.8 3.6 9.6 3.2 12H8v12H0V14.4zm16 0c0-4.8 2.4-9.6 7.2-12l1.2 2.4c-3.2 2-4.8 4.8-5.2 7.2H24v12h-8V14.4z" fill="currentColor" />
          </svg>

          <p className="text-xs text-sprout-400 mt-4 relative z-10 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 11V7m0 0L4 9m2-2l2 2M1 4.5A2.5 2.5 0 013.5 2h5A2.5 2.5 0 0111 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tap to flip back
          </p>
        </div>
      </motion.div>
    </div>
  );
}
