import Photo from "./Photo";

function PhotoGrid({ photos, favourites, onToggle }) {
  if (photos.length === 0) {
    return (
      <p className="col-span-full py-10 text-center text-slate-600">
        No photos found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2
    lg:grid-cols-4">
      {photos.map((photo) => (
        <Photo
          key={photo.id}
          photo={photo}
          isFavourite={favourites.includes(photo.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default PhotoGrid;
