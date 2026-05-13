import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { StudentList } from "@/components/students/student-list";

export const metadata: Metadata = {
  title: "Learning Dashboard",
  description: "Track your sight word learning progress and start practice sessions.",
};

export default async function LearnPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-gray-800 mb-2">
          Welcome back{session.user.name ? `, ${session.user.name}` : ""}!
        </h1>
        <p className="text-gray-600">
          Manage student profiles and track sight word progress.
        </p>
      </div>

      {/* Student Profiles */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-xl text-gray-800">
            Students
          </h2>
        </div>
        <StudentList />
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="font-heading font-bold text-xl text-gray-800 mb-4">
          Activities
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/learn/flashcards"
            className="flex items-center gap-4 p-5 bg-white rounded-xl border hover:border-sprout-300 hover:shadow-sm transition-all"
          >
            <span className="text-3xl">🃏</span>
            <div>
              <p className="font-heading font-bold text-sprout-700">
                Flashcard Practice
              </p>
              <p className="text-sm text-gray-600">
                Flip cards with SRS scheduling
              </p>
            </div>
          </Link>
          <Link
            href="/games"
            className="flex items-center gap-4 p-5 bg-white rounded-xl border hover:border-berry-300 hover:shadow-sm transition-all"
          >
            <span className="text-3xl">🎮</span>
            <div>
              <p className="font-heading font-bold text-berry-600">
                Sight Word Games
              </p>
              <p className="text-sm text-gray-600">
                Learn through play
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 className="font-heading font-bold text-xl text-gray-800 mb-4">
          Resources
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Link
            href="/flashcards/printable"
            className="text-center p-4 bg-white rounded-xl border hover:border-sprout-300 hover:shadow-sm transition-all"
          >
            <span className="text-2xl block mb-1">🖨️</span>
            <p className="text-sm font-medium text-gray-700">Print Flashcards</p>
          </Link>
          <Link
            href="/worksheets"
            className="text-center p-4 bg-white rounded-xl border hover:border-sprout-300 hover:shadow-sm transition-all"
          >
            <span className="text-2xl block mb-1">📝</span>
            <p className="text-sm font-medium text-gray-700">Worksheets</p>
          </Link>
          <Link
            href="/sight-words"
            className="text-center p-4 bg-white rounded-xl border hover:border-sprout-300 hover:shadow-sm transition-all"
          >
            <span className="text-2xl block mb-1">📚</span>
            <p className="text-sm font-medium text-gray-700">Browse Words</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
