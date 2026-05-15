import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabase } from "@/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { studentId, gameType, wordsPracticed, score, maxScore, durationSeconds } = body;

  if (!studentId || !gameType) {
    return NextResponse.json({ error: "studentId and gameType are required" }, { status: 400 });
  }

  // Verify the student belongs to this user.
  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("id", studentId)
    .eq("parent_id", session.user.id)
    .maybeSingle();

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const { error } = await supabase.from("game_sessions").insert({
    student_id: studentId,
    game_type: gameType,
    words_practiced: wordsPracticed ?? [],
    score: score ?? null,
    max_score: maxScore ?? null,
    duration_seconds: durationSeconds ?? null,
  });

  if (error) {
    console.error("Save game session error:", error);
    return NextResponse.json({ error: "Failed to save game session" }, { status: 500 });
  }

  // Update learning progress for practiced words.
  if (wordsPracticed?.length > 0) {
    const wordResults = body.wordResults as { word: string; correct: boolean }[] | undefined;

    if (wordResults) {
      for (const wr of wordResults) {
        // Find word by text.
        const { data: word } = await supabase
          .from("words")
          .select("id")
          .eq("text", wr.word)
          .maybeSingle();

        if (!word) continue;

        // Upsert progress.
        const { data: existing } = await supabase
          .from("learning_progress")
          .select("id, correct_count, incorrect_count, consecutive_correct, status")
          .eq("student_id", studentId)
          .eq("word_id", word.id)
          .maybeSingle();

        if (existing) {
          const updates = {
            correct_count: existing.correct_count + (wr.correct ? 1 : 0),
            incorrect_count: existing.incorrect_count + (wr.correct ? 0 : 1),
            consecutive_correct: wr.correct ? existing.consecutive_correct + 1 : 0,
            status: getStatus(wr.correct, existing.consecutive_correct, existing.status),
            last_reviewed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          await supabase.from("learning_progress").update(updates).eq("id", existing.id);
        } else {
          await supabase.from("learning_progress").insert({
            student_id: studentId,
            word_id: word.id,
            status: wr.correct ? "learning" : "new",
            correct_count: wr.correct ? 1 : 0,
            incorrect_count: wr.correct ? 0 : 1,
            consecutive_correct: wr.correct ? 1 : 0,
            last_reviewed_at: new Date().toISOString(),
          });
        }
      }
    }
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

function getStatus(correct: boolean, consecutive: number, current: string): string {
  if (!correct) return current === "mastered" ? "reviewing" : current;
  if (consecutive + 1 >= 3) return "mastered";
  if (current === "new") return "learning";
  if (current === "learning") return "reviewing";
  return current;
}
