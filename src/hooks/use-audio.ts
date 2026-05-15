"use client";

import { useCallback, useRef, useState } from "react";
import { getAudioUrl, speak } from "@/lib/audio";

export function useAudio() {
  const cache = useRef<Map<string, HTMLAudioElement>>(new Map());
  const [playing, setPlaying] = useState<string | null>(null);

  const play = useCallback(
    (wordSlug: string): Promise<void> => {
      const url = getAudioUrl(wordSlug);

      // No audio file available — use browser TTS directly
      if (!url) {
        setPlaying(wordSlug);
        return speak(wordSlug).finally(() => {
          setTimeout(() => {
            setPlaying((current) => (current === wordSlug ? null : current));
          }, 300);
        });
      }

      // Try playing from storage, fallback to TTS
      let audio = cache.current.get(wordSlug);
      if (!audio) {
        audio = new Audio(url);
        cache.current.set(wordSlug, audio);
      }

      audio.currentTime = 0;
      setPlaying(wordSlug);

      return audio
        .play()
        .catch(() => speak(wordSlug))
        .finally(() => {
          setTimeout(() => {
            setPlaying((current) => (current === wordSlug ? null : current));
          }, 300);
        });
    },
    [],
  );

  const preload = useCallback((wordSlugs: string[]) => {
    for (const slug of wordSlugs) {
      const url = getAudioUrl(slug);
      if (url && !cache.current.has(slug)) {
        const audio = new Audio(url);
        audio.preload = "auto";
        cache.current.set(slug, audio);
      }
    }
  }, []);

  return { play, playing, preload };
}
