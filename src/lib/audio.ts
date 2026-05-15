const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function getAudioUrl(wordSlug: string): string {
  if (!SUPABASE_URL) return "";
  return `${SUPABASE_URL}/storage/v1/object/public/audio/words/${wordSlug}.mp3`;
}

// Cache voices after first load — some browsers populate them asynchronously.
let cachedVoices: SpeechSynthesisVoice[] | null = null;

function getVoices(): SpeechSynthesisVoice[] {
  if (cachedVoices && cachedVoices.length > 0) return cachedVoices;
  cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices;
}

export function speak(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.volume = 1;

    const voices = getVoices();
    const enVoice =
      voices.find((v) => v.lang === "en-US" && v.localService) ||
      voices.find((v) => v.lang.startsWith("en"));
    if (enVoice) utterance.voice = enVoice;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

export function playWordAudio(wordSlug: string): Promise<void> {
  const audioUrl = getAudioUrl(wordSlug);
  if (audioUrl) {
    const audio = new Audio(audioUrl);
    return audio.play().catch(() => speak(wordSlug));
  }
  return speak(wordSlug);
}

export function preloadAudio(wordSlug: string): HTMLAudioElement {
  const audioUrl = getAudioUrl(wordSlug);
  if (audioUrl) {
    const audio = new Audio(audioUrl);
    audio.preload = "auto";
    return audio;
  }
  return new Audio();
}

export function playSfx(path: string): Promise<void> {
  const audio = new Audio(path);
  audio.volume = 0.5;
  return audio.play().catch(() => {});
}

export const SFX = {
  correct: "/audio/sfx/correct.mp3",
  incorrect: "/audio/sfx/incorrect.mp3",
  flip: "/audio/sfx/flip.mp3",
  complete: "/audio/sfx/complete.mp3",
} as const;
