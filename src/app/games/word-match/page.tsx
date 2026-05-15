"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dolchGrades } from "@/data/dolch-words";
import { RotateCcw, Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useGameResult } from "@/hooks/use-game-result";
import { useWordSpeak } from "@/hooks/use-word-speak";

interface Card {
  id: string;
  word: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createCards(words: string[]): Card[] {
  const pairs = words.flatMap((word) => [
    { id: `${word}-1`, word, isFlipped: false, isMatched: false },
    { id: `${word}-2`, word, isFlipped: false, isMatched: false },
  ]);
  return shuffle(pairs);
}

type GameState = "setup" | "playing" | "complete";

export default function WordMatchPage() {
  const { submitGameResult } = useGameResult();
  const { speak, playCorrect, playFlip } = useWordSpeak();
  const [gameState, setGameState] = useState<GameState>("setup");
  const [selectedGrade, setSelectedGrade] = useState("pre-primer");
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const totalPairs = useMemo(() => {
    const grade = dolchGrades.find((g) => g.slug === selectedGrade);
    return grade ? Math.min(6, grade.words.length) : 6;
  }, [selectedGrade]);

  const startGame = useCallback(() => {
    const grade = dolchGrades.find((g) => g.slug === selectedGrade);
    if (!grade) return;
    const gameWords = shuffle(grade.words.map((w) => w.text)).slice(0, totalPairs);
    setCards(createCards(gameWords));
    setFlippedIds([]);
    setMoves(0);
    setMatchCount(0);
    setIsChecking(false);
    setGameState("playing");
  }, [selectedGrade, totalPairs]);

  const handleCardClick = useCallback(
    (id: string) => {
      if (isChecking) return;

      const card = cards.find((c) => c.id === id);
      if (!card || card.isFlipped || card.isMatched) return;

      const newFlipped = [...flippedIds, id];
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
      );
      setFlippedIds(newFlipped);
      playFlip();
      speak(card.word);

      if (newFlipped.length === 2) {
        setIsChecking(true);
        setMoves((m) => m + 1);
        const [firstId, secondId] = newFlipped;
        const first = cards.find((c) => c.id === firstId)!;
        const second = cards.find((c) => c.id === secondId)!;

        if (first.word === second.word) {
          playCorrect();
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          const newMatchCount = matchCount + 1;
          setMatchCount(newMatchCount);
          setFlippedIds([]);
          setIsChecking(false);
          if (newMatchCount === totalPairs) {
            setGameState("complete");
            const practicedWords = cards
              .filter((c) => c.isMatched || c.id === firstId || c.id === secondId)
              .map((c) => c.word);
            const uniqueWords = [...new Set(practicedWords)];
            submitGameResult({
              gameType: "word_match",
              score: uniqueWords.length,
              maxScore: totalPairs,
              wordsPracticed: uniqueWords,
              wordResults: uniqueWords.map((w) => ({ word: w, correct: true })),
            });
          }
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, isFlipped: false }
                  : c
              )
            );
            setFlippedIds([]);
            setIsChecking(false);
          }, 800);
        }
      }
    },
    [cards, flippedIds, isChecking, matchCount, totalPairs]
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/games"
          className="text-sm text-gray-500 hover:text-sprout-600 transition-colors"
        >
          <ArrowLeft className="inline w-4 h-4 mr-1" />
          Back to Games
        </Link>
      </div>

      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-2">
        Word Match
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Flip cards to find matching pairs of sight words. Train your memory and word recognition!
      </p>

      {gameState === "setup" && (
        <div className="bg-white rounded-2xl border p-6 sm:p-8">
          <h2 className="font-heading font-bold text-lg text-gray-800 mb-4">
            Choose a word list
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {dolchGrades.map((g) => (
              <button
                key={g.slug}
                onClick={() => setSelectedGrade(g.slug)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedGrade === g.slug
                    ? "bg-sprout-500 text-white"
                    : "bg-sprout-50 text-sprout-700 hover:bg-sprout-100"
                )}
              >
                {g.name} ({g.words.length})
              </button>
            ))}
          </div>
          <button
            onClick={startGame}
            className="bg-sprout-500 text-white font-heading font-bold px-8 py-3 rounded-full hover:bg-sprout-600 transition-colors"
          >
            Start Game
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">
              Moves: <span className="font-bold text-gray-800">{moves}</span>
            </span>
            <span className="text-sm text-gray-500">
              Matches: <span className="font-bold text-gray-800">{matchCount}/{totalPairs}</span>
            </span>
            <button
              onClick={() => setGameState("setup")}
              className="text-sm text-gray-500 hover:text-sprout-600 flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            <AnimatePresence mode="popLayout">
              {cards.map((card) => (
                <motion.button
                  key={card.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => handleCardClick(card.id)}
                  className={cn(
                    "aspect-square rounded-xl text-[38px] font-display font-bold transition-all duration-300",
                    card.isMatched
                      ? "bg-sprout-100 border-2 border-sprout-300 text-sprout-700 scale-95"
                      : card.isFlipped
                        ? "bg-sprout-50 border-2 border-sprout-400 text-sprout-700 shadow-md"
                        : "bg-sprout-500 border-2 border-sprout-500 text-white hover:bg-sprout-600 shadow-sm"
                  )}
                  disabled={card.isMatched || card.isFlipped}
                >
                  {card.isFlipped || card.isMatched ? card.word : "?"}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {gameState === "complete" && (
        <div className="max-w-md mx-auto text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sprout-100 mb-6">
            <Trophy className="w-10 h-10 text-sprout-600" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-800 mb-2">
            Great Job!
          </h2>
          <p className="text-gray-600 mb-4">
            You found all {totalPairs} pairs in {moves} moves!
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 bg-sprout-500 text-white font-medium px-6 py-3 rounded-full hover:bg-sprout-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
            <Link
              href="/games"
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              More Games
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
