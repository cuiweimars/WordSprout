"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dolchGrades } from "@/data/dolch-words";
import { RotateCcw, Trophy, ArrowLeft, Volume2 } from "lucide-react";
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

const GRID = 4;
const TOTAL_CELLS = GRID * GRID;

export default function BingoPage() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [selectedGrade, setSelectedGrade] = useState("pre-primer");
  const [board, setBoard] = useState<string[]>([]);
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [callQueue, setCallQueue] = useState<string[]>([]);
  const [callIndex, setCallIndex] = useState(0);
  const [currentCall, setCurrentCall] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    const grade = dolchGrades.find((g) => g.slug === selectedGrade);
    if (!grade) return;

    const allWords = shuffle(grade.words.map((w) => w.text));
    const boardWords = allWords.slice(0, TOTAL_CELLS);
    const callWords = shuffle(boardWords);

    setBoard(boardWords);
    setMarked(new Set());
    setCallQueue(callWords);
    setCallIndex(0);
    setCurrentCall(callWords[0]);
    setScore(0);
    setGameState("playing");
  }, [selectedGrade]);

  const callNextWord = useCallback(() => {
    const nextIdx = callIndex + 1;
    if (nextIdx >= callQueue.length) {
      return;
    }
    setCallIndex(nextIdx);
    setCurrentCall(callQueue[nextIdx]);
  }, [callIndex, callQueue]);

  const handleCellClick = useCallback(
    (idx: number) => {
      if (marked.has(idx) || !currentCall) return;

      if (board[idx] === currentCall) {
        const newMarked = new Set(marked);
        newMarked.add(idx);
        setMarked(newMarked);
        setScore((s) => s + 1);

        // Check bingo (row, col, diagonal)
        const hasBingo = checkBingo(newMarked);
        if (hasBingo) {
          setGameState("complete");
          return;
        }
        callNextWord();
      }
    },
    [marked, currentCall, board, callNextWord]
  );

  function checkBingo(m: Set<number>): boolean {
    // Rows
    for (let r = 0; r < GRID; r++) {
      let complete = true;
      for (let c = 0; c < GRID; c++) {
        if (!m.has(r * GRID + c)) {
          complete = false;
          break;
        }
      }
      if (complete) return true;
    }
    // Cols
    for (let c = 0; c < GRID; c++) {
      let complete = true;
      for (let r = 0; r < GRID; r++) {
        if (!m.has(r * GRID + c)) {
          complete = false;
          break;
        }
      }
      if (complete) return true;
    }
    // Diagonals
    let d1 = true,
      d2 = true;
    for (let i = 0; i < GRID; i++) {
      if (!m.has(i * GRID + i)) d1 = false;
      if (!m.has(i * GRID + (GRID - 1 - i))) d2 = false;
    }
    return d1 || d2;
  }

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
        Sight Word Bingo
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Listen for the called word and tap it on your bingo board. Get a row,
        column, or diagonal to win!
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
            className="bg-sprout-500 text-white font-heading font-bold px-8 py-3 rounded-full hover:bg-sprout-600 transition-colors inline-flex items-center gap-2"
          >
            <Volume2 className="w-5 h-5" />
            Start Bingo!
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">
              Words called:{" "}
              <span className="font-bold text-gray-800">{callIndex + 1}</span>
            </span>
            <span className="text-sm text-gray-500">
              Marked:{" "}
              <span className="font-bold text-gray-800">{marked.size}/{TOTAL_CELLS}</span>
            </span>
            <button
              onClick={() => setGameState("setup")}
              className="text-sm text-gray-500 hover:text-sprout-600 flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Current call */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-2">Find this word:</p>
            <motion.div
              key={currentCall}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-block bg-sprout-50 border-2 border-sprout-300 rounded-2xl px-8 py-4"
            >
              <span className="font-display font-bold text-3xl text-sprout-600">
                {currentCall}
              </span>
            </motion.div>
          </div>

          {/* Bingo board */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
            {board.map((word, idx) => {
              const isMarked = marked.has(idx);
              const isTarget = word === currentCall && !isMarked;
              return (
                <motion.button
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: isMarked ? 0.95 : 1,
                    opacity: 1,
                  }}
                  transition={{ delay: idx * 0.02 }}
                  onClick={() => handleCellClick(idx)}
                  className={cn(
                    "aspect-square rounded-xl font-display font-bold text-base sm:text-xl transition-all border-2 flex items-center justify-center relative",
                    isMarked
                      ? "bg-sprout-200 border-sprout-400 text-sprout-800"
                      : isTarget
                        ? "bg-white border-sprout-300 text-sprout-700 hover:bg-sprout-50 hover:shadow-md ring-2 ring-sprout-200"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm"
                  )}
                  disabled={isMarked}
                >
                  {word}
                  {isMarked && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0.5 right-1 text-sprout-600 text-xs font-bold"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {gameState === "complete" && (
        <div className="max-w-md mx-auto text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sprout-100 mb-6">
            <Trophy className="w-10 h-10 text-sprout-600" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-800 mb-2">
            BINGO!
          </h2>
          <p className="text-gray-600 mb-1">
            You got a bingo in{" "}
            <span className="font-bold text-sprout-600">{callIndex + 1}</span>{" "}
            words!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Cells marked: {marked.size}/{TOTAL_CELLS}
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
