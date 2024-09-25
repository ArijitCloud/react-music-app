import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Background Colors
        "card-bg": "#1a202c",
        "card-hover-bg": "#2a3345",
        "tooltip-bg": "#2d3748",
        "gray-bg": "#121212",
        // Text Colors
        "secondary-text": "#a0aec0",
        //Border Colors
        "secondary-border": "#303030",

        "light-gray": "#E5E7EB",
        "off-white": "#f9fafb",
        "very-light-gray": "#f5f5f5",
        "dark-gray": "#4a5568",
      },
      inset: {
        '45': '12rem',
      },
    },
  },
  plugins: [],
};
