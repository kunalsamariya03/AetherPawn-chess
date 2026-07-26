/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0d0f13',
          900: '#14161b',
          800: '#1d2027',
          700: '#262a33',
          600: '#343945',
          500: '#4a5062',
        },
        parchment: '#e8e6e1',
        muted: '#8b8f98',
        brass: {
          400: '#e0bb52',
          500: '#c9a227',
          600: '#9c7c1c',
        },
        wood: {
          light: '#ead9b4',
          dark: '#4a2a16',
        },
        neon: {
          cyan: '#3ef2d0',
          magenta: '#ff3ec8',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(201,162,39,0.55)',
        'glow-blue': '0 0 24px -4px rgba(91,141,239,0.55)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.55 },
        },
        floatIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.2s ease-in-out infinite',
        floatIn: 'floatIn 0.35s ease-out',
      },
    },
  },
  plugins: [],
};
