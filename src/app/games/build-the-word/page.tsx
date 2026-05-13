"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dolchGrades } from "@/data/dolch-words";
import { RotateCcw, Trophy, ArrowLeft, Check } from "lucide-react";
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

export default function BuildTheWordPage() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [selectedGrade, setSelectedGrade] = useState("pre-primer");
  const [wordQueue, setWordQueue] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const totalRounds = 8;

  const startGame = useCallback(() => {
    const grade = dolchGrades.find((g) => g.slug === selectedGrade);
    if (!grade) return;
    const eligible = grade.words.filter((w) => w.text.length <= 6);
    const queue = shuffle(eligible.map((w) => w.text)).slice(0, totalRounds);
    setWordQueue(queue);
    setCurrentIndex(0);
    setScore(0);
    setIsCorrect(null);
    setShowHint(false);

    if (queue.length > 0) {
      const letters = queue[0].split("");
      setSlots(new Array(letters.length).fill(null));
      setScrambledLetters(shuffle(letters));
      setUsedIndices(new Set());
    }
    setGameState("playing");
  }, [selectedGrade]);

  const currentWord = wordQueue[currentIndex] ?? "";

  const handleLetterClick = useCallback(
    (letterIdx: number) => {
      if (usedIndices.has(letterIdx) || isCorrect !== null) return;

      const nextSlot = slots.findIndex((s) => s === null);
      if (nextSlot === -1) return;

      const newSlots = [...slots];
      newSlots[nextSlot] = scrambledLetters[letterIdx];
      setSlots(newSlots);
      setUsedIndices((prev) => new Set(prev).add(letterIdx));

      // Check if word is complete
      const filled = newSlots.filter((s) => s !== null).length + 1;
      if (filled === currentWord.length) {
        const spelled = newSlots.join("");
        if (spelled === currentWord) {
          setIsCorrect(true);
          setScore((s) => s + 1);
          setTimeout(() => {
            if (currentIndex + 1 >= wordQueue.length) {
              setGameState("complete");
            } else {
              const nextIdx = currentIndex + 1;
              setCurrentIndex(nextIdx);
              const nextWord = wordQueue[nextIdx];
              const letters = nextWord.split("");
              setSlots(new Array(letters.length).fill(null));
              setScrambledLetters(shuffle(letters));
              setUsedIndices(new Set());
              setIsCorrect(null);
              setShowHint(false);
            }
          }, 1000);
        } else {
          setIsCorrect(false);
          setTimeout(() => {
            const letters = currentWord.split("");
            setSlots(new Array(letters.length).fill(null));
            setScrambledLetters(shuffle(letters));
            setUsedIndices(new Set());
            setIsCorrect(null);
            setShowHint(false);
          }, 1200);
        }
      }
    },
    [usedIndices, slots, scrambledLetters, isCorrect, currentWord, currentIndex, wordQueue]
  );

  const handleRemoveLetter = useCallback(
    (slotIdx: number) => {
      if (slots[slotIdx] === null || isCorrect !== null) return;

      const letter = slots[slotIdx];
      const newSlots = [...slots];
      newSlots[slotIdx] = null;
      setSlots(newSlots);

      // Find the original index of this letter to "un-use" it
      for (let i = 0; i < scrambledLetters.length; i++) {
        if (scrambledLetters[i] === letter && usedIndices.has(i)) {
          const newUsed = new Set(usedIndices);
          newUsed.delete(i);
          // Only remove if this is the correct one (match from right to left in slots)
          let found = false;
          for (let s = slotIdx; s >= 0; s--) {
            if (slots[s] === letter && !newSlots.slice(0, s).includes(null)) {
              found = true;
              break;
            }
          }
          if (found || newUsed.size === newSlots.filter((s) => s !== null).length) {
            setUsedIndices(newUsed);
            return;
          }
        }
      }
      // Fallback: just remove any matching used index
      const newUsed = new Set(usedIndices);
      for (const idx of newUsed) {
        if (scrambledLetters[idx] === letter) {
          newUsed.delete(idx);
          setUsedIndices(newUsed);
          return;
        }
      }
    },
    [slots, scrambledLetters, usedIndices, isCorrect]
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
        Build the Word
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Drag letters into the correct order to spell sight words!
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
                {g.name} ({g.words.filter((w) => w.text.length <= 6).length})
              </button>
            ))}
          </div>
          <button
            onClick={startGame}
            className="bg-berry-500 text-white font-heading font-bold px-8 py-3 rounded-full hover:bg-berry-600 transition-colors"
          >
            Start Game
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500">
              Word: <span className="font-bold text-gray-800">{currentIndex + 1}/{wordQueue.length}</span>
            </span>
            <span className="text-sm text-gray-500">
              Score: <span className="font-bold text-gray-800">{score}</span>
            </span>
            <button
              onClick={() => setGameState("setup")}
              className="text-sm text-gray-500 hover:text-berry-600 flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Hint toggle */}
          <div className="text-center mb-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-gray-400 hover:text-sprout-600 underline"
            >
              {showHint ? "Hide hint" : "Show hint"}
            </button>
          </div>

          {/* Target word display (hint) */}
          {showHint && (
            <div className="text-center mb-6">
              <span className="font-display font-bold text-3xl text-sprout-300">
                {currentWord}
              </span>
            </div>
          )}

          {/* Letter slots */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
            <AnimatePresence mode="popLayout">
              {slots.map((letter, idx) => (
                <motion.button
                  key={`slot-${idx}`}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() => handleRemoveLetter(idx)}
                  className={cn(
                    "w-12 h-14 sm:w-16 sm:h-18 rounded-xl text-2xl sm:text-3xl font-display font-bold transition-all border-2 flex items-center justify-center",
                    isCorrect === true && letter !== null
                      ? "bg-sprout-100 border-sprout-400 text-sprout-700"
                      : isCorrect === false && letter !== null
                        ? "bg-red-50 border-red-300 text-red-600"
                        : letter !== null
                          ? "bg-white border-sprout-300 text-sprout-700 shadow-md cursor-pointer hover:border-sprout-400"
                          : "bg-gray-50 border-dashed border-gray-300 text-gray-300"
                  )}
                  disabled={letter === null || isCorrect !== null}
                >
                  {letter || ""}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Scrambled letters */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {scrambledLetters.map((letter, idx) => (
              <motion.button
                key={`letter-${idx}`}
                layout
                animate={{
                  scale: usedIndices.has(idx) ? 0.8 : 1,
                  opacity: usedIndices.has(idx) ? 0.3 : 1,
                }}
                onClick={() => handleLetterClick(idx)}
                className={cn(
                  "w-12 h-14 sm:w-16 sm:h-18 rounded-xl text-2xl sm:text-3xl font-display font-bold transition-all border-2 flex items-center justify-center",
                  usedIndices.has(idx)
                    ? "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed"
                    : "bg-white border-berry-200 text-berry-700 shadow-sm hover:border-berry-400 hover:shadow-md cursor-pointer"
                )}
                disabled={usedIndices.has(idx) || isCorrect !== null}
              >
                {letter}
              </motion.button>
            ))}
          </div>

          {/* Correct/incorrect feedback */}
          {isCorrect === true && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
              <span className="inline-flex items-center gap-2 bg-sprout-100 text-sprout-700 font-heading font-bold px-4 py-2 rounded-full">
                <Check className="w-5 h-5" /> Correct!
              </span>
            </motion.div>
          )}
          {isCorrect === false && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
              <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 font-heading font-bold px-4 py-2 rounded-full">
                Try again! The word is: {currentWord}
              </span>
            </motion.div>
          )}
        </div>
      )}

      {gameState === "complete" && (
        <div className="max-w-md mx-auto text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-berry-100 mb-6">
            <Trophy className="w-10 h-10 text-berry-600" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-800 mb-2">
            Well Done!
          </h2>
          <p className="text-gray-600 mb-4">
            You spelled {score} out of {wordQueue.length} words correctly!
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
