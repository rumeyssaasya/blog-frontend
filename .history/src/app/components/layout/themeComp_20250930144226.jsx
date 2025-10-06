"use client";

import { useTheme } from 'next-themes';
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <FaMoon  onClick={() => setTheme('dark')} className="cursor-pointer" />
      <IoSunny size={28} onClick={() => setTheme('light')} className="cursor-pointer" />
    </div>
  );
}
