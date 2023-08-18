/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'lg': { 'max': '768px' },
      'md': { 'max': '425px' },
      'sm': { 'max': '375px' },
      'xsm': { 'max': '320px' },
    },
  },
  plugins: [],
}
