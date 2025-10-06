'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPosts } from "../redux/slices/postsSlice";

export default function SearchComponent({ onResults }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(searchPosts({ q: query }));
    if (searchPosts.fulfilled.match(resultAction)) {
      onResults(resultAction.payload); // parent component’e gönder
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Ara..."
        className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Ara
      </button>
    </form>
  );
}
