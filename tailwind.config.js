/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#bbdefb',
          DEFAULT: '#1976d2',
          dark: '#0d47a1',
        },
        secondary: {
          light: '#ffe0b2',
          DEFAULT: '#ff6f00',
          dark: '#e65100',
        },
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        gray: {
          light: '#f5f5f5',
          DEFAULT: '#9e9e9e',
          dark: '#333',
        }
      },
      boxShadow: {
        'custom': '0 4px 10px rgba(0, 0, 0, 0.1)',
        'custom-lg': '0 8px 16px rgba(0, 0, 0, 0.15)',
        'inner-custom': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 2s infinite alternate',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'bounce-slow': 'bounce 3s infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'pattern-dots': 'radial-gradient(currentColor 1px, transparent 1px)',
        'hero-pattern': 'linear-gradient(rgba(25, 118, 210, 0.8), rgba(13, 71, 161, 0.9)), url("/public/fields_map.png")',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
}