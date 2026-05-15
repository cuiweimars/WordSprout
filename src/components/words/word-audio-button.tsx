"use client";

import { Volume2 } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";
import { cn } from "@/lib/utils";

interface WordAudioButtonProps {
  wordSlug: string;
  className?: string;
}

export function WordAudioButton({ wordSlug, className }: WordAudioButtonProps) {
  const { play, playing } = useAudio();
  const isPlaying = playing === wordSlug;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        play(wordSlug);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all",
        isPlaying
          ? "bg-sprout-100 text-sprout-600 scale-110"
          : "bg-gray-100 text-gray-500 hover:bg-sprout-50 hover:text-sprout-600",
        "w-10 h-10",
        className
      )}
      aria-label={`Play pronunciation for ${wordSlug}`}
    >
      <Volume2 className="w-5 h-5" />
    </button>
  );
}
