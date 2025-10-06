"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-300 dark:bg-violet-700">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="font-bold text-3xl md:text-4xl text-violet-800 dark:text-indigo-100">
          Tarvina Blog
        </div>

        {/* Kopya hakkı / Footer metni */}
        <div className="mt-4 md:mt-0 text-sm text-violet-900 dark:text-indigo-200">
          © {new Date().getFullYear()} Tarvina Blog. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
