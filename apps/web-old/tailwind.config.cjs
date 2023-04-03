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
          300: "#09090A",
          content: zinc[50],
        },
      },

      backgroundImage: {
        "logo-gradient": `linear-gradient(90deg, ${violet[200]}, ${violet[800]})`,
      },

      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
