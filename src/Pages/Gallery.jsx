import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import PhotoGrid from "../Components/PhotoGrid";
import UseFetch from "../Hooks/UseFetch";

function getInitialFavourites() {
  try {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}


function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id];

    default:
      return state;
  }
}

function Gallery() {
  const { photos, loading, error } = UseFetch();

  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    getInitialFavourites
  );

  
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  
  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  
  const handleToggleFavourite = (id) => {
    dispatch({ type: "TOGGLE", id });
  };

  return (
    <div className="min-h-screen bg-[#f3f7f5]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-[#173b35]">
            Explore Photos
          </h2>

          <p className="mb-5 text-slate-600">
            Browse photos and save your favourites.
          </p>

          <Search
            search={search}
            onSearch={handleSearch}
          />

          <p className="mt-3 text-sm text-slate-600">
            {favourites.length} favourite(s)
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div
              className="h-10 w-10 animate-spin rounded-full
              border-4 border-emerald-100 border-t-[#16836f]"
              role="status"
              aria-label="Loading photos"
            />
          </div>
        ) : error ? (
          <p className="py-10 text-center text-rose-600">
            {error}
          </p>
        ) : (
          <PhotoGrid
            photos={filteredPhotos}
            favourites={favourites}
            onToggle={handleToggleFavourite}
          />
        )}
      </main>
    </div>
  );
}

export default Gallery;
