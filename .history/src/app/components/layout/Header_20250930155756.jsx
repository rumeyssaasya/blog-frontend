'use client'

import { useState } from 'react'
import ThemeComp from './ThemeComp'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="mt-[]">
      <div className="container mx-auto  bg-indigo-300 dark:bg-violet-800 ">

        <div className="flex items-center  h-20 p-10">
          <div className="flex items-center space-x-4">
              <ThemeComp />
          </div>
          <div className="font-bold ">
            <div className='text-violet-800 text-5xl dark:text-indigo-100'>Tarvina Blog</div>
          </div>
          {/*Right Section*/}

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