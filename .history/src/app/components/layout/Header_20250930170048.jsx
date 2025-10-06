'use client'

import { useState } from 'react'
import ThemeComp from './ThemeComp'
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';

export function Header() {
  const [active, setActive] = useState("/"); // hangi link aktif

  const links = [
    { href: "/", label: "Postlar" },
    { href: "/blogs", label: "Kişiler" },
  ];

  const [query, setQuery] = useState("");

  return (
    <header>
      <div className="container  bg-indigo-300 dark:bg-violet-700 p-4">

        <div className="flex items-center justify-between h-20 ">
          <div className="flex items-center">
              <ThemeComp />
          </div>
          <div className="font-bold ">
            <div className='text-violet-800 text-5xl dark:text-indigo-100'>Tarvina Blog</div>
          </div>
          <div>
            <CgProfile size={40} className="mr-4 text-violet-800 dark:text-indigo-100"/>
          </div>

        </div>
      </div>
      <div>
        <nav className="flex items-center justify-center gap-6 bg-indigo-100 dark:bg-violet-800 p-3 text-lg font-medium text-violet-900 dark:text-white">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <button
                onClick={() => setActive(link.href)}
                className={`px-3 py-1 rounded transition-colors ${
                  active === link.href
                    ? "bg-indigo-300 dark:bg-violet-900 text-white"
                    : "hover:text-blue-600"
                }`}
              >
                {link.label}
              </button>
            </Link>
          ))}
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Ara..."
            className="ml-4 flex-1 px-4 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none bg-transparent border rounded"
          />
        </nav>
      </div>
    </header>
  )
}