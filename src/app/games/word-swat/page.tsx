"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dolchGrades } from "@/data/dolch-words";
import { RotateCcw, Trophy, ArrowLeft, Zap } from "lucide-react";
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

interface FlyWord {
  id: number;
  word: string;
  swatted: boolean;
}

const GRID_SIZE = 9;

export default function WordSwatPage() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [selectedGrade, setSelectedGrade] = useState("pre-primer");
  const [flies, setFlies] = useState<FlyWord[]>([]);
  const [targetWord, setTargetWord] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [misses, setMisses] = useState(0);
  const [feedback, setFeedback] = useState<"hit" | "miss" | null>(null);
  const totalRounds = 10;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const spawnRound = useCallback(
    (
      allWords: string[],
      currentRound: number,
      currentScore: number,
      currentMisses: number
    ) => {
      if (currentRound >= totalRounds) {
        setGameState("complete");
        return;
      }

      const start = (currentRound * GRID_SIZE) % allWords.length;
      const unique = new Set<string>();
      for (let i = 0; unique.size < Math.min(GRID_SIZE, allWords.length); i++) {
        unique.add(allWords[(start + i) % allWords.length]);
      }
      const selected = shuffle([...unique]);
      const target = selected[Math.floor(Math.random() * selected.length)];

      const gridFlies: FlyWord[] = selected.map((word, i) => ({
        id: i,
        word,
        swatted: false,
      }));

      setFlies(gridFlies);
      setTargetWord(target);
      setRound(currentRound);
      setScore(currentScore);
      setMisses(currentMisses);
      setFeedback(null);
    },
    []
  );

  const allWordsRef = useRef<string[]>([]);
  const currentScoreRef = useRef(0);
  const currentMissesRef = useRef(0);
  const currentRoundRef = useRef(0);

  const handleSwat = useCallback(
    (flyId: number) => {
      const fly = flies.find((f) => f.id === flyId);
      if (!fly || fly.swatted || feedback) return;

      if (fly.word === targetWord) {
        setFeedback("hit");
        const newScore = score + 1;
        const newRound = round + 1;
        currentScoreRef.current = newScore;
        currentRoundRef.current = newRound;
        setFlies((prev) =>
          prev.map((f) => (f.id === flyId ? { ...f, swatted: true } : f))
        );
        timerRef.current = setTimeout(() => {
          spawnRound(
            allWordsRef.current,
            newRound,
            newScore,
            currentMissesRef.current
          );
        }, 800);
      } else {
        setFeedback("miss");
        const newMisses = misses + 1;
        currentMissesRef.current = newMisses;
        timerRef.current = setTimeout(() => {
          setFeedback(null);
        }, 600);
      }
    },
    [flies, targetWord, feedback, score, round, misses, spawnRound]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const doStart = useCallback(() => {
    const grade = dolchGrades.find((g) => g.slug === selectedGrade);
    if (!grade) return;
    allWordsRef.current = shuffle(grade.words.map((w) => w.text));
    currentScoreRef.current = 0;
    currentMissesRef.current = 0;
    currentRoundRef.current = 0;
    spawnRound(allWordsRef.current, 0, 0, 0);
    setGameState("playing");
  }, [selectedGrade, spawnRound]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/games"
          className="text-sm text-gray-500 hover:text-sun-600 transition-colors"
        >
          <ArrowLeft className="inline w-4 h-4 mr-1" />
          Back to Games
        </Link>
      </div>

      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-2">
        Word Swat
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Find and swat the target word as fast as you can! Watch out for wrong
        answers.
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
                    ? "bg-sun-500 text-white"
                    : "bg-sun-50 text-sun-700 hover:bg-sun-100"
                )}
              >
                {g.name} ({g.words.length})
              </button>
            ))}
          </div>
          <button
            onClick={doStart}
            className="bg-sun-500 text-white font-heading font-bold px-8 py-3 rounded-full hover:bg-sun-600 transition-colors inline-flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Start Swatting!
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">
              Round:{" "}
              <span className="font-bold text-gray-800">
                {round + 1}/{totalRounds}
              </span>
            </span>
            <span className="text-sm text-gray-500">
              Score:{" "}
              <span className="font-bold text-gray-800">{score}</span>
            </span>
            <button
              onClick={() => {
                if (timerRef.current) clearTimeout(timerRef.current);
                setGameState("setup");
              }}
              className="text-sm text-gray-500 hover:text-sun-600 flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Target word */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-2">Find this word:</p>
            <motion.div
              key={targetWord}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block bg-sun-50 border-2 border-sun-300 rounded-2xl px-8 py-4"
            >
              <span className="font-display font-bold text-4xl text-sun-600">
                {targetWord}
              </span>
            </motion.div>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback === "hit" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mb-4"
              >
                <span className="inline-flex items-center gap-2 bg-sprout-100 text-sprout-700 font-heading font-bold px-4 py-2 rounded-full">
                  SWATTED!
                </span>
              </motion.div>
            )}
            {feedback === "miss" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mb-4"
              >
                <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 font-heading font-bold px-4 py-2 rounded-full">
                  Wrong word! Try again.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Word grid */}
          <div className="grid grid-cols-3 gap-3">
            <AnimatePresence mode="popLayout">
              {flies.map((fly) => (
                <motion.button
                  key={`${round}-${fly.id}`}
                  layout
                  initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                  animate={{
                    scale: fly.swatted ? 0.85 : 1,
                    opacity: fly.swatted ? 0.4 : 1,
                    rotate: fly.swatted ? 5 : 0,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => handleSwat(fly.id)}
                  className={cn(
                    "aspect-[4/3] rounded-2xl font-display font-bold text-2xl sm:text-3xl transition-all border-2 flex items-center justify-center relative overflow-hidden",
                    fly.swatted
                      ? "bg-sprout-100 border-sprout-400 text-sprout-700"
                      : feedback === "miss" && fly.word === targetWord
                        ? "bg-white border-sun-400 text-sun-700 ring-2 ring-sun-300"
                        : "bg-white border-gray-200 text-gray-700 hover:border-sun-300 hover:bg-sun-50 hover:shadow-md active:scale-95 cursor-pointer"
                  )}
                  disabled={fly.swatted || feedback === "hit"}
                >
                  {/* Fly icon decoration */}
                  {!fly.swatted && (
                    <span className="absolute top-1 right-1 text-xs opacity-30">
                      🪰
                    </span>
                  )}
                  {fly.word}
                  {fly.swatted && (
                    <span className="absolute top-1 right-1 text-xs">✓</span>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {gameState === "complete" && (
        <div className="max-w-md mx-auto text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sun-100 mb-6">
            <Trophy className="w-10 h-10 text-sun-600" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-800 mb-2">
            Great Job!
          </h2>
          <p className="text-gray-600 mb-1">
            You swatted <span className="font-bold text-sun-600">{score}</span>{" "}
            out of <span className="font-bold">{totalRounds}</span> words
            correctly!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Mistakes: {currentMissesRef.current}
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={doStart}
              className="inline-flex items-center gap-2 bg-sun-500 text-white font-medium px-6 py-3 rounded-full hover:bg-sun-600 transition-colors"
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
