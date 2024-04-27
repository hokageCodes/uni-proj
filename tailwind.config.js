/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#331D2C',  // Dark shade for dark mode background
        'dark-secondary': '#3F2E3E', // Secondary dark shade, for card backgrounds, etc.
        'light-primary': '#A78295',  // Light shade for light mode background
        'light-secondary': '#EFE1D1', // Secondary light shade, for card backgrounds, etc.
      }
    }
  },
  plugins: [],
};
