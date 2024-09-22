/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ff6f20', // Orange
          dark: '#ff3d00',  // Orange sombre
        },
        gray: {
          800: '#2d2d2d', // Gris foncé
          700: '#3a3a3a', // Gris un peu plus clair pour les cartes en mode sombre
        },
        beige: '#f5f5dc', // Blanc cassé
        black: '#000000', // Noir
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
