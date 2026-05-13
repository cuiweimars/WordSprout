import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { students, learningProgress, words } from "@/db/schema";
import { eq, and, count, sql } from "drizzle-orm";

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

  const [student] = await db
    .select()
    .from(students)
    .where(and(eq(students.id, id), eq(students.parentId, session.user.id)))
    .limit(1);

  if (!student) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }

  // Status breakdown
  const statusBreakdown = await db
    .select({
      status: learningProgress.status,
      count: count(),
    })
    .from(learningProgress)
    .where(eq(learningProgress.studentId, id))
    .groupBy(learningProgress.status);

  // Recent words (last 10 reviewed)
  const recentWords = await db
    .select({
      wordText: words.text,
      wordSlug: words.slug,
      status: learningProgress.status,
      consecutiveCorrect: learningProgress.consecutiveCorrect,
      lastReviewedAt: learningProgress.lastReviewedAt,
    })
    .from(learningProgress)
    .innerJoin(words, eq(learningProgress.wordId, words.id))
    .where(eq(learningProgress.studentId, id))
    .orderBy(sql`${learningProgress.lastReviewedAt} DESC NULLS LAST`)
    .limit(10);

  // Words due for review
  const dueCount = await db
    .select({ count: count() })
    .from(learningProgress)
    .where(
      and(
        eq(learningProgress.studentId, id),
        sql`(${learningProgress.nextReviewAt} IS NULL OR ${learningProgress.nextReviewAt} <= NOW())`,
        sql`${learningProgress.status} != 'mastered'`,
      ),
    );

  const breakdown: Record<string, number> = {};
  for (const row of statusBreakdown) {
    breakdown[row.status] = row.count;
  }

  return NextResponse.json({
    student: {
      id: student.id,
      name: student.name,
      gradeLevel: student.gradeLevel,
      avatar: student.avatar,
    },
    progress: {
      mastered: breakdown.mastered ?? 0,
      reviewing: breakdown.reviewing ?? 0,
      learning: breakdown.learning ?? 0,
      new: breakdown.new ?? 0,
      totalWords: Object.values(breakdown).reduce((a, b) => a + b, 0),
      dueForReview: dueCount[0]?.count ?? 0,
    },
    recentWords,
  });
}
