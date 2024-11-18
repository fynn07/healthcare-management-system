/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './pages/**/*.{html,js}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'], // Added Inter font here
      },
      colors: {
        // Adds a custom blue shade
        'blue_super_light': '#E1F8FD',
        'blue_main': '#054F99'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

