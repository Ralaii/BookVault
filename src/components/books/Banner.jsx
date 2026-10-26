import useBanner from "@/hooks/Book/useBanner";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Banner() {
  const [current, setCurrent] = useState(0);
  const { banners } = useBanner();

  useEffect(() => {
    setCurrent(0);
  }, [banners]);

  useEffect(() => {
    if (!banners?.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [current, banners]);

  if (!banners?.length) return null;

  const prev = (current - 1 + banners.length) % banners.length;
  const next = (current + 1) % banners.length;

  return (
    <section 
      className="flex items-center justify-center mt-5 gap-5 w-full overflow-x-clip py-4"
    >
      {/* LEFT (cut off by the screen edge) */}
      <button
        type="button"
        onClick={() => setCurrent(prev)}
        className="shrink-0 w-[85%] md:w-[40%] aspect-[17/10] scale-95 opacity-50 overflow-hidden rounded-xl cursor-pointer hidden sm:flex"
      >
        <img
          src={banners[prev]?.cover_image}
          alt={banners[prev]?.title}
          className="h-full w-full object-cover"
        />
      </button>

      {/* CENTER (active) */}
      <div className="relative shrink-0 w-[85%] md:w-[40%] aspect-[17/10] overflow-hidden rounded-xl">
        <Link
          to={`/novel/${banners[current]?.id}`}
        >
          <img
            src={banners[current]?.cover_image}
            alt={banners[current]?.title}
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-sm text-white/60">
            <span className="font-bold text-white">{current + 1}</span>/{banners.length}
          </span>
        </Link>
      </div>

      {/* RIGHT (cut off by the screen edge) */}
      <button
        type="button"
        onClick={() => setCurrent(next)}
        className="shrink-0 w-[85%] md:w-[40%] aspect-[17/10] scale-95 opacity-50 overflow-hidden rounded-xl cursor-pointer hidden sm:flex"
      >
        <img
          src={banners[next]?.cover_image}
          alt={banners[next]?.title}
          className="h-full w-full object-cover"
        />
      </button>
    </section>
  );
}

export default Banner;