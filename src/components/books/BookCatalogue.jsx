import { useState } from "react";
import useBook from "../../hooks/Book/useBook";
import BookPagination from "../general/BookPagination";
import BookCard from "./BookCard";

function BookCatalogue() {
  const [ page, setPage ] = useState(0)
  const {
    books,
    booksLoading,
    booksError
  } = useBook(page)
  if (booksLoading) return <div>Loading...</div>
  if (booksError) return <div>Something went wrong...</div>

  const half = Math.ceil(books?.books?.length / 2)
  return(
    <section className="px-6 py-4">
      <h2 className="text-xl font-bold mb-4">Browse</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* LEFT SECTION OF BOOK */}
        <div className="flex flex-col gap-4">
          {books?.books?.slice(0, half).map(book => (
            <BookCard key={book.id} book={book}/>
          ))}
        </div>
        
        {/* RIGHT SECTION OF BOOK */}
        <div className="flex flex-col gap-4">
          {books?.books?.slice(half).map(book => (
            <BookCard key={book.id} book={book}/>
          ))}
        </div>
      </div>
      <BookPagination 
        page={page} 
        setPage={setPage} 
        totalPages={books?.totalPages}
        className=""
      />
    </section>
  );
}

export default BookCatalogue;