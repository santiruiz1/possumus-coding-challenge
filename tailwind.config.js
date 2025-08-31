/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#F8D84A',
        text: '#2E2E31',
        bg: '#D8D8D8'
      },
      fontFamily: {
        'mulish': ['Mulish', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

