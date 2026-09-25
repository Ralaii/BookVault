function BannerSkeleton() {
  return (
    <section className="flex items-center gap-4 w-full px-6 py-4">
      
      {/* LEFT */}
      <div className="flex-1 opacity-50 scale-90">
        <div className="w-full h-64 rounded-lg bg-zinc-700 animate-pulse" />
      </div>

      {/* CENTER */}
      <div className="flex-2">
        <div className="w-full h-80 rounded-lg bg-zinc-700 animate-pulse" />
      </div>

      {/* RIGHT */}
      <div className="flex-1 opacity-50 scale-90">
        <div className="w-full h-64 rounded-lg bg-zinc-700 animate-pulse" />
      </div>

    </section>
  );
}

export default BannerSkeleton;