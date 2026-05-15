"use client";

import { useCallback } from "react";
import { playWordAudio, playSfx, SFX } from "@/lib/audio";

export function useWordSpeak() {
  const speak = useCallback((word: string) => {
    playWordAudio(word.toLowerCase());
  }, []);

  const playCorrect = useCallback(() => {
    playSfx(SFX.correct).catch(() => {});
  }, []);

  const playIncorrect = useCallback(() => {
    playSfx(SFX.incorrect).catch(() => {});
  }, []);

  const playComplete = useCallback(() => {
    playSfx(SFX.complete).catch(() => {});
  }, []);

  const playFlip = useCallback(() => {
    playSfx(SFX.flip).catch(() => {});
  }, []);

  return { speak, playCorrect, playIncorrect, playComplete, playFlip };
}
