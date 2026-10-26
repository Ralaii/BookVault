function FeaturedBannerCard({ banner, active, setActive }) {
  return (
    <button
      type="button"
      onClick={() => setActive(banner)}
      aria-pressed={active}
      className={`shrink-0 w-20 sm:w-24 md:w-28 lg:w-[calc((100%_-_9rem)/10)] overflow-hidden rounded-lg border cursor-pointer ${
        active ? "border-red-500 opacity-100" : "border-transparent dark:opacity-50"
      }`}
    >
      <img
        loading="lazy"
        src={banner.cover_image}
        alt={banner.title}
        className="w-full object-cover"
      />
    </button>
  );
}

export default FeaturedBannerCard;