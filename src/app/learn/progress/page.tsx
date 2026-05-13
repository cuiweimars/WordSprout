import { Suspense } from "react";
import ProgressContent from "./progress-content";

export default function ProgressPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-gray-100 rounded" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ProgressContent />
    </Suspense>
  );
}
