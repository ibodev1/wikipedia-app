/** @type {import('tailwindcss').Config} */
const getPalette = require("tailwindcss-palette-generator");


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: getPalette([
        {
          name: "primary",
          color: "#134826",
        },
        {
          name: "dark",
          color: "#252525"
        }
      ])
    },
  },
  plugins: [],
}
