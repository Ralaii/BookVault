import { fetchBookPage } from "@/services/bookService";
import { useQuery } from "@tanstack/react-query";

function useBookById() {
  const { data: page, isLoading: pageLoading, isError: pageError } = useQuery({
    queryKey: ['bookPage'],
    queryFn: () => fetchBookPage()
  });

  return {
    page,
    pageLoading,
    pageError
  }
}

export default useBookById;