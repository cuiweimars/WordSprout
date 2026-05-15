import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabase } from "@/db";

export const runtime = "nodejs";

// GET /api/progress?studentId=xxx
export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");

  if (!studentId) {
    return NextResponse.json(
      { error: "studentId is required" },
      { status: 400 },
    );
  }

  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("id", studentId)
    .eq("parent_id", session.user.id)
    .maybeSingle();

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const { data: progress } = await supabase
    .from("learning_progress")
    .select("word_id, status, correct_count, incorrect_count, consecutive_correct, next_review_at, ease_factor, interval_days, words(text)")
    .eq("student_id", studentId);

  const cards = (progress ?? []).map((p: Record<string, unknown>) => {
    const word = p.words as Record<string, unknown> | null;
    return {
      wordId: p.word_id,
      wordText: word?.text ?? "",
      status: p.status,
      correctCount: p.correct_count,
      incorrectCount: p.incorrect_count,
      consecutiveCorrect: p.consecutive_correct,
      nextReviewAt: p.next_review_at,
      easeFactor: p.ease_factor,
      intervalDays: p.interval_days,
    };
  });

  return NextResponse.json({ cards });
}

// POST /api/progress
// Body: { studentId, results: [{ wordId, quality }] }
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { studentId, results } = body;

  if (!studentId || !results?.length) {
    return NextResponse.json(
      { error: "studentId and results are required" },
      { status: 400 },
    );
  }

  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("id", studentId)
    .eq("parent_id", session.user.id)
    .maybeSingle();

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  for (const result of results) {
    const { data: existing } = await supabase
      .from("learning_progress")
      .select("id, consecutive_correct, correct_count, incorrect_count, interval_days")
      .eq("student_id", studentId)
      .eq("word_id", result.wordId)
      .maybeSingle();

    if (existing) {
      const isCorrect = result.quality >= 3;
      const newConsecutive = isCorrect ? existing.consecutive_correct + 1 : 0;

      await supabase
        .from("learning_progress")
        .update({
          status: newConsecutive >= 3 ? "mastered" : "reviewing",
          correct_count: existing.correct_count + (isCorrect ? 1 : 0),
          incorrect_count: existing.incorrect_count + (isCorrect ? 0 : 1),
          consecutive_correct: newConsecutive,
          last_reviewed_at: new Date().toISOString(),
          next_review_at: new Date(Date.now() + existing.interval_days * 86400000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
    } else {
      const isCorrect = result.quality >= 3;
      await supabase.from("learning_progress").insert({
        student_id: studentId,
        word_id: result.wordId,
        status: isCorrect ? "reviewing" : "learning",
        correct_count: isCorrect ? 1 : 0,
        incorrect_count: isCorrect ? 0 : 1,
        consecutive_correct: isCorrect ? 1 : 0,
        last_reviewed_at: new Date().toISOString(),
        next_review_at: new Date(Date.now() + 86400000).toISOString(),
      });
    }
  }

  return NextResponse.json({ saved: true });
}
