/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // South African flag colors
        'sa-green': '#007A4D',
        'sa-gold': '#FFB612',
        'sa-red': '#DE3831',
        'sa-blue': '#002395',
      },
    },
  },
  plugins: [],
}
