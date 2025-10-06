'use client'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchPosts } from "../redux/slices/postsSlice";

export default function SearchComponent({ onResults }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim() === "") return; // boşsa arama yapma
      const resultAction = await dispatch(searchPosts({ q: query }));
      if (searchPosts.fulfilled.match(resultAction)) {
        onResults(resultAction.payload); // parent component’e gönder
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }, [query, dispatch, onResults]);

  return (
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Ara..."
      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none"
    />
  );
}
