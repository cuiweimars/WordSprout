export default function GamesLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-lg w-64 mb-4" />
      <div className="h-6 bg-gray-200 rounded w-96 mb-8" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
