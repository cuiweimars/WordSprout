import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabase } from "@/db";

// GET /api/students — list all students for the current user
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("students")
    .select("id, name, grade_level, avatar, is_active, created_at")
    .eq("parent_id", session.user.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Fetch students error:", error);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }

  // Fetch progress counts for all students in one query.
  const studentIds = (data ?? []).map((s) => s.id);
  const progressMap: Record<string, { mastered: number; learning: number }> = {};

  if (studentIds.length > 0) {
    const { data: progress } = await supabase
      .from("learning_progress")
      .select("student_id, status")
      .in("student_id", studentIds);

    for (const p of progress ?? []) {
      if (!progressMap[p.student_id]) progressMap[p.student_id] = { mastered: 0, learning: 0 };
      if (p.status === "mastered") progressMap[p.student_id].mastered++;
      else if (p.status === "learning" || p.status === "reviewing") progressMap[p.student_id].learning++;
    }
  }

  const students = (data ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    gradeLevel: s.grade_level,
    avatar: s.avatar,
    isActive: s.is_active,
    createdAt: s.created_at,
    masteredCount: progressMap[s.id]?.mastered ?? 0,
    learningCount: progressMap[s.id]?.learning ?? 0,
  }));

  return NextResponse.json({ students });
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

  const { data: existing } = await supabase
    .from("students")
    .select("id")
    .eq("parent_id", session.user.id)
    .eq("name", name.trim())
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "A student with this name already exists." },
      { status: 409 },
    );
  }

  const { data: student, error: insertError } = await supabase
    .from("students")
    .insert({
      parent_id: session.user.id,
      name: name.trim(),
      grade_level: gradeLevel || null,
      avatar: avatar || null,
    })
    .select()
    .single();

  if (insertError) {
    console.error("Create student error:", insertError);
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
  }

  return NextResponse.json({ student }, { status: 201 });
}
