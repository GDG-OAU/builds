/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          green: {
            DEFAULT: '#188038',
            hover: '#137333',
            light: '#E6F4EA',
            border: '#CEEAD6',
            bright: '#34A853'
          },
          blue: {
            DEFAULT: '#4285F4',
            hover: '#1A73E8',
            light: '#E8F0FE',
            border: '#D2E3FC'
          },
          red: {
            DEFAULT: '#EA4335',
            hover: '#D93025',
            light: '#FCE8E6',
            border: '#FAD2CF'
          },
          yellow: {
            DEFAULT: '#FBBC04',
            hover: '#F9AB00',
            light: '#FEF7E0',
            border: '#FEEFC3'
          },
          gray: {
            50: '#F8F9FA',
            100: '#F1F3F4',
            200: '#E8EAED',
            300: '#DADCE0',
            400: '#BDC1C6',
            500: '#9AA0A6',
            600: '#80868B',
            700: '#5F6368',
            800: '#3C4043',
            900: '#202124'
          }
        }
      },
      fontFamily: {
        sans: ['Arial', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
        'spin-slow': 'spin 12s linear infinite'
      }
    },
  },
  plugins: [],
}

