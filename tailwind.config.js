/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./project/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        dark: '#0F1419',
        'accent-cyan': '#00D4FF',
        'accent-pink': '#FF00E5',
        'accent-gold': '#FFD700',
        'accent-blue': '#0077B5',
      },
    },
  },
  plugins: [],
} 