import NewReleaseCard from "./NewReleaseCard";
import { Link } from "react-router-dom";
import useNewRelease from "@/hooks/Book/useNewRelease";

function NewReleaseCatalogue({}) {
  const {
    newBook,
    newBookLoading,
    newBookError
  } = useNewRelease();

  return(
    <section className="px-6 py-4 w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">New Release</h2>
        <Link 
          className="flex items-center gap-1 from-sidebar-accent-foreground"
          to={`/new-release`}
        >
          <h2 className="text-base font-light">More</h2>
          {/* <BsArrowRight className="text-base font-light"/> */}
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        
        {newBook?.slice(0, 5).map(book => (
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