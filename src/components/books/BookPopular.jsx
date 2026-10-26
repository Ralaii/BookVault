import { useState } from "react";
import useBook from "../../hooks/Book/useBook";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";
import BannerCatalogueSkeleton from "../skeletons/BannerCatalogueSkeleton";
import { BsArrowLeftSquareFill, BsArrowRight } from "react-icons/bs";

function BookPopular() {
  const {
    books,
    booksLoading,
    booksError
  } = useBook()
  if (booksLoading) return <BannerCatalogueSkeleton/>
  if (booksError) return <div>Something went wrong...</div>

  return(
    <section className="px-6 py-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Popular Books</h2>
        <Link 
          className="flex items-center gap-1 from-sidebar-accent-foreground"
          to={`/ranking`}
        >
          <h2 className="text-base font-light">More</h2>
          {/* <BsArrowRight className="text-base font-light"/> */}
        </Link>
      </div>
      <div className="overflow-x-auto snap-x snap-mandatory sm:overflow-visible no-scrollbar">
        <div className="flex w-max gap-4 sm:grid sm:w-full sm:grid-cols-2">
          {/* LEFT SECTION OF BOOK */}
          <div className="flex flex-col shrink-0 snap-start gap-4">
            {books?.slice(0, 3).map(book => (
              <Link 
                key={book.id}
                to={`/novel/${book.id}`}
              >
                <BookCard 
                  key={book.id} 
                  book={book}/>
              </Link>
            ))}
          </div>
          
          {/* RIGHT SECTION OF BOOK */}
          <div className="flex flex-col shrink-0 snap-start gap-4">
            {books?.slice(3, 6).map(book => (
              <Link 
                key={book.id}
                to={`/novel/${book.id}`}
              >
                <BookCard key={book.id} book={book}/>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookPopular;