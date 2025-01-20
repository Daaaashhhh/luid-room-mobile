/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f0f0f0',
        primary: '#1d4ed8',
      },
      fontFamily: {
        'outfit-bold': ['Outfit-Bold'],
      },
    },
  },
  plugins: [require('nativewind/tailwind')],
};