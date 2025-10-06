'use client'

import { useState } from 'react'
import ThemeComp from './ThemeComp'
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';

export function Header() {
  const [active, setActive] = useState("/"); // hangi link aktif
  const [query, setQuery] = useState("");

  const links = [
    { href: "/", label: "Postlar" },
    { href: "/blogs", label: "Kişiler" },
  ];

  return (
    <header>
      <div className="container bg-indigo-300 dark:bg-violet-700 p-4">
        <div className="flex items-center justify-between h-20">
          <ThemeComp />
          <div className="font-bold text-5xl text-violet-800 dark:text-indigo-100">
            Tarvina Blog
          </div>
          <CgProfile size={40} className="text-violet-800 dark:text-indigo-100"/>
        </div>
      </div>

        <nav className="flex items-center justify-center gap-4 bg-indigo-100 dark:bg-violet-800 p-3 text-lg font-medium text-violet-900 dark:text-white">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded transition-colors ${
                active === link.href
                  ? "bg-indigo-200 dark:bg-violet-500 text-violet-900 dark:text-white" // aktif link için açık ton
                  : "hover:text-blue-600"
              }`}
              onClick={() => setActive(link.href)}
            >
              {link.label}
            </Link>
          ))}
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Ara..."
            className="ml-4 px-4 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none bg-transparent border rounded"
          />
        </nav>
    </header>
  )
}
