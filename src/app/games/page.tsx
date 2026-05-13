import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sight Word Games — Fun Learning Activities",
  description:
    "Free sight word games for kids ages 4-7. Play Word Match and Build the Word to make learning sight words fun.",
};

const games = [
  {
    slug: "word-match",
    title: "Word Match",
    description: "Flip cards to find matching pairs of sight words. A fun memory game that builds word recognition.",
    icon: "🃏",
    color: "sprout" as const,
  },
  {
    slug: "build-the-word",
    title: "Build the Word",
    description: "Drag and drop letters to spell sight words. Great for reinforcing letter-sound connections.",
    icon: "🔤",
    color: "berry" as const,
  },
];

export default function GamesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
        Sight Word Games
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Make learning sight words fun with our interactive games. Choose a game below to start playing!
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {games.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            className="block p-6 bg-white rounded-2xl border hover:shadow-md transition-all group"
          >
            <div className="text-4xl mb-4">{game.icon}</div>
            <h2 className="font-heading text-xl font-bold text-gray-800 mb-2 group-hover:text-sprout-600 transition-colors">
              {game.title}
            </h2>
            <p className="text-gray-600 text-sm">{game.description}</p>
            <p className="text-sprout-500 font-medium text-sm mt-3">
              Play Now →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
