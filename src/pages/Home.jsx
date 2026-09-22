import { useState } from "react";
import Banner from "../components/books/Banner";
import BrowseByTags from "../components/books/BrowseByTags";

function Home() {
  const [ selectedTag, setSelectedTag ] = useState([]);
  const handleSelectTag = (tagName) => {
    setSelectedTag((prev) => 
      prev.includes(tagName) ? prev.filter(t => t !== tagName) : [...prev, tagName]
    );
  }
  return (
    <>
      <Banner/>
      <BrowseByTags
        selectedTag = {selectedTag}
        onSelectTag = {handleSelectTag}
      />
    </>
  );
}

export default Home;