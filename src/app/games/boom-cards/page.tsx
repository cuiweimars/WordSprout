"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dolchGrades } from "@/data/dolch-words";
import { RotateCcw, Trophy, ArrowLeft, Bomb, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

type GameState = "setup" | "playing" | "complete";

interface Card {
  id: number;
  word: string;
  isBoom: boolean;
  collected: boolean;
}

export default function BoomCardsPage() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [selectedGrade, setSelectedGrade] = useState("pre-primer");
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState<
    "correct" | "wrong" | "boom" | null
  >(null);

  const totalCards = 15;
  const boomCount = 3;

  const startGame = useCallback(() => {
    const grade = dolchGrades.find((g) => g.slug === selectedGrade);
    if (!grade) return;

    const wordCards = shuffle(grade.words.map((w) => w.text)).slice(
      0,
      totalCards - boomCount
    );
    const boomCards: Card[] = Array.from({ length: boomCount }, (_, i) => ({
      id: totalCards - boomCount + i,
      word: "BOOM!",
      isBoom: true,
      collected: false,
    }));
    const wordCardObjects: Card[] = wordCards.map((w, i) => ({
      id: i,
      word: w,
      isBoom: false,
      collected: false,
    }));
    const fullDeck = shuffle([...wordCardObjects, ...boomCards]);

    setDeck(fullDeck);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setRevealed(false);
    setFeedback(null);
    setGameState("playing");
  }, [selectedGrade]);

  const handleReveal = useCallback(() => {
    if (revealed || feedback) return;
    setRevealed(true);
  }, [revealed, feedback]);

  const handleCorrect = useCallback(() => {
    if (!revealed || feedback) return;
    const card = deck[currentIndex];
    if (!card) return;

    const newScore = score + 1;
    const newStreak = streak + 1;
    setScore(newScore);
    setStreak(newStreak);
    if (newStreak > bestStreak) setBestStreak(newStreak);
    setFeedback("correct");

    setTimeout(() => advanceCard(), 1000);
  }, [revealed, feedback, deck, currentIndex, score, streak, bestStreak]);

  const handleWrong = useCallback(() => {
    if (!revealed || feedback) return;
    setFeedback("wrong");
    setStreak(0);

    setTimeout(() => advanceCard(), 1200);
  }, [revealed, feedback]);

  const handleBoom = useCallback(() => {
    if (feedback) return;
    setFeedback("boom");
    setStreak(0);
    setScore(Math.max(0, score - 1));

    setTimeout(() => advanceCard(), 1500);
  }, [feedback, score]);

  const advanceCard = useCallback(() => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= deck.length) {
      setGameState("complete");
      return;
    }
    setCurrentIndex(nextIdx);
    setRevealed(false);
    setFeedback(null);
  }, [currentIndex, deck.length]);

  const currentCard = deck[currentIndex];
  const cardsLeft = deck.length - currentIndex - 1;

  // When card is revealed and it's a BOOM, auto-trigger
  const handleFullReveal = useCallback(() => {
    handleReveal();
  }, [handleReveal]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/games"
          className="text-sm text-gray-500 hover:text-berry-600 transition-colors"
        >
          <ArrowLeft className="inline w-4 h-4 mr-1" />
          Back to Games
        </Link>
      </div>

      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-2">
        Boom Cards
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Flip cards and read the sight words to collect them. But watch out for
        BOOM cards — they steal your points!
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
                    ? "bg-berry-500 text-white"
                    : "bg-berry-50 text-berry-700 hover:bg-berry-100"
                )}
              >
                {g.name} ({g.words.length})
              </button>
            ))}
          </div>
          <div className="bg-berry-50 rounded-xl p-4 mb-6 text-sm text-berry-700">
            <strong>Rules:</strong> Flip a card, read the word, and mark if you
            know it. <Bomb className="inline w-4 h-4" /> BOOM cards cost you 1
            point! There are {boomCount} BOOM cards hidden in the deck.
          </div>
          <button
            onClick={startGame}
            className="bg-berry-500 text-white font-heading font-bold px-8 py-3 rounded-full hover:bg-berry-600 transition-colors inline-flex items-center gap-2"
          >
            <Bomb className="w-5 h-5" />
            Draw Cards!
          </button>
        </div>
      )}

      {gameState === "playing" && currentCard && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">
              Cards left:{" "}
              <span className="font-bold text-gray-800">{cardsLeft}</span>
            </span>
            <span className="text-sm text-gray-500">
              Score:{" "}
              <span className="font-bold text-gray-800">{score}</span>
            </span>
            {streak > 1 && (
              <span className="text-sm text-berry-600 font-bold flex items-center gap-1">
                <Star className="w-4 h-4" /> Streak: {streak}
              </span>
            )}
            <button
              onClick={() => setGameState("setup")}
              className="text-sm text-gray-500 hover:text-berry-600 flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Card area */}
          <div className="flex justify-center mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-64 h-80 perspective-1000"
              >
                {!revealed ? (
                  <button
                    onClick={handleFullReveal}
                    className="w-full h-full rounded-3xl bg-gradient-to-br from-berry-400 to-berry-600 border-2 border-berry-500 shadow-xl flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-95"
                  >
                    <span className="text-6xl mb-2">🃏</span>
                    <span className="text-white font-heading font-bold text-xl">
                      Tap to Flip
                    </span>
                  </button>
                ) : (
                  <div
                    className={cn(
                      "w-full h-full rounded-3xl border-2 shadow-xl flex flex-col items-center justify-center p-6",
                      currentCard.isBoom
                        ? "bg-gradient-to-br from-red-50 to-red-100 border-red-300"
                        : "bg-gradient-to-br from-white to-berry-50 border-berry-200"
                    )}
                  >
                    {currentCard.isBoom ? (
                      <>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                          }}
                          className="text-6xl mb-4"
                        >
                          💥
                        </motion.span>
                        <span className="font-display font-bold text-4xl text-red-600">
                          BOOM!
                        </span>
                        <p className="text-red-500 text-sm mt-3">
                          You lose 1 point!
                        </p>
                        <button
                          onClick={handleBoom}
                          className="mt-4 bg-red-500 text-white font-heading font-bold px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
                        >
                          Continue
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="font-display font-bold text-4xl sm:text-5xl text-berry-700 mb-6">
                          {currentCard.word}
                        </span>
                        <div className="flex gap-3">
                          <button
                            onClick={handleCorrect}
                            className="bg-sprout-500 text-white font-heading font-bold px-6 py-2.5 rounded-full hover:bg-sprout-600 transition-colors"
                          >
                            I Know It!
                          </button>
                          <button
                            onClick={handleWrong}
                            className="bg-gray-200 text-gray-600 font-heading font-bold px-6 py-2.5 rounded-full hover:bg-gray-300 transition-colors"
                          >
                            Not Yet
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback === "correct" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <span className="inline-flex items-center gap-2 bg-sprout-100 text-sprout-700 font-heading font-bold px-4 py-2 rounded-full">
                  <Star className="w-4 h-4" /> +1 Point!
                </span>
              </motion.div>
            )}
            {feedback === "wrong" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 font-heading font-bold px-4 py-2 rounded-full">
                  Keep practicing this word!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {gameState === "complete" && (
        <div className="max-w-md mx-auto text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-berry-100 mb-6">
            <Trophy className="w-10 h-10 text-berry-600" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-800 mb-2">
            Deck Complete!
          </h2>
          <p className="text-gray-600 mb-1">
            You collected{" "}
            <span className="font-bold text-berry-600">{score}</span> points!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Best streak: {bestStreak} in a row
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 bg-berry-500 text-white font-medium px-6 py-3 rounded-full hover:bg-berry-600 transition-colors"
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
