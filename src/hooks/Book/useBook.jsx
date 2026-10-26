import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPopularBook } from "../../services/bookService";

function useBook() {

  const { data: books, isLoading: booksLoading, isError: booksError } = useQuery({
    queryKey: ['books'],
    queryFn: () => fetchPopularBook()
  });

  const queryClient = useQueryClient();

  return {
    books,
    booksLoading,
    booksError
  }
}

export default useBook;