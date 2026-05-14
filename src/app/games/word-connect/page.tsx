"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dolchGrades } from "@/data/dolch-words";
import { RotateCcw, Trophy, ArrowLeft, Circle, X } from "lucide-react";
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
type CellValue = null | "player" | "ai";
type Board = CellValue[];

const COLS = 7;
const ROWS = 6;

export default function WordConnectPage() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [selectedGrade, setSelectedGrade] = useState("pre-primer");
  const [board, setBoard] = useState<Board>(new Array(COLS * ROWS).fill(null));
  const [wordGrid, setWordGrid] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState("");
  const [winner, setWinner] = useState<"player" | "ai" | "draw" | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isAiTurn, setIsAiTurn] = useState(false);

  const startGame = useCallback(() => {
    const grade = dolchGrades.find((g) => g.slug === selectedGrade);
    if (!grade) return;

    const words = shuffle(grade.words.map((w) => w.text));
    const grid = Array.from({ length: COLS * ROWS }, (_, i) => words[i % words.length]);

    setBoard(new Array(COLS * ROWS).fill(null));
    setWordGrid(grid);
    setWinner(null);
    setFeedback(null);
    setIsAiTurn(false);
    pickTargetWord(grid, new Array(COLS * ROWS).fill(null));
    setGameState("playing");
  }, [selectedGrade]);

  const pickTargetWord = useCallback(
    (grid: string[], currentBoard: Board) => {
      // Pick from words that are in reachable cells
      const reachable: string[] = [];
      for (let c = 0; c < COLS; c++) {
        for (let r = ROWS - 1; r >= 0; r--) {
          const idx = r * COLS + c;
          if (currentBoard[idx] === null) {
            reachable.push(grid[idx]);
            break;
          }
        }
      }
      if (reachable.length > 0) {
        setTargetWord(reachable[Math.floor(Math.random() * reachable.length)]);
      }
    },
    []
  );

  const getLowestEmptyRow = useCallback(
    (col: number, currentBoard: Board): number => {
      for (let r = ROWS - 1; r >= 0; r--) {
        if (currentBoard[r * COLS + col] === null) return r;
      }
      return -1;
    },
    []
  );

  const checkWin = useCallback(
    (b: Board, player: CellValue): boolean => {
      if (!player) return false;
      // Horizontal
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
          if (
            b[r * COLS + c] === player &&
            b[r * COLS + c + 1] === player &&
            b[r * COLS + c + 2] === player &&
            b[r * COLS + c + 3] === player
          )
            return true;
        }
      }
      // Vertical
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r <= ROWS - 4; r++) {
          if (
            b[r * COLS + c] === player &&
            b[(r + 1) * COLS + c] === player &&
            b[(r + 2) * COLS + c] === player &&
            b[(r + 3) * COLS + c] === player
          )
            return true;
        }
      }
      // Diagonal /
      for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
          if (
            b[r * COLS + c] === player &&
            b[(r - 1) * COLS + c + 1] === player &&
            b[(r - 2) * COLS + c + 2] === player &&
            b[(r - 3) * COLS + c + 3] === player
          )
            return true;
        }
      }
      // Diagonal \
      for (let r = 0; r <= ROWS - 4; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
          if (
            b[r * COLS + c] === player &&
            b[(r + 1) * COLS + c + 1] === player &&
            b[(r + 2) * COLS + c + 2] === player &&
            b[(r + 3) * COLS + c + 3] === player
          )
            return true;
        }
      }
      return false;
    },
    []
  );

  const isBoardFull = useCallback((b: Board): boolean => {
    return b.every((cell) => cell !== null);
  }, []);

  const handleColumnClick = useCallback(
    (col: number) => {
      if (isAiTurn || feedback || winner) return;

      const row = getLowestEmptyRow(col, board);
      if (row === -1) return;

      const idx = row * COLS + col;
      const cellWord = wordGrid[idx];

      if (cellWord === targetWord) {
        setFeedback("correct");
        const newBoard = [...board];
        newBoard[idx] = "player";
        setBoard(newBoard);

        if (checkWin(newBoard, "player")) {
          setWinner("player");
          setPlayerScore((s) => s + 1);
          setTimeout(() => setGameState("complete"), 1000);
          return;
        }
        if (isBoardFull(newBoard)) {
          setWinner("draw");
          setTimeout(() => setGameState("complete"), 1000);
          return;
        }

        // AI turn
        setTimeout(() => {
          setFeedback(null);
          setIsAiTurn(true);
          setTimeout(() => {
            aiMove(newBoard);
            setIsAiTurn(false);
          }, 600);
        }, 400);
      } else {
        setFeedback("wrong");
        setTimeout(() => setFeedback(null), 800);
      }
    },
    [isAiTurn, feedback, winner, board, wordGrid, targetWord, getLowestEmptyRow, checkWin, isBoardFull]
  );

  const aiMove = useCallback(
    (currentBoard: Board) => {
      // Simple AI: try to win, then block, then random
      const availableCols: number[] = [];
      for (let c = 0; c < COLS; c++) {
        if (getLowestEmptyRow(c, currentBoard) !== -1) {
          availableCols.push(c);
        }
      }
      if (availableCols.length === 0) return;

      let chosenCol = -1;

      // Try to win
      for (const c of availableCols) {
        const r = getLowestEmptyRow(c, currentBoard);
        const testBoard = [...currentBoard];
        testBoard[r * COLS + c] = "ai";
        if (checkWin(testBoard, "ai")) {
          chosenCol = c;
          break;
        }
      }

      // Try to block
      if (chosenCol === -1) {
        for (const c of availableCols) {
          const r = getLowestEmptyRow(c, currentBoard);
          const testBoard = [...currentBoard];
          testBoard[r * COLS + c] = "player";
          if (checkWin(testBoard, "player")) {
            chosenCol = c;
            break;
          }
        }
      }

      // Prefer center columns
      if (chosenCol === -1) {
        const center = [3, 2, 4, 1, 5, 0, 6];
        for (const c of center) {
          if (availableCols.includes(c)) {
            chosenCol = c;
            break;
          }
        }
      }

      const r = getLowestEmptyRow(chosenCol, currentBoard);
      const newBoard = [...currentBoard];
      newBoard[r * COLS + chosenCol] = "ai";
      setBoard(newBoard);

      if (checkWin(newBoard, "ai")) {
        setWinner("ai");
        setAiScore((s) => s + 1);
        setTimeout(() => setGameState("complete"), 1000);
        return;
      }
      if (isBoardFull(newBoard)) {
        setWinner("draw");
        setTimeout(() => setGameState("complete"), 1000);
        return;
      }

      pickTargetWord(wordGrid, newBoard);
    },
    [getLowestEmptyRow, checkWin, isBoardFull, wordGrid, pickTargetWord]
  );

  const previewRow = useCallback(
    (col: number): number => {
      return getLowestEmptyRow(col, board);
    },
    [board, getLowestEmptyRow]
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/games"
          className="text-sm text-gray-500 hover:text-sky-600 transition-colors"
        >
          <ArrowLeft className="inline w-4 h-4 mr-1" />
          Back to Games
        </Link>
      </div>

      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-2">
        Word Connect
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Drop your token on the column with the target word. Get 4 in a row to
        win!
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
                    ? "bg-sky-500 text-white"
                    : "bg-sky-50 text-sky-700 hover:bg-sky-100"
                )}
              >
                {g.name} ({g.words.length})
              </button>
            ))}
          </div>
          <div className="bg-sky-50 rounded-xl p-4 mb-6 text-sm text-sky-700">
            <strong>How to play:</strong> A target word appears at the top. Find
            the column where that word is in the lowest open slot, and click it
            to drop your token. Get 4 tokens in a row (horizontal, vertical, or
            diagonal) to win!
          </div>
          <button
            onClick={startGame}
            className="bg-sky-500 text-white font-heading font-bold px-8 py-3 rounded-full hover:bg-sky-600 transition-colors"
          >
            Start Game
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-sm">
                <Circle className="w-4 h-4 text-sky-500 fill-sky-500" />
                <span className="font-bold text-sky-600">{playerScore}</span>
                You
              </span>
              <span className="text-gray-300">|</span>
              <span className="inline-flex items-center gap-1 text-sm">
                <X className="w-4 h-4 text-berry-500" />
                <span className="font-bold text-berry-600">{aiScore}</span>
                Computer
              </span>
            </div>
            <button
              onClick={() => setGameState("setup")}
              className="text-sm text-gray-500 hover:text-sky-600 flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Target word */}
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 mb-2">
              Drop your token on the column with this word:
            </p>
            <motion.div
              key={targetWord}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block bg-sky-50 border-2 border-sky-300 rounded-2xl px-6 py-3"
            >
              <span className="font-display font-bold text-3xl text-sky-600">
                {targetWord}
              </span>
            </motion.div>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback === "wrong" && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mb-2"
              >
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 font-heading font-bold px-4 py-1.5 rounded-full text-sm">
                  Wrong column! Find &ldquo;{targetWord}&rdquo;
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Board */}
          <div className="bg-sky-800 rounded-2xl p-2 sm:p-3 max-w-lg mx-auto">
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
              {board.map((cell, idx) => {
                const col = idx % COLS;
                const row = Math.floor(idx / COLS);
                const word = wordGrid[idx];
                const isTargetCell =
                  word === targetWord &&
                  cell === null &&
                  row === previewRow(col);
                const isPlayable =
                  cell === null &&
                  !isAiTurn &&
                  !feedback &&
                  !winner;

                return (
                  <button
                    key={idx}
                    onClick={() => handleColumnClick(col)}
                    className={cn(
                      "aspect-square rounded-lg text-[10px] sm:text-xs font-display font-bold transition-all flex items-center justify-center relative",
                      cell === "player"
                        ? "bg-sky-400 text-white shadow-inner"
                        : cell === "ai"
                          ? "bg-berry-400 text-white shadow-inner"
                          : isTargetCell
                            ? "bg-sky-100 text-sky-700 ring-2 ring-sky-300 hover:bg-sky-200"
                            : isPlayable
                              ? "bg-sky-900/60 text-sky-300 hover:bg-sky-900/80"
                              : "bg-sky-900/40 text-sky-400/50"
                    )}
                    disabled={!isPlayable}
                  >
                    {cell === "player" ? (
                      <Circle className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : cell === "ai" ? (
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      word
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Turn indicator */}
          <div className="text-center mt-3">
            {isAiTurn && !winner && (
              <span className="text-sm text-berry-500 font-medium animate-pulse">
                Computer is thinking...
              </span>
            )}
            {!isAiTurn && !winner && (
              <span className="text-sm text-sky-600 font-medium">
                Your turn — find the column with &ldquo;{targetWord}&rdquo;
              </span>
            )}
          </div>
        </div>
      )}

      {gameState === "complete" && (
        <div className="max-w-md mx-auto text-center py-8">
          <div
            className={cn(
              "inline-flex items-center justify-center w-20 h-20 rounded-full mb-6",
              winner === "player"
                ? "bg-sky-100"
                : winner === "ai"
                  ? "bg-berry-100"
                  : "bg-gray-100"
            )}
          >
            <Trophy
              className={cn(
                "w-10 h-10",
                winner === "player"
                  ? "text-sky-600"
                  : winner === "ai"
                    ? "text-berry-600"
                    : "text-gray-600"
              )}
            />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-800 mb-2">
            {winner === "player"
              ? "You Win!"
              : winner === "ai"
                ? "Computer Wins!"
                : "It's a Draw!"}
          </h2>
          <p className="text-gray-600 mb-1">
            Score: You{" "}
            <span className="font-bold text-sky-600">{playerScore}</span> -{" "}
            <span className="font-bold text-berry-600">{aiScore}</span>{" "}
            Computer
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {winner === "player"
              ? "Great word recognition skills!"
              : "Keep practicing your sight words!"}
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 bg-sky-500 text-white font-medium px-6 py-3 rounded-full hover:bg-sky-600 transition-colors"
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
