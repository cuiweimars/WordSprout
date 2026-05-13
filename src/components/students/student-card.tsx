"use client";

import Link from "next/link";
import { Edit2, Trash2 } from "lucide-react";

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    gradeLevel: string | null;
    avatar: string | null;
    masteredCount: number;
    learningCount: number;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const gradeLabels: Record<string, string> = {
  "pre-k": "Pre-K",
  kindergarten: "Kindergarten",
  "first-grade": "1st Grade",
  "second-grade": "2nd Grade",
  "third-grade": "3rd Grade",
};

export function StudentCard({
  student,
  onEdit,
  onDelete,
}: StudentCardProps) {
  const total = student.masteredCount + student.learningCount;
  const pct = total > 0 ? Math.round((student.masteredCount / 220) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border p-5 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sprout-50 flex items-center justify-center text-xl">
            {student.avatar || "👶"}
          </div>
          <div>
            <p className="font-heading font-bold text-gray-800">
              {student.name}
            </p>
            {student.gradeLevel && (
              <p className="text-xs text-gray-500">
                {gradeLabels[student.gradeLevel] || student.gradeLevel}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-400 hover:text-sprout-600 rounded-lg hover:bg-sprout-50 transition-colors"
            aria-label={`Edit ${student.name}`}
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            aria-label={`Remove ${student.name}`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Dolch 220 Progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sprout-400 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>
          <span className="font-medium text-sprout-600">
            {student.masteredCount}
          </span>{" "}
          mastered
        </span>
        <span>
          <span className="font-medium text-sun-600">
            {student.learningCount}
          </span>{" "}
          learning
        </span>
      </div>

      <div className="flex gap-2 mt-3 pt-3 border-t">
        <Link
          href={`/learn/flashcards?studentId=${student.id}`}
          className="flex-1 text-center py-1.5 rounded-lg bg-sprout-50 text-sprout-700 text-xs font-medium hover:bg-sprout-100 transition-colors"
        >
          Practice
        </Link>
        <Link
          href={`/learn/progress?studentId=${student.id}`}
          className="flex-1 text-center py-1.5 rounded-lg bg-gray-50 text-gray-700 text-xs font-medium hover:bg-gray-100 transition-colors"
        >
          Progress
        </Link>
      </div>
    </div>
  );
}
