import { useQuery } from "@tanstack/react-query";
import { fetchTag } from "../../services/bookService"

function useTags() {
  const { data: tags, isLoading: tagsLoading, isError: tagsError } = useQuery({
    queryKey: ['tags'],
    queryFn: () => fetchTag()
  })


  return {
    tags,
    tagsLoading,
    tagsError
  }
}

export default useTags;