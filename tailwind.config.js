/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        accent: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        surface: {
          900: '#0a0a0f',
          800: '#111118',
          700: '#18181f',
          600: '#1e1e28',
          500: '#252532',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float':       'float 8s ease-in-out infinite',
        'float-slow':  'float 12s ease-in-out infinite',
        'float-delay': 'float 10s ease-in-out infinite 3s',
        'shimmer':     'shimmer 2.5s linear infinite',
        'fade-up':     'fadeUp 0.7s ease-out forwards',
        'pulse-slow':  'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit':       'orbit 20s linear infinite',
        'ping-slow':   'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'grid-fade':   'gridFade 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%':      { transform: 'translateY(-16px) translateX(6px)' },
          '66%':      { transform: 'translateY(-8px) translateX(-6px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        gridFade: {
          '0%, 100%': { opacity: '0.03' },
          '50%':      { opacity: '0.07' },
        },
      },
    },
  },
  plugins: [],
}
