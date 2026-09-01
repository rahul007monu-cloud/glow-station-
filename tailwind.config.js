/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b0710',
          soft: '#130c1c',
          card: '#1a1026',
        },
        gold: {
          50: '#fdf8ec',
          100: '#f8ecc9',
          200: '#f0d894',
          300: '#e7c35d',
          400: '#dfb134',
          500: '#c9971d',
          600: '#a77616',
          700: '#815714',
          800: '#5c3d11',
          900: '#3b280c',
        },
        rose: {
          300: '#f7a8c4',
          400: '#f177a5',
          500: '#e14e86',
        },
        lilac: {
          300: '#c7aaff',
          400: '#a97dff',
          500: '#8b5cf6',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(223, 177, 52, 0.45)',
        'glow-rose': '0 0 44px -10px rgba(241, 119, 165, 0.5)',
        float: '0 30px 60px -24px rgba(0, 0, 0, 0.75)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'gold-sheen':
          'linear-gradient(110deg, #815714 0%, #e7c35d 28%, #fdf8ec 45%, #e7c35d 62%, #a77616 100%)',
        'aurora':
          'radial-gradient(55% 55% at 12% 8%, rgba(231,195,93,0.22) 0%, transparent 62%), radial-gradient(50% 50% at 88% 14%, rgba(225,78,134,0.20) 0%, transparent 62%), radial-gradient(65% 55% at 50% 100%, rgba(169,118,22,0.28) 0%, transparent 68%)',
        'glass':
          'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.05) 100%)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0,-18px,0) rotate(1.5deg)' },
        },
        'floaty-slow': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-34px,0) scale(1.04)' },
        },
        drift: {
          '0%': { transform: 'translate3d(-6%,0,0)' },
          '50%': { transform: 'translate3d(6%,-4%,0)' },
          '100%': { transform: 'translate3d(-6%,0,0)' },
        },
        sheen: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.15', transform: 'scale(0.7)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        'floaty-slow': 'floaty-slow 13s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        sheen: 'sheen 6s linear infinite',
        twinkle: 'twinkle 3.5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.24,0,0.38,1) infinite',
        marquee: 'marquee 28s linear infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
      },
    },
  },
  plugins: [],
};
