import { useQuery } from "@tanstack/react-query";
import { fetchNewBook } from "../../services/bookService";

function useNewRelease() {
  const { data: newBook, isLoading: newBookLoading, isError: newBookError } = useQuery({
    queryKey: ['newBook', {page }],
    queryFn: () => fetchNewBook({ page})
  });
  
  return {
    newBook,
    newBookLoading,
    newBookError
  }
}