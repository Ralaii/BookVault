function BrowseByTagsSkeleton() {
  return(
    <section className="flex flex-col items-center justify-center max-w-7xl px-6 py-4 bg-red-800 rounded-xl">
      <div className="h-5 w-32 bg-zinc-700 rounded animate-pulse mb-3"/>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="h-7 w-20 bg-zinc-700 rounded-full animation-pulse"/>
        ))}
      </div>
    </section>
  );
}

export default BrowseByTagsSkeleton