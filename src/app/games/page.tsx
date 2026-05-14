import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sight Word Games — Fun Learning Activities",
  description:
    "Free sight word games for kids ages 4-7. Play Word Match, Word Swat, Bingo, Boom Cards, and more to make learning sight words fun.",
};

const games = [
  {
    slug: "word-match",
    title: "Word Match",
    description:
      "Flip cards to find matching pairs of sight words. A fun memory game that builds word recognition.",
    icon: "🃏",
    color: "sprout" as const,
  },
  {
    slug: "build-the-word",
    title: "Build the Word",
    description:
      "Drag and drop letters to spell sight words. Great for reinforcing letter-sound connections.",
    icon: "🔤",
    color: "berry" as const,
  },
  {
    slug: "word-swat",
    title: "Word Swat",
    description:
      "Spot the target word and swat it as fast as you can! A fast-paced game that builds quick word recognition.",
    icon: "🪰",
    color: "sun" as const,
  },
  {
    slug: "bingo",
    title: "Sight Word Bingo",
    description:
      "Listen for the called word and mark it on your bingo board. Get a row, column, or diagonal to win!",
    icon: "🎰",
    color: "sprout" as const,
  },
  {
    slug: "boom-cards",
    title: "Boom Cards",
    description:
      "Flip cards to read sight words and collect points. But watch out for BOOM cards that steal your score!",
    icon: "💥",
    color: "berry" as const,
  },
  {
    slug: "word-connect",
    title: "Word Connect",
    description:
      "Drop tokens to connect 4 in a row! Find the right column by reading the sight word on the board.",
    icon: "🔵",
    color: "sky" as const,
  },
];

const colorClasses = {
  sprout: {
    card: "hover:border-sprout-200",
    iconBg: "bg-sprout-50",
    link: "text-sprout-500",
  },
  berry: {
    card: "hover:border-berry-200",
    iconBg: "bg-berry-50",
    link: "text-berry-500",
  },
  sun: {
    card: "hover:border-sun-200",
    iconBg: "bg-sun-50",
    link: "text-sun-500",
  },
  sky: {
    card: "hover:border-sky-200",
    iconBg: "bg-sky-50",
    link: "text-sky-500",
  },
};

export default function GamesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
        Sight Word Games
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Make learning sight words fun with our interactive games. Choose a game
        below to start playing!
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((game) => {
          const colors = colorClasses[game.color];
          return (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className={`block p-6 bg-white rounded-2xl border hover:shadow-md transition-all group ${colors.card}`}
            >
              <div
                className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center text-2xl mb-4`}
              >
                {game.icon}
              </div>
              <h2 className="font-heading text-xl font-bold text-gray-800 mb-2 group-hover:text-sprout-600 transition-colors">
                {game.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {game.description}
              </p>
              <p
                className={`${colors.link} font-medium text-sm mt-3`}
              >
                Play Now →
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
