'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import ThemeComp from './ThemeComp'
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function Header() {
  const pathname = usePathname(); // Şu anki sayfanın yolu
  const [query, setQuery] = useState("");
  const theme= useTheme().theme;

  const links = [
    { href: "/posts", label: "Postlar" },
    { href: "/users", label: "Kişiler" },
  ];

  return (
    <header>
      <div className=" w-full" style={{padding:'10px', backgroundColor: theme === 'dark' ? '#5d0ec0' : '#7008e7', transition:'background-color 0.3s'}}>
        <div className="flex items-center justify-between h-20" style={{padding:'0 20px'}}>
          <ThemeComp />
          <div className="font-bold text-5xl text-white">
            Tarvina Blog
          </div>
          <CgProfile size={40} className=" dark:text-indigo-100"/>
        </div>
      </div>

      <div className='w-fit' style={{margin:'0 20px',borderRadius:'15px'}}>
        <nav className="flex justify-center w-fit gap-6 bg-indigo-100 dark:bg-violet-800 p-3 text-lg font-medium text-violet-900 dark:text-white"
        style={{borderRadius:'0 0 20px 20px', transition:'background-color 0.3s',padding:'0 20px'}}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1 rounded transition-colors ${
              pathname === link.href
                ? "bg-indigo-200 dark:bg-violet-500 text-violet-900 dark:text-white"
                : "hover:text-blue-600"
            }`}
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
      </div>
      
    </header>
  )
}
export default Header;