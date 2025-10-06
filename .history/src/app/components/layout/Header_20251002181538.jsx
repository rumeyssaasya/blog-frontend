'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ThemeComp from './ThemeComp'
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function Header() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const theme = useTheme().theme;

  useEffect(() => {
    const checkToken = () => setHasToken(!!localStorage.getItem("token"));
  
    checkToken(); // ilk mountta kontrol

    const handleStorage = () => checkToken();
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, [pathname]); 

  const links = [
    { href: "/posts", label: "Postlar" },
    { href: "/users", label: "Kişiler" },
  ];

  return (
    <header>
      <div className="w-full" style={{padding:'10px', backgroundColor: theme === 'dark' ? '#5d0ec0' : '#7008e7', transition:'background-color 0.3s'}}>
        <div className="flex items-center justify-between h-20" style={{padding:'0 20px'}}>
          <ThemeComp />
          <div className="font-bold text-5xl text-white">
            Tarvina Blog
          </div>
          {hasToken && (
            <Link href="/myprofile">
              <CgProfile 
                size={40} 
                className="cursor-pointer dark:text-indigo-100" 
              />
            </Link>
          )}
          {!hasToken && (
            <Link href="/login">
              <CgProfile 
                size={40} 
                className="cursor-pointer dark:text-indigo-100" 
              />
            </Link>
          )}
        </div>
      </div>

      {/* Alt nav her zaman gözükür */}
      {hasToken && (
      <div style={{margin:'0 20px', borderRadius:'15px'}}>
        <nav className="flex justify-center gap-6 bg-indigo-100 dark:bg-violet-800 p-3 text-lg font-medium text-violet-900 dark:text-white"
          style={{borderRadius:'0 0 20px 20px', transition:'background-color 0.3s', padding:'5px 20px'}}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded transition-colors ${
                pathname === link.href
                  ? "bg-indigo-200 dark:bg-violet-500 text-violet-900 dark:text-white"
                  : "hover:text-blue-600"
              }`}
              style={{padding:'3px 10px', borderRadius:'20px', transition:'background-color 0.3s, color 0.3s'}}
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
      )}
    </header>
  )
}

export default Header;
