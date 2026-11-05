/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Arial', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        gdg: {
          green: '#188038',
          'green-hover': '#137333',
          'green-light': '#E6F4EA',
          blue: '#4285F4',
          'blue-light': '#E8F0FE',
          red: '#EA4335',
          'red-light': '#FCE8E6',
          yellow: '#FBBC04',
          'yellow-light': '#FEF7E0',
        },
        ink: '#0d0d0d',
        'ink-secondary': '#5f6368',
        'ink-muted': '#9aa0a6',
        surface: '#f8f9fa',
        line: '#e8eaed',
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
      },
      animation: {
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
