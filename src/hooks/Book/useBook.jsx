import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBanner, fetchTag } from "../../services/bookService";

function useBook() {

  const { data: banners, isLoading: bannerLoading, isError: bannerError } = useQuery({ 
    queryKey: ['banners'],
    queryFn: () => fetchBanner()
  });

  const { data: tags, isLoading: tagsLoading, isError: tagsError } = useQuery({
    queryKey: ['tags'],
    queryFn: () => fetchTag()
  })

  const queryClient = useQueryClient();

  return {
    banners,
    bannerError,
    bannerLoading,
    tags,
    tagsLoading,
    tagsError
  }
}

export default useBook;