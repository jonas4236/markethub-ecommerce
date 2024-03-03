/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./components/**/*.{html,js,jsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    fontFamily: {
      lobs: ["Lobster", "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
};
