function BrowseByTagsSkeleton() {
  return(
    <section className="w-full max-w-7xl rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-700 dark:bg-zinc-800/50">
      <div className="h-5 w-32 bg-zinc-700 rounded animate-pulse mb-3"/>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-7 w-20 bg-zinc-700 rounded-full animation-pulse"/>
        ))}
      </div>
    </section>
  );
}

export default BrowseByTagsSkeleton