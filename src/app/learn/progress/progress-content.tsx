"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProgressData {
  student: {
    id: string;
    name: string;
    gradeLevel: string | null;
    avatar: string | null;
  };
  progress: {
    mastered: number;
    reviewing: number;
    learning: number;
    new: number;
    totalWords: number;
    dueForReview: number;
  };
  recentWords: {
    wordText: string;
    wordSlug: string;
    status: string;
    consecutiveCorrect: number;
    lastReviewedAt: string | null;
  }[];
}

const statusColors: Record<string, string> = {
  mastered: "text-sprout-600 bg-sprout-50",
  reviewing: "text-sky-600 bg-sky-50",
  learning: "text-sun-600 bg-sun-50",
  new: "text-gray-600 bg-gray-50",
};

const statusLabels: Record<string, string> = {
  mastered: "Mastered",
  reviewing: "Reviewing",
  learning: "Learning",
  new: "New",
};

export default function ProgressContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const studentId = searchParams.get("studentId");
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!studentId) return;
    try {
      const res = await fetch(`/api/students/${studentId}/progress`);
      if (res.ok) {
        setData(await res.json());
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  if (!studentId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">No student selected.</p>
        <Link
          href="/learn"
          className="text-sprout-600 text-sm mt-2 inline-block"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-gray-100 rounded" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">Student not found.</p>
      </div>
    );
  }

  const { student, progress, recentWords } = data;
  const totalDolch = 220;
  const masteredPct = Math.round((progress.mastered / totalDolch) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-sprout-600 transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-sprout-50 flex items-center justify-center text-2xl">
          {student.avatar || "👶"}
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-800">
            {student.name}&apos;s Progress
          </h1>
          <p className="text-sm text-gray-500">
            Dolch 220 Sight Words
          </p>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="bg-white rounded-2xl border p-6 mb-6">
        <div className="flex items-center gap-8">
          <div className="relative w-28 h-28 shrink-0">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#22c55e"
                strokeWidth="8"
                strokeDasharray={`${masteredPct * 2.64} 264`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-2xl font-bold text-sprout-600">
                {masteredPct}%
              </span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Overall Mastery</p>
            <p className="font-heading font-bold text-3xl text-gray-800">
              {progress.mastered}
              <span className="text-lg text-gray-400 font-normal">
                /{totalDolch}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">words mastered</p>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Mastered", count: progress.mastered, color: "text-sprout-600", bg: "bg-sprout-50" },
          { label: "Reviewing", count: progress.reviewing, color: "text-sky-600", bg: "bg-sky-50" },
          { label: "Learning", count: progress.learning, color: "text-sun-600", bg: "bg-sun-50" },
          { label: "Due Review", count: progress.dueForReview, color: "text-berry-600", bg: "bg-berry-50" },
        ].map((card) => (
          <div key={card.label} className={`${card.bg} rounded-xl p-4 text-center`}>
            <p className={`font-heading text-2xl font-bold ${card.color}`}>
              {card.count}
            </p>
            <p className="text-xs text-gray-600">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Practice CTA */}
      {progress.dueForReview > 0 && (
        <Link
          href={`/learn/flashcards?studentId=${studentId}`}
          className="flex items-center justify-center gap-2 w-full bg-sprout-500 text-white font-medium py-3 rounded-full hover:bg-sprout-600 transition-colors mb-6"
        >
          {progress.dueForReview} words due for review — Start Practice
        </Link>
      )}

      {/* Recent Words */}
      {recentWords.length > 0 && (
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-heading font-bold text-lg text-gray-800 mb-4">
            Recent Words
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentWords.map((w) => (
              <Link
                key={w.wordSlug}
                href={`/sight-words/word/${w.wordSlug}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusColors[w.status] || statusColors.new}`}
              >
                {w.wordText}
                <span className="text-[10px] opacity-70">
                  {statusLabels[w.status] || w.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
