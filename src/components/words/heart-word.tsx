"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getHeartWordAnnotation,
  type HeartWordAnnotation,
} from "@/data/heart-words";

interface HeartWordProps {
  /** The display text of the word (e.g. "the") */
  word: string;
  /** Slug matching the Dolch/Fry entry (defaults to lowercased word) */
  wordSlug?: string;
  /** Visual size variant */
  size?: "sm" | "md" | "lg";
  /** Show the explanation tooltip */
  showTooltip?: boolean;
  /** Compact mode — used inside flashcards etc. */
  compact?: boolean;
  /** Extra classes */
  className?: string;
}

const sizeClasses = {
  sm: {
    text: "text-lg",
    heart: "w-3 h-3",
    tooltip: "text-xs",
  },
  md: {
    text: "text-3xl",
    heart: "w-4 h-4",
    tooltip: "text-sm",
  },
  lg: {
    text: "text-5xl",
    heart: "w-5 h-5",
    tooltip: "text-sm",
  },
} as const;

export function HeartWord({
  word,
  wordSlug,
  size = "md",
  showTooltip = true,
  compact = false,
  className,
}: HeartWordProps) {
  const slug = wordSlug ?? word.toLowerCase();
  const annotation: HeartWordAnnotation | undefined =
    getHeartWordAnnotation(slug);

  // No annotation → fully decodable, render all green
  if (!annotation) {
    return (
      <span
        className={cn(
          "font-display font-bold text-sprout-700",
          sizeClasses[size].text,
          className
        )}
      >
        {word}
      </span>
    );
  }

  const hasHeartParts = annotation.parts.some((p) => p.isHeart);

  return (
    <span className={cn("inline-flex flex-col items-center gap-1", className)}>
      {/* Word with color-coded parts */}
      <span
        className={cn(
          "font-display font-bold inline-flex items-baseline",
          sizeClasses[size].text
        )}
      >
        {annotation.parts.map((part, i) =>
          part.isHeart ? (
            <span
              key={i}
              className="relative inline-flex items-center text-rose-600"
            >
              <span className="border-b-2 border-rose-400 pb-0.5">
                {part.text}
              </span>
              <Heart
                className={cn(
                  "absolute -top-1 -right-1 fill-rose-500 text-rose-500",
                  sizeClasses[size].heart
                )}
                aria-hidden
              />
            </span>
          ) : (
            <span key={i} className="text-sprout-700">
              {part.text}
            </span>
          )
        )}
      </span>

      {/* Explanation tooltip */}
      {showTooltip && annotation.explanation && !compact && (
        <span
          className={cn(
            "text-gray-500 font-sans max-w-xs text-center leading-snug",
            sizeClasses[size].tooltip
          )}
        >
          {annotation.explanation}
        </span>
      )}
    </span>
  );
}

/**
 * Inline version — renders the word with coloured parts but no explanation
 * or block layout. Useful for embedding inside cards or lists.
 */
export function HeartWordInline({
  word,
  wordSlug,
  size = "md",
  className,
}: Omit<HeartWordProps, "showTooltip" | "compact">) {
  const slug = wordSlug ?? word.toLowerCase();
  const annotation = getHeartWordAnnotation(slug);

  if (!annotation) {
    return (
      <span
        className={cn(
          "font-display font-bold text-sprout-700",
          sizeClasses[size].text,
          className
        )}
      >
        {word}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "font-display font-bold inline-flex items-center",
        sizeClasses[size].text,
        className
      )}
    >
      {annotation.parts.map((part, i) =>
        part.isHeart ? (
          <span
            key={i}
            className="relative inline-flex items-center text-rose-600"
          >
            <span className="border-b-2 border-rose-400 pb-0.5">
              {part.text}
            </span>
            <Heart
              className={cn(
                "absolute -top-1 -right-1 fill-rose-500 text-rose-500",
                sizeClasses[size].heart
              )}
              aria-hidden
            />
          </span>
        ) : (
          <span key={i} className="text-sprout-700">
            {part.text}
          </span>
        )
      )}
    </span>
  );
}
