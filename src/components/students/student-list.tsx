"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { StudentCard } from "./student-card";
import { StudentFormDialog } from "./student-form-dialog";

interface Student {
  id: string;
  name: string;
  gradeLevel: string | null;
  avatar: string | null;
  masteredCount: number;
  learningCount: number;
}

export function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch("/api/students");
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students);
      }
    } catch {
      // Silently fail — user can retry
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  async function handleDelete(id: string) {
    if (!confirm("Remove this student? Their progress data will be kept.")) return;
    const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
    if (res.ok) {
      setStudents((s) => s.filter((st) => st.id !== id));
    }
  }

  function handleEdit(student: Student) {
    setEditStudent(student);
    setDialogOpen(true);
  }

  function handleAdd() {
    setEditStudent(null);
    setDialogOpen(true);
  }

  function handleClose() {
    setDialogOpen(false);
    setEditStudent(null);
  }

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border p-5 animate-pulse"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-100" />
              <div className="h-4 w-24 bg-gray-100 rounded" />
            </div>
            <div className="h-2 bg-gray-100 rounded-full mb-3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={() => handleEdit(student)}
            onDelete={() => handleDelete(student.id)}
          />
        ))}

        <button
          onClick={handleAdd}
          className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-gray-200 hover:border-sprout-300 hover:bg-sprout-50/30 transition-all text-gray-400 hover:text-sprout-600 min-h-[180px]"
        >
          <Plus size={28} className="mb-2" />
          <span className="text-sm font-medium">Add Student</span>
        </button>
      </div>

      <StudentFormDialog
        open={dialogOpen}
        onClose={handleClose}
        onSaved={fetchStudents}
        editStudent={editStudent}
      />
    </>
  );
}
