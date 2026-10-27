import React from 'react'

 const Search = ({ search, onSearch }) => {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search photos by author..."
      aria-label="Search photos by author"
      className="w-full rounded-lg border border-emerald-200
      px-4 py-3 outline-none focus:border-[#16836f]"
    />
  )
}
export default Search;