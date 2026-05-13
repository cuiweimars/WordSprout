import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { students, learningProgress, words } from "@/db/schema";
import { eq, and, count, sql } from "drizzle-orm";

// GET /api/students — list all students for the current user
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await db
    .select({
      id: students.id,
      name: students.name,
      gradeLevel: students.gradeLevel,
      avatar: students.avatar,
      isActive: students.isActive,
      createdAt: students.createdAt,
      masteredCount: sql<number>`count(*) filter (where ${learningProgress.status} = 'mastered')`,
      learningCount: sql<number>`count(*) filter (where ${learningProgress.status} in ('learning', 'reviewing', 'new'))`,
    })
    .from(students)
    .leftJoin(learningProgress, eq(students.id, learningProgress.studentId))
    .where(eq(students.parentId, session.user.id))
    .groupBy(students.id)
    .orderBy(students.createdAt);

  return NextResponse.json({ students: result });
}

// POST /api/students — create a new student
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, gradeLevel, avatar } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { error: "Student name is required." },
      { status: 400 },
    );
  }

  const existing = await db
    .select({ id: students.id })
    .from(students)
    .where(
      and(eq(students.parentId, session.user.id), eq(students.name, name.trim())),
    )
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json(
      { error: "A student with this name already exists." },
      { status: 409 },
    );
  }

  const [student] = await db
    .insert(students)
    .values({
      parentId: session.user.id,
      name: name.trim(),
      gradeLevel: gradeLevel || null,
      avatar: avatar || null,
    })
    .returning();

  return NextResponse.json({ student }, { status: 201 });
}
