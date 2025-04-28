/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
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
        },
      },
    },
  },
  plugins: [],
};
