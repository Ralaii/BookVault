import { useEffect, useState } from "react";
import useBook from "../../hooks/Book/useBook";

function Banner() {
  const [ current, setCurrent ] = useState(0);
  const { 
    banners, 
    bannerLoading, 
    bannerError, 
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

  if (bannerLoading) return <div className="flex justify-center mx-auto">Loading...</div>
  if (bannerError) return <div className="flex justify-center mx-auto">Something went wrong!</div>
  if (!banners?.length) return null

  const prev = (current - 1 + banners.length) % banners.length;
  const next = (current + 1 + banners.length) % banners.length;  

  return(
    <section className="flex items-center gap-4 w-full px-6 py-4">

      {/* LEFT BANNER */}
      <div className="hidden md:block w-full md:w-150 h-1/4 opacity-50 scale-90 cursor-pointer transition-all"
        onClick={() => setCurrent(prev)}>
        <img src={banners[prev]?.books?.cover_image} className="w-full h-64 rounded-lg object-cover" />
      </div>

      {/* CENTER BANNER */}
      <div className="w-12/12 h-1/4 transition-all relative">
        <img src={banners[current]?.books?.cover_image} className="w-full h-80 rounded-lg object-cover" />
        <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {current + 1}/{banners.length}
        </span>
      </div>

      {/* RIGHT BANNER */}
      <div className="hidden md:block w-full md:w-150 h-1/4 opacity-50 scale-90 cursor-pointer transition-all"
        onClick={() => setCurrent(next)}>
        <img src={banners[next]?.books?.cover_image} className="w-full h-64 rounded-lg object-cover" />
      </div>
    </section>
  );
}

export default Banner;