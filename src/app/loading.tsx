export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="animate-pulse space-y-8">
        <div className="h-10 bg-gray-200 rounded-lg w-1/3" />
        <div className="h-6 bg-gray-200 rounded w-2/3" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
