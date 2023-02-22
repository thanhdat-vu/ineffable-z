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
        "shiny-gold": "#D4AF37",
      },
      backgroundImage: {
        "hero-image": "url('/rum-smoke.jpg')",
      },
      boxShadow: {
        glass: "2px 4px 24px 0px rgba(255, 255, 255, 0.08)",
      },
    },
  },
  plugins: [],
};
