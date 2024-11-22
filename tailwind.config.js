// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        geist: ['"Geist Mono"', 'monospace'],
      },
      animation: {
        'zoom-in': 'show 1s ease-out forwards',
      },
      keyframes: {
        'show': {
          'from': {
            opacity: '0',
            transform: 'scale(0.1)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}