/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#...', // Define your semantic colors here
        text: '#...',
        muted: '#...',
        surface: '#...',
        disabled: '#...',
        background: '#...',
        border: '#...',
      }
    },
  },
  plugins: [],
} 