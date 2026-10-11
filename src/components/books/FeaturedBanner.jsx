import useBanner from "@/hooks/Book/useBanner";
import { Tag } from "@hugeicons/core-free-icons";

function FeaturedBanner() {
  const {
    banners,
    bannerLoading,
    bannerError
  } = useBanner();
  return(
    <section className="space-y-4">
      {/* TOP PANEL : THE FEATURED BOOK */}
      <div className="flex gap-6 rounded-2xl border border-zinc-200 bg-zinc-400 p-5 dark:border-zinc-700 dark:bg-zinc-900">
        <img 
          loading="lazy"
          src={banners?.cover_image}
          alt={banners?.title}
          className="h-60 w-40 shrink-0 rounded-lg object-cover"
        />

        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white">{banners?.title}</h2>
          <p className="text-sm text-zinc-400">by {banners?.title}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {banners?.title.map((t) => {
              <span
                key={banners?.title}
                className="rounded border border-zinc-200 px-2 py-0.5 text-xs text-zinc-200"
              >
                {t}
              </span>
            })}
          </div>
          <p className="mt-3 line-clamp-3 text-sm text-zinc-300">
            {banners?.description}
          </p>
          <button
            type="button"
            className="mt-4 rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium text-white hover:zinc-800"
          >
            Read Now
          </button>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex gap-3 overflow-x-auto">
        {banners.map((item, i) => {
          <img
            loading="lazy"
            key={item.id}
            src={banners?.cover_image}
            alt={item.title}
            className={`h-44 w-28 shrink-0 rounded-lg object-cover ${
              i === selected ? "border-2 border-red-500" : "opacity-60"
            }`}
          />
        })}
      </div>
    </section>
  );
}

export default FeaturedBanner;