import { Skeleton } from "@/components/ui/skeleton";

function FeaturedBannerSkeleton() {
  return (
    <section className="flex flex-col gap-4 w-full px-6 py-4 max-w-7xl mx-auto">
      <div className="flex mt-3">
        <h2 className="text-2xl font-bold">Staff Picks</h2>
      </div>

      {/* TOP PANEL */}
      <div className="flex gap-3 sm:gap-6 rounded-2xl border w-full border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 h-70 sm:h-70">
        <Skeleton className="h-60 w-30 sm:h-60 sm:w-40 shrink-0 rounded-lg" />

        <div className="min-w-0 flex-1">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="mt-2 h-4 w-1/3" />

          <div className="mt-3 flex flex-wrap gap-2">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-7 w-14" />
          </div>

          <div className="mt-3 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>

          <Skeleton className="mt-4 hidden sm:block h-10 w-28 rounded-lg" />
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex gap-4 w-full overflow-x-auto no-scrollbar">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-60 w-20 sm:wd-24 lg:w-[calc((100% - 9rem/10))] shrink-0 rounded-lg" />
        ))}
      </div>
    </section>
  );
}

export default FeaturedBannerSkeleton;