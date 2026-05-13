import { create } from "zustand";

export type CardQuality = "correct" | "incorrect";

export interface FlashcardItem {
  wordId: string;
  wordText: string;
  exampleSentence: string;
  status: "new" | "learning" | "reviewing" | "mastered";
}

interface CardResult {
  wordId: string;
  wordText: string;
  quality: CardQuality;
}

interface FlashcardState {
  cards: FlashcardItem[];
  currentIndex: number;
  results: CardResult[];
  isFlipped: boolean;
  isComplete: boolean;
  sessionType: "new" | "review" | "mixed";

  startSession: (cards: FlashcardItem[], type: "new" | "review" | "mixed") => void;
  flipCard: () => void;
  markCard: (quality: CardQuality) => void;
  nextCard: () => void;
  resetSession: () => void;
}

export const useFlashcardStore = create<FlashcardState>((set, get) => ({
  cards: [],
  currentIndex: 0,
  results: [],
  isFlipped: false,
  isComplete: false,
  sessionType: "new",

  startSession: (cards, type) => {
    set({
      cards,
      currentIndex: 0,
      results: [],
      isFlipped: false,
      isComplete: false,
      sessionType: type,
    });
  },

  flipCard: () => set((s) => ({ isFlipped: !s.isFlipped })),

  markCard: (quality) => {
    const { cards, currentIndex, results } = get();
    const card = cards[currentIndex];
    if (!card) return;

    const newResults = [
      ...results,
      { wordId: card.wordId, wordText: card.wordText, quality },
    ];
    const nextIndex = currentIndex + 1;
    const isComplete = nextIndex >= cards.length;

    set({
      results: newResults,
      currentIndex: isComplete ? currentIndex : nextIndex,
      isFlipped: false,
      isComplete,
    });
  },

  nextCard: () => {
    const { cards, currentIndex } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex >= cards.length) {
      set({ isComplete: true });
    } else {
      set({ currentIndex: nextIndex, isFlipped: false });
    }
  },

  resetSession: () =>
    set({
      cards: [],
      currentIndex: 0,
      results: [],
      isFlipped: false,
      isComplete: false,
      sessionType: "new",
    }),
}));
