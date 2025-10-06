'use client'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchPosts } from "../redux/slices/postsSlice";

// Basit debounce fonksiyonu
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function SearchComponent({ onResults }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  // Aramayı çalıştıracak fonksiyon
  const performSearch = async (q) => {
    if (!q) return onResults([]); // boşsa sonuçları temizle
    const resultAction = await dispatch(searchPosts({ q }));
    if (searchPosts.fulfilled.match(resultAction)) {
      onResults(resultAction.payload);
    }
  };

  // Debounce ile performans iyileştirme
  const debouncedSearch = debounce(performSearch, 500); // 500ms gecikme

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value); // yazarken arama
  };

  return (
    <div className="flex gap-2 w-fit">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Ara (title, content veya yazar)..."
        className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none w-full"
      />
    </div>
  );
}
