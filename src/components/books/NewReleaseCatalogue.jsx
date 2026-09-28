import useBook from "@/hooks/Book/useBook";
import NewReleaseCard from "./NewReleaseCard";

function NewReleaseCatalogue({}) {
  const {
    newBook,
    newBookLoading,
    newBookError
  } = useBook();
  return(
    <section className="px-6 py-4 w-full">
      <h2 className="text-xl font-bold mb-4">New Release</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        
        {newBook?.map(book => (
          <NewReleaseCard
            key={book.id}
            book={book}
          />
        ))}

      </div>
    </section>
  );
}

export default NewReleaseCatalogue;