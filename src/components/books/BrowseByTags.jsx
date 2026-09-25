import useBook from "../../hooks/Book/useBook";
import BrowseByTagsSkeleton from "../skeletons/BrowseByTagsSkeleton";

function BrowseByTags({ selectedTag, onSelectTag }) {
  const {
    tags,
    tagsLoading,
    tagsError
  } = useBook();
  if (tagsLoading) return <BrowseByTagsSkeleton/>
  if (tagsError) return <div>Something went wrong! Please try again later</div>
  return (
    <section className="flex flex-col items-center justify-center max-w-7xl px-6 py-4 bg-red-800 rounded-xl">
      <div>
        <h2 className="flex flex-col mb-2 font-semibold">Browse by Genre</h2>
      </div>
      <div className="flex flex-wrap gap-2 py-2 w-full max-w-xl">
        {tags?.map((tag) => (
          <button 
            key={tag.id}
            type="button"
            onClick={() => onSelectTag(tag.name)} 
            className={selectedTag.includes(tag.name) ? 'bg-black rounded-xl text px-4 py-1 cursor-pointer' : 'bg-slate-400 rounded-xl text px-4 py-1 cursor-pointer'}
          >
            {tag.name}
        </button>   
        ))}  
      </div>
    </section>
  );
}

export default BrowseByTags;