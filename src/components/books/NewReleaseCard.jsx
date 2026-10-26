function NewReleaseCard({book}) {
  return (
    <div className="flex flex-col gap-1 cursor-pointer group">
      <div className="aspect-3/4 w-full overflow-hidden rounded-lg">
        <img 
        src={book.cover_image} 
        alt={book.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
       />
      </div>
      <div>
        <p className="text-sm font-semibold text-white line-clamp-2">{book.title}</p>
        <p className="text-xs text-zinc-400">{book.author}</p>
      </div>
    </div>
  );
}

export default NewReleaseCard;