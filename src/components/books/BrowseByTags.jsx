import useBook from "../../hooks/Book/useBook";

function BrowseByTags({ selectedTag, onSelectTag }) {
  const {
    tags,
    tagsLoading,
    tagsError
  } = useBook();
  return (
    <section className="flex flex-col items-center justify-center max-w-7xl px-6 py-4 bg-red-800 rounded-xl">
      <div>
        <h2 className="flex flex-col py-2 font-semibold">Browse by Genre</h2>
      </div>
      <div className="flex gap-2">
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