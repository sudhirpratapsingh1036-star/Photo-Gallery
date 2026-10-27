
const Photo = ({ photo, isFavourite, onToggle }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow hover:shadow-lg transition-shadow">
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="h-64 w-full object-cover"
      />

      <div className="flex items-center justify-between p-4">
        <p className="font-medium text-slate-800">
          {photo.author}
        </p>

        <button
          onClick={() => onToggle(photo.id)}
          aria-label={
            isFavourite
              ? "Remove from favourites"
              : "Add to favourites"
          }
          aria-pressed={isFavourite}
          className={`text-2xl ${
            isFavourite ? "text-rose-500" : "text-slate-300"
          }`}
        >
          {isFavourite ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
};

export default Photo;
