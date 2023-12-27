/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ["Urbanist", "serif"],
    },

    extend: {
      colors: {
        lightWhite: "#ffffff",
        darkWhite: "#f3f3fa",
        lightBlue: "#6EC2C4",
        darkBlue: "#3D526F",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
