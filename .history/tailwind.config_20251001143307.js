
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: '#1c1c1c', 
        darktext: '#e0e0e0',
      },
    },
  },
  },
  darkMode: 'class',
  plugins: [
  ],
}
