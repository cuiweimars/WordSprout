import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabase } from "@/db";

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

  const { data: existing } = await supabase
    .from("students")
    .select("id")
    .eq("id", id)
    .eq("parent_id", session.user.id)
    .maybeSingle();

  if (!existing) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }

  const updates: Record<string, unknown> = {};
  if (name !== undefined) updates.name = name.trim();
  if (gradeLevel !== undefined) updates.grade_level = gradeLevel;
  if (avatar !== undefined) updates.avatar = avatar;
  if (isActive !== undefined) updates.is_active = isActive;

  const { data: updated, error } = await supabase
    .from("students")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update student error:", error);
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 });
  }

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

  const { data: existing } = await supabase
    .from("students")
    .select("id")
    .eq("id", id)
    .eq("parent_id", session.user.id)
    .maybeSingle();

  if (!existing) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }

  const { error } = await supabase
    .from("students")
    .update({ is_active: false })
    .eq("id", id);

  if (error) {
    console.error("Delete student error:", error);
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
