"use client";

import { useCallback } from "react";

interface WordResult {
  word: string;
  correct: boolean;
}

interface SubmitGameResultParams {
  studentId?: string;
  gameType: string;
  score?: number;
  maxScore?: number;
  durationSeconds?: number;
  wordsPracticed: string[];
  wordResults?: WordResult[];
}

export function useGameResult() {
  const submit = useCallback(async (params: SubmitGameResultParams) => {
    if (!params.studentId) return;

    try {
      const res = await fetch("/api/game-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!res.ok) {
        console.error("Failed to submit game result:", res.status);
      }
    } catch (e) {
      console.error("Failed to submit game result:", e);
    }
  }, []);

  return { submitGameResult: submit };
}
