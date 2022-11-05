/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#1A1A24",
        "bg-secondary": "#2A2A34",
        primary: "#37CD46",
      },
    },
  },
  plugins: [],
};
