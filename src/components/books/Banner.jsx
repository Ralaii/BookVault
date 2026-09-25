import { useEffect, useState } from "react";
import useBook from "../../hooks/Book/useBook";
import BannerSkeleton from "../skeletons/BannerSkeleton";

function Banner() {
  const [ current, setCurrent ] = useState(0);
  const { 
    banners, 
    bannerLoading, 
    bannerError 
  } =  useBook();

  useEffect(() => {
    setCurrent(0);
  }, [banners])

  useEffect(() => {
    if (!banners?.length) return

    const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners])

  if (bannerLoading) return <BannerSkeleton/>
  if (bannerError) return <div className="flex justify-center mx-auto">Something went wrong!</div>
  if (!banners?.length) return null

  const prev = (current - 1 + banners.length) % banners.length;
  const next = (current + 1 + banners.length) % banners.length;  

  return(
    <section className="flex items-center gap-4 w-full px-6 py-4">

      {/* LEFT BANNER */}
      <div className="flex-1 opacity-50 scale-90 cursor-pointer transition-all duration-300"
        onClick={() => setCurrent(prev)}
      >
        <img src={banners[prev]?.books?.cover_image} 
          className="w-full h-64 rounded-lg object-cover"
          loading="lazy"
        />
      </div>

      {/* CENTER BANNER */}
      <div className="group flex-2 transition-all cursor-pointer relative duration-300">
        <img src={banners[current]?.books?.cover_image} 
          className="w-full h-80 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {current + 1}/{banners.length}
        </span>
      </div>

      {/* RIGHT BANNER */}
      <div className="flex-1 opacity-50 scale-90 cursor-pointer transition-all duration-300"
        onClick={() => setCurrent(next)}>
        <img src={banners[next]?.books?.cover_image} 
          className="w-full h-64 rounded-lg object-cover" 
          loading="lazy"
          width={500} 
          height={320}
        />
      </div>
    </section>
  );
}

export default Banner;