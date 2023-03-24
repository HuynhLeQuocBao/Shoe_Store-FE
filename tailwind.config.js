/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        'complete': '61% 39% 61% 39% / 40% 59% 41% 60% '
      },
      colors: {
        primary: '#88c8bc',
        secondary: '#595959',
      },
      fontFamily: {
        // Rokkitt: '"Rokkitt", Georgia, serif',
        Rokkitt: '"Oswal", Arial, sans-serif',
      },
      keyframes: {
        banner: {
          '0%': {
            opacity: 0,
            transform: 'translate(-50%, 40%)',
          },
          '50%': { opacity: 1 },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%, -50%)',
          }
        }
      },
      animation: {
        'banner': 'banner 2s cubic-bezier(0, 0.49, 0.82, 0.98) 1 forwards',
      }
    },
  },
  plugins: [],
  important: true,
};
