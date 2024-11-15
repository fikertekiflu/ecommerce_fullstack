/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Rubik:["Rubik Wet Paint", "system-ui"],
        Itim:["Itim", "cursive"],
        Dyna: ["DynaPuff", "system-ui"],
        Noto: ["Noto Serif", "serif"],
      },
    },
  },
  plugins: [],
}