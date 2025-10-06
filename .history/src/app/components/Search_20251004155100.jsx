'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Ara..."
      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none"
    />
  );
}
