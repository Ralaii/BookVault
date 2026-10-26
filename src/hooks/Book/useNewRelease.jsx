import { useQuery } from "@tanstack/react-query";
import { fetchNewBook } from "../../services/bookService";

function useNewRelease() {
  const { data: newBook, isLoading: newBookLoading, isError: newBookError } = useQuery({
    queryKey: ['newBook'],
    queryFn: () => fetchNewBook()
  });
  
  return {
    newBook,
    newBookLoading,
    newBookError
  }
}

export default useNewRelease;