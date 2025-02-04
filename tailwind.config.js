/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1200px',
      'xl': '1440px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'myBlue': '#0A3283',
        'myPink': '#BD365D'
      },
      backgroundImage: (theme) => ({
        pattern:
          "url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
      })
    },
  },
  plugins: [],
}

