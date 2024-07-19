/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },

    extend: {
      colors: {
        primary: "#8739f9",
        secondary: "#37B9F1",
        white_bg: "#F2F5F5",
      },
    },
  },
  plugins: [],
};
