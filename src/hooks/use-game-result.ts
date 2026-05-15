"use client";

import { useCallback, useRef } from "react";

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
  const cachedStudentId = useRef<string | null | undefined>(undefined);

  const getStudentId = useCallback(async (): Promise<string | null> => {
    if (cachedStudentId.current !== undefined) return cachedStudentId.current;

    try {
      const res = await fetch("/api/students");
      if (!res.ok) {
        cachedStudentId.current = null;
        return null;
      }
      const { students } = await res.json();
      const first = students?.[0]?.id ?? null;
      cachedStudentId.current = first;
      return first;
    } catch {
      cachedStudentId.current = null;
      return null;
    }
  }, []);

  const submit = useCallback(
    async (params: SubmitGameResultParams) => {
      const studentId = params.studentId || (await getStudentId());
      if (!studentId) return;

      try {
        const res = await fetch("/api/game-sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...params, studentId }),
        });
        if (!res.ok) {
          console.error("Failed to submit game result:", res.status);
        }
      } catch (e) {
        console.error("Failed to submit game result:", e);
      }
    },
    [getStudentId],
  );

  return { submitGameResult: submit };
}
