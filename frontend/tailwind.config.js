/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  '#fff8f0',
          100: '#ffe8cc',
          200: '#ffd099',
          300: '#ffb347',
          400: '#ff9800',
          500: '#FF6A00',
          600: '#e05a00',
          700: '#b84500',
          800: '#8f3400',
          900: '#662500',
        },
        gold: {
          400: '#FFD700',
          500: '#FFC300',
          600: '#E6A800',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        marathi: ['Noto Sans Devanagari', 'sans-serif'],
      },
      backgroundImage: {
        'saffron-gradient': 'linear-gradient(135deg, #FF6A00 0%, #FFB347 100%)',
        'hero-gradient': 'linear-gradient(135deg, #FF6A00 0%, #FF9800 50%, #FFB347 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 106, 0, 0.4)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(255, 106, 0, 0.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}