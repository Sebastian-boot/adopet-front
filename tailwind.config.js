/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: "#5B53D1",
      },
    },
  },
  plugins: [],
};
