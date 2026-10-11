import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBook, fetchNewBook } from "../../services/bookService";

function useBook(page = 0, selectedTag) {

  const { data: books, isLoading: booksLoading, isError: booksError } = useQuery({
    queryKey: ['books', {page, selectedTag}],
    queryFn: () => fetchBook({ page, tags: selectedTag })
  });

  const queryClient = useQueryClient();

  return {
    books,
    booksLoading,
    booksError
  }
}

export default useBook;