import useBookById from "@/hooks/Book/useBookById";
import { useParams } from "react-router-dom";

function BookDetailPage() {
  const { id } = useParams();
  const { book, bookLoading, bookError } = useBookById(id);
  if (bookLoading) return <div className="px-6 py-4">Loading...</div>
  if (bookError) return <div className="px-6 py-4">Something went wrong...</div>
  return (
    <section className="mx-auto max-w-4xl px-6 py-6">
      
    </section>
  );
}

export default BookDetailPage;