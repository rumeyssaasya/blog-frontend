'use client'

import { useState } from 'react'
import ThemeComp from './ThemeComp'
import { CgProfile } from "react-icons/cg";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        <nav className=" md:flex items-center justify-center gap-6 bg-indigo-200 dark:bg-violet-800 p-3 text-lg font-medium text-violet-900 dark:text-indigo-200">
          <a href="/" className="hover:text-blue-600 transition-colors">Postlar</a>
          <a href="/blogs" className="hover:text-blue-600 transition-colors">Kişiler</a>
          <a href="/create-blog" className="hover:text-blue-600 transition-colors">
            <input
              type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ara..."
        className="flex-1 px-4 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none bg-transparent">
            </input>
          </a>
        </nav>
      </div>
    </header>
  )
}