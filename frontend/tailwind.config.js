// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        'primary': '#4f46e5', // A strong indigo for buttons and highlights
        'primary-hover': '#4338ca',
        'secondary': '#1f2937', // A dark charcoal for text
        'accent': '#f59e0b',    // A warm amber for accents
        'light-bg': '#f8f7f3',   // An off-white, paper-like background
        'dark-bg': '#111827',    // A deep, near-black for dark mode
        'dark-card': '#1f2937',  // A slightly lighter card background for dark mode
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}