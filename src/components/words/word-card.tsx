import { cn } from "@/lib/utils";

interface WordCardProps {
  word: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  theme?: "sprout" | "sun" | "berry" | "sky";
}

const themes = {
  sprout: {
    bg: "bg-gradient-to-br from-sprout-50 via-white to-sprout-100",
    border: "border-sprout-200",
    text: "text-sprout-700",
    accent: "bg-sprout-400",
    dot: "fill-sprout-300",
    leaf: "fill-sprout-400",
  },
  sun: {
    bg: "bg-gradient-to-br from-sun-50 via-white to-sun-100",
    border: "border-sun-200",
    text: "text-sun-600",
    accent: "bg-sun-400",
    dot: "fill-sun-300",
    leaf: "fill-sun-400",
  },
  berry: {
    bg: "bg-gradient-to-br from-berry-50 via-white to-berry-100",
    border: "border-berry-200",
    text: "text-berry-600",
    accent: "bg-berry-400",
    dot: "fill-berry-300",
    leaf: "fill-berry-400",
  },
  sky: {
    bg: "bg-gradient-to-br from-sky-50 via-white to-sky-100",
    border: "border-sky-200",
    text: "text-sky-600",
    accent: "bg-sky-400",
    dot: "fill-sky-300",
    leaf: "fill-sky-400",
  },
};

function LeafDecoration({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={color}
        d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"
      />
    </svg>
  );
}

function StarDecoration({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={color}
        d="M7 0l1.76 3.58L14 4.17l-3.5 3.12.83 4.4L7 9.72l-4.33 1.97.83-4.4L0 4.17l5.24-.59L7 0z"
      />
    </svg>
  );
}

export function WordCard({ word, size = "md", className, theme = "sprout" }: WordCardProps) {
  const t = themes[theme];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-3xl border-2 shadow-md",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
        "overflow-hidden",
        t.bg,
        t.border,
        size === "sm" && "w-20 h-20 text-xl",
        size === "md" && "w-32 h-32 text-3xl",
        size === "lg" && "w-48 h-48 text-5xl",
        className
      )}
    >
      {/* Top-left leaf */}
      <LeafDecoration
        className={cn(
          "absolute opacity-60",
          t.leaf,
          size === "sm" ? "-top-0.5 -left-0.5 w-4 h-4 rotate-[-30deg]"
            : size === "md" ? "-top-1 -left-1 w-6 h-6 rotate-[-30deg]"
              : "-top-1 -left-1 w-8 h-8 rotate-[-30deg]"
        )}
        color={t.leaf}
      />

      {/* Bottom-right leaf */}
      <LeafDecoration
        className={cn(
          "absolute opacity-60",
          t.leaf,
          size === "sm" ? "-bottom-0.5 -right-0.5 w-4 h-4 rotate-[150deg]"
            : size === "md" ? "-bottom-1 -right-1 w-6 h-6 rotate-[150deg]"
              : "-bottom-1 -right-1 w-8 h-8 rotate-[150deg]"
        )}
        color={t.leaf}
      />

      {/* Top-right star */}
      <StarDecoration
        className={cn(
          "absolute",
          t.dot,
          size === "sm" ? "top-1 right-1 w-2.5 h-2.5"
            : size === "md" ? "top-2 right-2 w-3.5 h-3.5"
              : "top-3 right-3 w-4 h-4"
        )}
        color={t.dot}
      />

      {/* Decorative dots bottom-left */}
      <div
        className={cn(
          "absolute bottom-2 left-2 flex gap-0.5 opacity-40",
          size === "sm" && "hidden"
        )}
      >
        <span className={cn("w-1 h-1 rounded-full", t.accent)} />
        <span className={cn("w-1 h-1 rounded-full", t.accent)} />
        <span className={cn("w-1 h-1 rounded-full", t.accent)} />
      </div>

      {/* Word text */}
      <span
        className={cn(
          "font-display font-bold tracking-wide drop-shadow-sm",
          t.text,
          "relative z-10"
        )}
      >
        {word}
      </span>
    </div>
  );
}
