'use client'

import { useState } from 'react'
import { useTheme } from '../theme/ThemeProvider'
import themeComp from './themeComp'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">

        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Blog
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* <SearchBar /> */}
            
              <themeComp />
              {/* {theme === 'dark' ? '🌙' : '☀️'} */}


            {/* Mobile Menu Button */}
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

         {/* <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} /> */}
      </div>
      <div>
                  {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</a>
            <a href="/blogs" className="hover:text-blue-600 transition-colors">Yazılar</a>
            <a href="/create-blog" className="hover:text-blue-600 transition-colors">Yazı Yaz</a>
          </nav>
      </div>
    </header>
  )
}