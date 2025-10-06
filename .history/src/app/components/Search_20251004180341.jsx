'use client'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchPosts, searchUsers } from '../redux/slices/searchSlice';
import { useRouter } from 'next/navigation';

export default function SearchComponent({ onResults }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (query.trim()) {
      router.push(`posts/search?q=${encodeURIComponent(query)}`);

      // Eğer onResults prop'u varsa sonuçları getir
      if (onResults) {
        try {
          const [postsAction, usersAction] = await Promise.all([
            dispatch(searchPosts({ q: query })),
            dispatch(searchUsers({ q: query })),
          ]);

          const posts = searchPosts.fulfilled.match(postsAction) ? postsAction.payload : [];
          const users = searchUsers.fulfilled.match(usersAction) ? usersAction.payload : [];

          onResults({ posts, users });
        } catch (error) {
          console.error("Arama hatası:", error);
        }
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Debounce ile otomatik arama (isteğe bağlı)
  useEffect(() => {
    if (!onResults) return;

    const delayDebounce = setTimeout(async () => {
      if (query.trim() === "") return;

      try {
        const [postsAction, usersAction] = await Promise.all([
          dispatch(searchPosts({ q: query })),
          dispatch(searchUsers({ q: query })),
        ]);

        const posts = searchPosts.fulfilled.match(postsAction) ? postsAction.payload : [];
        const users = searchUsers.fulfilled.match(usersAction) ? usersAction.payload : [];

        onResults({ posts, users });
      } catch (error) {
        console.error("Arama hatası:", error);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, dispatch, onResults]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
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
