import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { students } from "@/db/schema";
import { eq, and } from "drizzle-orm";

// PATCH /api/students/[id] — update a student
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { name, gradeLevel, avatar, isActive } = body;

  const [existing] = await db
    .select()
    .from(students)
    .where(and(eq(students.id, id), eq(students.parentId, session.user.id)))
    .limit(1);

  if (!existing) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }

  const updates: Record<string, unknown> = {};
  if (name !== undefined) updates.name = name.trim();
  if (gradeLevel !== undefined) updates.gradeLevel = gradeLevel;
  if (avatar !== undefined) updates.avatar = avatar;
  if (isActive !== undefined) updates.isActive = isActive;

  const [updated] = await db
    .update(students)
    .set(updates)
    .where(eq(students.id, id))
    .returning();

  return NextResponse.json({ student: updated });
}

// DELETE /api/students/[id] — soft-delete a student
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [existing] = await db
    .select()
    .from(students)
    .where(and(eq(students.id, id), eq(students.parentId, session.user.id)))
    .limit(1);

  if (!existing) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }

  await db.update(students).set({ isActive: false }).where(eq(students.id, id));

  return NextResponse.json({ success: true });
}
