import { useQuery } from "@tanstack/react-query";
import { fetchBanner } from "../../services/bookService";
import { useEffect, useState } from "react";

function useBanner() {
  const [ selected, setSelected ] = useState(null);
  const { data: banners, isLoading: bannerLoading, isError: bannerError } = useQuery({ 
    queryKey: ['banners'],
    queryFn: () => fetchBanner()
  });

  const active = selected ?? banners?.[0] ?? null;
  const activeIndex = Math.max(0, banners?.findIndex((b) => b.id === active?.id) ?? 0)

  useEffect(() => {
    if (!banners?.length) return

    const interval = setInterval(() => {
      setSelected(banners[(activeIndex + 1) % banners.length])
    }, 5000)

  return () => clearInterval(interval);
  }, [banners, activeIndex])

  return { 
    banners, 
    bannerLoading, 
    bannerError,
    active,
    setActive : setSelected
  };
}

export default useBanner;