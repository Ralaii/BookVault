import useBook from "../../hooks/Book/useBook";
import BrowseByTagsSkeleton from "../skeletons/BrowseByTagsSkeleton";

function BrowseByTags({ selectedTag, onSelectTag }) {
  const {
    tags,
    tagsLoading,
    tagsError
  } = useBook();
  if (tagsLoading) return <BrowseByTagsSkeleton/>
  if (tagsError) return <div 
      className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
    >
      Something went wrong! Please try again later
    </div>
  return (
    <section className="w-full max-w-7xl rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-700 dark:bg-zinc-800/50">
        <h2 className="mb-3 font-semibold text-zinc-900 dark:text-white">Browse by Genre</h2>
      <div className="flex flex-wrap gap-2 py-2 w-full max-w-5xl">
        {tags?.map((tag) => (
          <button 
            key={tag.id}
            type="button"
            onClick={() => onSelectTag(tag.name)} 
            className={`rounded-full border px-4 py-1 text-sm cursor-pointer transition-colors ${
                selectedTag.includes(tag.name)
                ? "border-red-500 bg-red-500 text-white"
                : "border-zinc-300 bg-white text-zinc-700 hover:border-red-500 hover:text-red-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-red-400 dark:hover:text-red-400"
            }`}
          >
            {tag.name}
        </button>   
        ))}  
      </div>
    </section>
  );
}

export default BrowseByTags;