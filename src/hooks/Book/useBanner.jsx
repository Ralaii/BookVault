import { useQuery } from "@tanstack/react-query";
import { fetchBanner } from "../../services/bookService";

function useBanner() {
  const { data: banners, isLoading: bannerLoading, isError: bannerError } = useQuery({ 
    queryKey: ['banners'],
    queryFn: () => fetchBanner()
  });

  return { 
    banners, 
    bannerLoading, 
    bannerError };
}

export default useBanner;