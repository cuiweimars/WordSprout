import { cn } from "@/lib/utils";

interface WordCardProps {
  word: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WordCard({ word, size = "md", className }: WordCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl border-2 border-sprout-200 bg-white shadow-sm",
        size === "sm" && "w-20 h-20 text-xl",
        size === "md" && "w-32 h-32 text-3xl",
        size === "lg" && "w-48 h-48 text-5xl",
        "font-display font-bold text-sprout-700",
        className
      )}
    >
      {word}
    </div>
  );
}
