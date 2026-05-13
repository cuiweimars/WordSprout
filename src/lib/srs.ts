export interface SRSCard {
  wordId: string;
  wordText: string;
  status: "new" | "learning" | "reviewing" | "mastered";
  easeFactor: number;
  intervalDays: number;
  consecutiveCorrect: number;
  lastReviewedAt: Date | null;
  nextReviewAt: Date | null;
}

const MIN_EASE = 1.3;
const DEFAULT_EASE = 2.5;
const DEFAULT_INTERVAL = 1;
const MASTERED_THRESHOLD = 5;

export function createNewCard(
  wordId: string,
  wordText: string
): SRSCard {
  return {
    wordId,
    wordText,
    status: "new",
    easeFactor: DEFAULT_EASE,
    intervalDays: DEFAULT_INTERVAL,
    consecutiveCorrect: 0,
    lastReviewedAt: null,
    nextReviewAt: null,
  };
}

export function calculateNextReview(
  card: SRSCard,
  quality: "correct" | "incorrect"
): Partial<SRSCard> {
  const now = new Date();

  if (quality === "correct") {
    const newConsecutive = card.consecutiveCorrect + 1;
    const newEase = Math.max(MIN_EASE, card.easeFactor + 0.1);
    const newInterval = Math.ceil(card.intervalDays * newEase);
    const newStatus: SRSCard["status"] =
      newConsecutive >= MASTERED_THRESHOLD ? "mastered" : card.status === "new" ? "learning" : "reviewing";
    const nextReview = new Date(now.getTime() + newInterval * 86400000);

    return {
      easeFactor: newEase,
      intervalDays: newInterval,
      consecutiveCorrect: newConsecutive,
      status: newStatus,
      lastReviewedAt: now,
      nextReviewAt: nextReview,
    };
  }

  return {
    easeFactor: Math.max(MIN_EASE, card.easeFactor - 0.2),
    intervalDays: DEFAULT_INTERVAL,
    consecutiveCorrect: 0,
    status: "learning",
    lastReviewedAt: now,
    nextReviewAt: new Date(now.getTime() + 86400000),
  };
}

export function getDueCards(cards: SRSCard[]): SRSCard[] {
  const now = new Date();
  return cards.filter(
    (c) =>
      c.status === "new" ||
      (c.nextReviewAt && new Date(c.nextReviewAt) <= now)
  );
}

export function getNewCards(cards: SRSCard[], count: number): SRSCard[] {
  return cards.filter((c) => c.status === "new").slice(0, count);
}

export function buildSession(
  allCards: SRSCard[],
  maxCards: number = 10
): SRSCard[] {
  const due = getDueCards(allCards);
  if (due.length >= maxCards) {
    return shuffle(due).slice(0, maxCards);
  }

  const remaining = allCards
    .filter(
      (c) => c.status !== "mastered" && !due.some((d) => d.wordId === c.wordId)
    )
    .sort((a, b) => {
      const priority = { new: 0, learning: 1, reviewing: 2, mastered: 3 };
      return priority[a.status] - priority[b.status];
    });

  return shuffle([...due, ...remaining]).slice(0, maxCards);
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
