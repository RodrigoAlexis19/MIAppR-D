/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        pulseSlow: 'pulse 4s ease-in-out infinite',
        darkGradient: 'darkGradient 10s ease infinite',
      },
      keyframes: {
        darkGradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }
    }
  },
  plugins: [],
}
