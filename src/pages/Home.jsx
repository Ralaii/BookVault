import { useState } from "react";
import Banner from "../components/books/Banner";
import BrowseByTags from "../components/books/BrowseByTags";
import BookCatalogue from "../components/books/BookCatalogue";
import NewReleaseCatalogue from "@/components/books/NewReleaseCatalogue";

function Home() {
  const [ selectedTag, setSelectedTag ] = useState([]);
  const handleSelectTag = (tagName) => {
    setSelectedTag((prev) => 
      prev.includes(tagName) ? prev.filter(t => t !== tagName) : [...prev, tagName]
    );
    // setPage(0);
  }
  return (
    <>
      <Banner/>
      <div className="max-w-7xl mx-auto px-4 py-8 w-full">
        <BrowseByTags
        selectedTag = {selectedTag}
        onSelectTag = {handleSelectTag}
        />
        <BookCatalogue
          selectedTag = {selectedTag}
        />
        <NewReleaseCatalogue/>
      </div>
      
    </>
  );
}

export default Home;