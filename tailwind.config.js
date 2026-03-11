/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // important pour le mode sombre basé sur classe
  content: [
    './app/**/*.{js,ts,jsx,tsx}',       // App Router
    './components/**/*.{js,ts,jsx,tsx}' // Tous tes composants
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};