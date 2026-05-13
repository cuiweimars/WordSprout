const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function getAudioUrl(wordSlug: string): string {
  if (!SUPABASE_URL) {
    return "";
  }
  return `${SUPABASE_URL}/storage/v1/object/public/audio/words/${wordSlug}.mp3`;
}

export function playWordAudio(wordSlug: string): Promise<void> {
  const url = getAudioUrl(wordSlug);
  if (!url) return Promise.resolve();
  const audio = new Audio(url);
  return audio.play();
}

export function preloadAudio(wordSlug: string): HTMLAudioElement {
  const url = getAudioUrl(wordSlug);
  const audio = new Audio(url);
  audio.preload = "auto";
  return audio;
}

export function playSfx(path: string): Promise<void> {
  const audio = new Audio(path);
  audio.volume = 0.5;
  return audio.play();
}

export const SFX = {
  correct: "/audio/sfx/correct.mp3",
  incorrect: "/audio/sfx/incorrect.mp3",
  flip: "/audio/sfx/flip.mp3",
  complete: "/audio/sfx/complete.mp3",
} as const;
