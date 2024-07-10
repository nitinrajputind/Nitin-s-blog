/** @type {import('tailwindcss').Config} */
import Flowbite  from 'flowbite/plugin'
import tailwindScrollbar from "tailwind-scrollbar";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('flowbite/plugin'),
    Flowbite,
    tailwindScrollbar
  ],
}