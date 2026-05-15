import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabase } from "@/db";

// GET /api/students/[id]/progress
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const { data: student } = await supabase
    .from("students")
    .select("id, name, grade_level, avatar")
    .eq("id", id)
    .eq("parent_id", session.user.id)
    .maybeSingle();

  if (!student) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }

  // Status breakdown
  const { data: progressRows } = await supabase
    .from("learning_progress")
    .select("status")
    .eq("student_id", id);

  const breakdown: Record<string, number> = {};
  for (const row of progressRows ?? []) {
    breakdown[row.status] = (breakdown[row.status] ?? 0) + 1;
  }

  // Recent words (last 10 reviewed)
  const { data: recentProgress } = await supabase
    .from("learning_progress")
    .select("status, consecutive_correct, last_reviewed_at, word_id, words(text, slug)")
    .eq("student_id", id)
    .order("last_reviewed_at", { ascending: false, nullsFirst: false })
    .limit(10);

  const recentWords = (recentProgress ?? []).map((p: Record<string, unknown>) => {
    const word = p.words as Record<string, unknown> | null;
    return {
      wordText: word?.text ?? "",
      wordSlug: word?.slug ?? "",
      status: p.status,
      consecutiveCorrect: p.consecutive_correct,
      lastReviewedAt: p.last_reviewed_at,
    };
  });

  const totalWords = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return NextResponse.json({
    student: {
      id: student.id,
      name: student.name,
      gradeLevel: student.grade_level,
      avatar: student.avatar,
    },
    progress: {
      mastered: breakdown.mastered ?? 0,
      reviewing: breakdown.reviewing ?? 0,
      learning: breakdown.learning ?? 0,
      new: breakdown.new ?? 0,
      totalWords,
      dueForReview: 0,
    },
    recentWords,
  });
}
