export default function LearnLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-lg w-48 mb-4" />
      <div className="h-6 bg-gray-200 rounded w-64 mb-8" />
      <div className="grid sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
