import { useState } from "react";
import BrowseByTags from "../components/books/BrowseByTags";
import FeaturedBanner from "@/components/books/FeaturedBanner";
import Banner from "@/components/books/Banner";
import BookPopular from "../components/books/BookPopular";
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
      {/* <FeaturedBanner/> */}
      <div className="w-full max-w-7xl mx-auto px-4 py-2 space-y-10">
        <BookPopular/>
        <FeaturedBanner/>
        <NewReleaseCatalogue/>        
        
      </div>
      
    </>
  );
}

export default Home;