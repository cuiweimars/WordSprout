"use client";

import { useCallback, useRef, useState } from "react";
import { getAudioUrl } from "@/lib/audio";

export function useAudio() {
  const cache = useRef<Map<string, HTMLAudioElement>>(new Map());
  const [playing, setPlaying] = useState<string | null>(null);

  const speakWithTTS = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        resolve();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const play = useCallback(
    (wordSlug: string): Promise<void> => {
      const url = getAudioUrl(wordSlug);

      // If no Supabase URL configured, use browser TTS
      if (!url) {
        setPlaying(wordSlug);
        return speakWithTTS(wordSlug).finally(() => {
          setTimeout(() => {
            setPlaying((current) => (current === wordSlug ? null : current));
          }, 300);
        });
      }

      // Try playing from Supabase storage
      let audio = cache.current.get(wordSlug);
      if (!audio) {
        audio = new Audio(url);
        cache.current.set(wordSlug, audio);
      }

      audio.currentTime = 0;
      setPlaying(wordSlug);

      return audio.play().catch(() => {
        // Fallback to TTS if audio file fails to load
        return speakWithTTS(wordSlug);
      }).finally(() => {
        setTimeout(() => {
          setPlaying((current) => (current === wordSlug ? null : current));
        }, 300);
      });
    },
    [speakWithTTS]
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
