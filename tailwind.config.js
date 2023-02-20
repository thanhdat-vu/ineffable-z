const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair-display)", ...fontFamily.serif],
      },
      colors: {
        "rich-black": "#010203",
      },
    },
  },
  plugins: [],
};
