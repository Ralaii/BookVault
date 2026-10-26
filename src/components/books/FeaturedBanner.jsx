import useBanner from "@/hooks/Book/useBanner";
import FeaturedBannerCard from "./FeaturedBannerCard";
import { useEffect, useRef } from "react";

function FeaturedBanner() {
  const { 
    banners, 
    bannerLoading, 
    bannerError, 
    active, 
    setActive 
  } = useBanner();

  const listRef = useRef(null);
  useEffect(() => {
    const list = listRef.current;
    if (!list || !banners.length || !active) return;

    const index = banners.findIndex((b) => b.id === active.id);
    const el = list.children[index];
    if (!el) return;

    list.scrollTo({
      left: el.offsetLeft - (list.clientWidth - el.clientWidth) / 2,
      behavior: "smooth",
    })
  }, [active, banners])

  if (bannerLoading) return <div>Loading...</div>
  if (bannerError) return <div>Something went wrong...</div>
  return(
    <section className="flex flex-col gap-4 w-full px-6 py-4 max-w-7xl mx-auto">
      <div className="flex mt-3">
        <h2 className="text-2xl font-bold">Staff Picks</h2>
      </div>
      {/* TOP PANEL : THE FEATURED BOOK */}
      <div className="flex gap-3 sm:gap-6 rounded-2xl border w-full border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 h-70 sm:h-70">
        <img 
          loading="lazy"
          src={active?.cover_image}
          alt={active?.title}
          className="h-60 w-30 sm:h-60 sm:w-40 shrink-0 rounded-lg object-cover"
        />

        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{active?.title}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">by {active?.author}</p>

          <div className="mt-2 sm:mt=3 flex sm:flex md:flex flex-wrap gap-2">
            {active?.tags?.map((t) => (
              <span
                key={t}
                className="rounded border border-zinc-300 bg-zinc-100 px-2 py-1 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-200"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">
            {active?.description}
          </p>
          <button
            type="button"
            className="mt-4 rounded-lg border border-zinc-300 px-4 py-2 hidden sm:flex text-sm font-medium text-zinc-900 hover:bg-zinc-100 cursor-pointer dark:border-zinc-600 dark:text-white dark:hover:bg-zinc-800"
          >
            Read Now
          </button>
        </div>
      </div>
{/* grid lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-5 gap-4 */}
      {/* BOTTOM */}
      <div
        ref={listRef} 
        className="flex gap-4 w-full overflow-x-auto no-scrollbar">
          {banners?.map(banner => (
            <FeaturedBannerCard
              key={banner.id}
              banner={banner}
              active={active?.id === banner.id}
              setActive={setActive}
            />
        ))}
      </div>
    </section>
  );
}

export default FeaturedBanner;