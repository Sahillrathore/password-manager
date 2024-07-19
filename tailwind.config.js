/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens: {
        'xs': {'min': '500px', 'max': '640px'},
        'xxs': {'min': '380px', 'max': '500px'},
        'xmin': {'min': '0px', 'max': '380px'},
      },
    },
  },
  plugins: [],
}

