'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ThemeComp from './ThemeComp'
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Search from '../Search';
import ProtectedPage from '../ProtectedPage';

export function Header() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const token = localStorage.getItem("token");
  const profileHref = token ? "/myprofile" : "/login";
  useEffect(() => {
    const checkToken = () => {
      if(token=="")
         href='/login'
        return href;
    };

  const links = [
    { href: "/posts", label: "Postlar" },
    { href: "/users", label: "Kişiler" },
  ];

  const headerStyle = {
    padding: '10px', 
    backgroundColor: theme === 'dark' ? '#5d0ec0' : '#7008e7', 
    transition: 'background-color 0.3s'
  };

  const navStyle = {
    margin: '0 20px', 
    borderRadius: '15px'
  };

  return (
    <header>
      <div className="w-full" style={headerStyle}>
        <div className="flex items-center justify-between h-20 px-5">
          <ThemeComp />
          <div className="font-bold text-5xl text-white">
            Tarvina Blog
          </div>
          <Link href={href}>
            <CgProfile 
              size={40} 
              className="cursor-pointer text-white hover:opacity-80 transition-opacity" 
            />
          </Link>
        </div>
      </div>
      <ProtectedPage>
        <div style={navStyle}>
          <nav className="flex justify-center items-center gap-6 bg-indigo-100 dark:bg-violet-800 p-3 text-lg font-medium text-violet-900 dark:text-white rounded-b-2xl transition-colors"
          style={{padding:'3px 10px'}}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{padding:'3px 5px'}}
                className={` rounded-full transition-colors ${
                  pathname === link.href
                    ? "bg-indigo-200 dark:bg-violet-500 text-violet-900 dark:text-white"
                    : "hover:text-blue-600 dark:hover:text-blue-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Search />
          </nav>
        </div>
      </ProtectedPage>
    </header>
  );
}

export default Header;