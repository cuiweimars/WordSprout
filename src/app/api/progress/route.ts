import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { learningProgress, students, words } from "@/db/schema";
import { eq, and } from "drizzle-orm";

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

  const [student] = await db
    .select()
    .from(students)
    .where(and(eq(students.id, studentId), eq(students.parentId, session.user.id)))
    .limit(1);

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const progress = await db
    .select({
      wordId: learningProgress.wordId,
      wordText: words.text,
      status: learningProgress.status,
      correctCount: learningProgress.correctCount,
      incorrectCount: learningProgress.incorrectCount,
      consecutiveCorrect: learningProgress.consecutiveCorrect,
      nextReviewAt: learningProgress.nextReviewAt,
      easeFactor: learningProgress.easeFactor,
      intervalDays: learningProgress.intervalDays,
    })
    .from(learningProgress)
    .innerJoin(words, eq(learningProgress.wordId, words.id))
    .where(eq(learningProgress.studentId, studentId));

  return NextResponse.json({ cards: progress });
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

  const [student] = await db
    .select()
    .from(students)
    .where(and(eq(students.id, studentId), eq(students.parentId, session.user.id)))
    .limit(1);

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  for (const result of results) {
    const existing = await db
      .select()
      .from(learningProgress)
      .where(
        and(
          eq(learningProgress.studentId, studentId),
          eq(learningProgress.wordId, result.wordId),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      const current = existing[0];
      const isCorrect = result.quality >= 3;
      const newConsecutive = isCorrect
        ? current.consecutiveCorrect + 1
        : 0;

      await db
        .update(learningProgress)
        .set({
          status: newConsecutive >= 3 ? "mastered" : "reviewing",
          correctCount: current.correctCount + (isCorrect ? 1 : 0),
          incorrectCount: current.incorrectCount + (isCorrect ? 0 : 1),
          consecutiveCorrect: newConsecutive,
          lastReviewedAt: new Date(),
          nextReviewAt: new Date(Date.now() + current.intervalDays * 86400000),
          updatedAt: new Date(),
        })
        .where(eq(learningProgress.id, current.id));
    } else {
      const isCorrect = result.quality >= 3;
      await db.insert(learningProgress).values({
        studentId,
        wordId: result.wordId,
        status: isCorrect ? "reviewing" : "learning",
        correctCount: isCorrect ? 1 : 0,
        incorrectCount: isCorrect ? 0 : 1,
        consecutiveCorrect: isCorrect ? 1 : 0,
        lastReviewedAt: new Date(),
        nextReviewAt: new Date(Date.now() + 86400000),
      });
    }
  }

  return NextResponse.json({ saved: true });
}
