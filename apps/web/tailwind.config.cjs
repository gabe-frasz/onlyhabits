const { violet, zinc } = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@c6r/**/dist/index.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: violet,
        base: {
          100: zinc[700],
          200: zinc[800],
          300: zinc[900],
          content: zinc[50],
        },
      },
    },
  },
  plugins: [],
};
