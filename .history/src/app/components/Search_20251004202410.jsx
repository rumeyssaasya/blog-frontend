'use client'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchUsers } from '../redux/slices/usersSlices';
import { searchPosts } from '../redux/slices/postsSlice';
import { useRouter } from 'next/navigation';

export default function SearchComponent({ onResults }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const fetchResults = async (q) => {
    try {
      const [posts, users] = await Promise.all([
        dispatch(searchPosts({ q })).unwrap(),
        dispatch(searchUsers({ q })).unwrap()
      ]);

      if (onResults) {
        onResults({ posts, users });
        console.log(users)
      }
    } catch (error) {
      console.error("Arama hatası:", error);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    fetchResults(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  // Debounce ile otomatik arama
  useEffect(() => {
    if (!onResults) return;
    if (!query.trim()) return;

    const delayDebounce = setTimeout(() => {
      fetchResults(query);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Ara..."
        className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white w-48"
      />
      <button
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
      >
        🔍
      </button>
    </div>
  );
}
