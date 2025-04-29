/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#1F1D2B",
          soft: "#252836",
          blueAccent: "#12CDD9",
        },
        secondary: {
          red: "#FF7256",
        },
        text: {
          grey: "#92929D",
          darkGrey: "#696974",
          whiteGrey: "#F1F1F5",
        },
      },
    },
  },
  plugins: [],
};
