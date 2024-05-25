/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // https://uicolors.app/create
        primary: {
          50: '#eff5ff',
          100: '#dbe8fe',
          200: '#bfd7fe',
          300: '#93bbfd',
          400: '#609afa',
          500: '#3b82f6',
          600: '#2570eb',
          700: '#1d64d8',
          800: '#1e55af',
          900: '#1e478a',
          950: '#172e54',
          DEFAULT: '#3b82f6',
          foreground: '#eaeaea'
        }
      }
    }
  },
  plugins: []
};
