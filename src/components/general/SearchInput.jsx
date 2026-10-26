function SearchInput({ className = "" }) {
  return (
    <input
      type="search"
      placeholder="Search..."
      className={`bg-white text-zinc-900 placeholder:text-zinc-500
        border border-zinc-300 rounded-lg px-3 py-2.5
        focus:outline-none focus:ring-2 focus:ring-red-500
        dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-400
        dark:border-zinc-700 ${className}`}
    />
  );
}

export default SearchInput;