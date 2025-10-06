"use client";

import { useState,useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { systemTheme,theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const themeMode = theme === 'system' ? systemTheme : theme;
  console.log(themeMode);
  return (
    <div className="flex gap-2">
      {mounted && themeMode === 'dark' ? 
      <IoSunny size={28} onClick={() => setTheme('light')} className="cursor-pointer" /> :
      <FaMoon size={25}  onClick={() => setTheme('dark')} className="cursor-pointer" />}
      
      
    </div>
  );
}
