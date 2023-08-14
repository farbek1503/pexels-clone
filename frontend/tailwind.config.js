/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'la': ['Lato', 'sans-serif'],
      'po': ['Poppins', 'sans-serif'],
    },
    fontWeight: {
      regular: 400,
      bold: 700
    }
  },
  plugins: [],
}
