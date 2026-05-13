"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { grades } from "@/data/grades";

const AVATARS = [
  { emoji: "🦁", label: "Lion" },
  { emoji: "🐸", label: "Frog" },
  { emoji: "🦊", label: "Fox" },
  { emoji: "🐰", label: "Bunny" },
  { emoji: "🐻", label: "Bear" },
  { emoji: "🦄", label: "Unicorn" },
  { emoji: "🐝", label: "Bee" },
  { emoji: "🐧", label: "Penguin" },
];

interface StudentFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  editStudent?: {
    id: string;
    name: string;
    gradeLevel: string | null;
    avatar: string | null;
  } | null;
}

export function StudentFormDialog({
  open,
  onClose,
  onSaved,
  editStudent,
}: StudentFormDialogProps) {
  const [name, setName] = useState(editStudent?.name ?? "");
  const [gradeLevel, setGradeLevel] = useState(
    editStudent?.gradeLevel ?? "",
  );
  const [avatar, setAvatar] = useState(editStudent?.avatar ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = !!editStudent;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter a name.");
      return;
    }

    setLoading(true);

    try {
      const url = isEdit
        ? `/api/students/${editStudent!.id}`
        : "/api/students";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          gradeLevel: gradeLevel || null,
          avatar: avatar || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      onSaved();
      onClose();
      setName("");
      setGradeLevel("");
      setAvatar("");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl border shadow-xl w-full max-w-md mx-4 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="font-heading text-xl font-bold text-gray-800 mb-4">
          {isEdit ? "Edit Student" : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-sprout-400 focus:ring-2 focus:ring-sprout-100 outline-none transition-all"
              placeholder="Child's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade Level
            </label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-sprout-400 focus:ring-2 focus:ring-sprout-100 outline-none transition-all"
            >
              <option value="">Select grade</option>
              {grades.map((g) => (
                <option key={g.slug} value={g.slug}>
                  {g.name} (Ages {g.ageRange})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar
            </label>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((a) => (
                <button
                  key={a.emoji}
                  type="button"
                  onClick={() => setAvatar(a.emoji)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                    avatar === a.emoji
                      ? "bg-sprout-100 ring-2 ring-sprout-400"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {a.emoji}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-full bg-sprout-500 text-white text-sm font-medium hover:bg-sprout-600 transition-colors disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
