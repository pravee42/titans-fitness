/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        // Add more custom font families here if needed
      },
      colors: {
        'custom-green': '#70AB0E',
        '70AB0E': {
          '800': '#70AB0E'
        },
        'darkblue': {
          '100': '#001215'
        }
      }, // Removed the extra comma here
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
});
