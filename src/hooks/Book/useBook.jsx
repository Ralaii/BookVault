import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBanner, fetchBook, fetchNewBook, fetchTag } from "../../services/bookService";

function useBook(page = 0, selectedTag) {

  const { data: books, isLoading: booksLoading, isError: booksError } = useQuery({
    queryKey: ['books', {page, selectedTag}],
    queryFn: () => fetchBook({ page, tags: selectedTag })
  });

  const { data: newBook, isLoading: newBookLoading, isError: newBookError } = useQuery({
    queryKey: ['newBook'],
    queryFn: () => fetchNewBook()
  });

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
    books,
    booksLoading,
    booksError,
    newBook,
    newBookLoading,
    newBookError,
    banners,
    bannerError,
    bannerLoading,
    tags,
    tagsLoading,
    tagsError
  }
}

export default useBook;