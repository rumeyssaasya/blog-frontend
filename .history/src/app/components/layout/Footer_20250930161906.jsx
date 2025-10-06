"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-300 dark:bg-violet-700 ">
      <div className=" p-10 flex flex-col items-center justify-between">
        <div className="font-bold text-xl text-violet-800 just dark:text-indigo-100">
          Tarvina Blog
        </div>
        <div className="mt-4 md:mt-0 text-sm text-violet-900 dark:text-indigo-200">
          © {new Date().getFullYear()} Tarvina Blog. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
