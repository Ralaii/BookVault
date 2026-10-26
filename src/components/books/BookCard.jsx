function BookCard({book}) {
  return (
    <div className="flex gap-3 cursor-pointer group">
      <div className="aspect-[3/4] w-30 shrink-0 overflow-hidden rounded-lg">
        <img 
          src={book?.cover_image} 
          alt={book?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <div>
        <p>{book?.title}</p>
        {book.tags?.map((tag, index) => (
          <span 
            className="text-sm text-zinc-400" 
            key={tag}
          >
            {index > 0 && <span> • </span>}{tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default BookCard;