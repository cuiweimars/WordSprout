"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dolchGrades } from "@/data/dolch-words";
import { RotateCcw, Trophy, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useGameResult } from "@/hooks/use-game-result";
import { useWordSpeak } from "@/hooks/use-word-speak";

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
  const { submitGameResult } = useGameResult();
  const { speak, playCorrect, playIncorrect } = useWordSpeak();
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
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);

  const totalRounds = 8;

  const currentWord = wordQueue[currentIndex] ?? "";

  const checkWord = useCallback(
    (newSlots: (string | null)[], word: string, idx: number, queue: string[]) => {
      const filled = newSlots.filter((s) => s !== null).length;
      if (filled !== word.length) return;

      const spelled = newSlots.join("");
      if (spelled === word) {
        setIsCorrect(true);
        playCorrect();
        speak(word);
        const newScore = score + 1;
        setScore(newScore);
        setTimeout(() => {
          if (idx + 1 >= queue.length) {
            setGameState("complete");
            submitGameResult({
              gameType: "build_word",
              score: newScore,
              maxScore: queue.length,
              wordsPracticed: queue,
              wordResults: queue.map((w) => ({ word: w, correct: true })),
            });
          } else {
            const nextIdx = idx + 1;
            const nextWord = queue[nextIdx];
            const letters = nextWord.split("");
            setCurrentIndex(nextIdx);
            setSlots(new Array(letters.length).fill(null));
            setScrambledLetters(shuffle(letters));
            setUsedIndices(new Set());
            setIsCorrect(null);
            setShowHint(false);
          }
        }, 2500);
      } else {
        setIsCorrect(false);
        playIncorrect();
        setTimeout(() => {
          const letters = word.split("");
          setSlots(new Array(letters.length).fill(null));
          setScrambledLetters(shuffle(letters));
          setUsedIndices(new Set());
          setIsCorrect(null);
          setShowHint(false);
        }, 2500);
      }
    },
    [],
  );

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

  const placeLetter = useCallback(
    (letterIdx: number, slotIdx?: number) => {
      if (usedIndices.has(letterIdx) || isCorrect !== null) return;

      const targetSlot = slotIdx ?? slots.findIndex((s) => s === null);
      if (targetSlot === -1 || slots[targetSlot] !== null) return;

      const newSlots = [...slots];
      newSlots[targetSlot] = scrambledLetters[letterIdx];
      setSlots(newSlots);
      setUsedIndices((prev) => new Set(prev).add(letterIdx));
      checkWord(newSlots, currentWord, currentIndex, wordQueue);
    },
    [usedIndices, slots, scrambledLetters, isCorrect, currentWord, currentIndex, wordQueue, checkWord],
  );

  const removeLetter = useCallback(
    (slotIdx: number) => {
      if (slots[slotIdx] === null || isCorrect !== null) return;

      const letter = slots[slotIdx];
      const newSlots = [...slots];
      newSlots[slotIdx] = null;
      setSlots(newSlots);

      // Find and free the corresponding scrambled letter index
      const newUsed = new Set(usedIndices);
      for (const idx of newUsed) {
        if (scrambledLetters[idx] === letter) {
          newUsed.delete(idx);
          break;
        }
      }
      setUsedIndices(newUsed);
    },
    [slots, scrambledLetters, usedIndices, isCorrect],
  );

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, letterIdx: number) => {
    if (usedIndices.has(letterIdx) || isCorrect !== null) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", String(letterIdx));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverSlot(slotIdx);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault();
    setDragOverSlot(null);
    const letterIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (isNaN(letterIdx)) return;
    placeLetter(letterIdx, slots[slotIdx] === null ? slotIdx : undefined);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/games" className="text-sm text-gray-500 hover:text-sprout-600 transition-colors">
          <ArrowLeft className="inline w-4 h-4 mr-1" />
          Back to Games
        </Link>
      </div>

      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-2">
        Build the Word
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Click or drag letters into the correct order to spell sight words!
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
                    : "bg-berry-50 text-berry-700 hover:bg-berry-100",
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

          {/* Letter slots (drop targets) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
            <AnimatePresence mode="popLayout">
              {slots.map((letter, idx) => (
                <motion.div
                  key={`slot-${idx}`}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onDragOver={(e) => handleDragOver(e as unknown as React.DragEvent, idx)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e as unknown as React.DragEvent, idx)}
                  onClick={() => removeLetter(idx)}
                  className={cn(
                    "w-14 h-16 sm:w-18 sm:h-20 rounded-xl text-2xl sm:text-3xl font-display font-bold transition-all border-2 flex items-center justify-center select-none",
                    dragOverSlot === idx && letter === null
                      ? "border-sprout-400 bg-sprout-50 scale-105"
                      : isCorrect === true && letter !== null
                        ? "bg-sprout-100 border-sprout-400 text-sprout-700"
                        : isCorrect === false && letter !== null
                          ? "bg-red-50 border-red-300 text-red-600"
                          : letter !== null
                            ? "bg-white border-sprout-300 text-sprout-700 shadow-md cursor-pointer hover:border-sprout-400"
                            : "bg-gray-50 border-dashed border-gray-300 text-gray-300",
                  )}
                >
                  {letter || ""}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Scrambled letters (drag sources) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {scrambledLetters.map((letter, idx) => (
              <motion.button
                key={`letter-${idx}`}
                layout
                animate={{
                  scale: usedIndices.has(idx) ? 0.8 : 1,
                  opacity: usedIndices.has(idx) ? 0.3 : 1,
                }}
                onClick={() => placeLetter(idx)}
                draggable={!usedIndices.has(idx) && isCorrect === null}
                onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, idx)}
                className={cn(
                  "w-14 h-16 sm:w-18 sm:h-20 rounded-xl text-2xl sm:text-3xl font-display font-bold transition-all border-2 flex items-center justify-center select-none",
                  usedIndices.has(idx)
                    ? "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed"
                    : "bg-white border-berry-200 text-berry-700 shadow-sm hover:border-berry-400 hover:shadow-md cursor-grab active:cursor-grabbing active:scale-95",
                )}
                disabled={usedIndices.has(idx) || isCorrect !== null}
              >
                {letter}
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          {isCorrect === true && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-6">
              <span className="inline-flex items-center gap-2 bg-sprout-100 text-sprout-700 font-heading font-bold px-4 py-2 rounded-full">
                <Check className="w-5 h-5" /> Correct!
              </span>
            </motion.div>
          )}
          {isCorrect === false && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-6">
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
