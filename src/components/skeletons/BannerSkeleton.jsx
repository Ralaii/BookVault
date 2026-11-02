import { Skeleton } from "@/components/ui/skeleton";

function BannerSkeleton() {
  return (
    <section className="flex items-center justify-center mt-5 gap-5 w-full overflow-x-clip py-4">
      {/* LEFT */}
      <Skeleton className="shrink-0 w-[85%] md:w-[40%] aspect-[17/10] scale-95 opacity-50 rounded-xl hidden sm:block" />

      {/* CENTER */}
      <Skeleton className="shrink-0 w-[85%] md:w-[40%] aspect-[17/10] rounded-xl" />

      {/* RIGHT */}
      <Skeleton className="shrink-0 w-[85%] md:w-[40%] aspect-[17/10] scale-95 opacity-50 rounded-xl hidden sm:block" />
    </section>
  );
}

export default BannerSkeleton;