'use client'

import { useState } from 'react'
import ThemeComp from './ThemeComp'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="">
      <div className="container mx-auto px-4 bg-indigo-300 dark:bg-violet-800 p-[5px]">

        <div className="flex items-center justify-between h-16">
          <div className="font-bold ">
            <div className='text-violet-800 text-5xl dark:text-indigo-100'>Tarvina Blog</div>
          </div>
          {/*Right Section*/}
          <div className="flex items-center space-x-4">
            
              <ThemeComp />

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</a>
          <a href="/blogs" className="hover:text-blue-600 transition-colors">Yazılar</a>
          <a href="/create-blog" className="hover:text-blue-600 transition-colors">Yazı Yaz</a>
        </nav>
      </div>
    </header>
  )
}