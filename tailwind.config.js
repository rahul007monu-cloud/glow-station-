/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b0908',
          soft: '#15110f',
          card: '#211a17',
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
        // Espresso noir + champagne gold + dusty rose. The lilac token now carries warm copper tones.
        rose: {
          200: '#f3d7dc',
          300: '#e8b8c2',
          400: '#d68fa0',
          500: '#b9677a',
        },
        lilac: {
          300: '#e6c0b1',
          400: '#ca907d',
          500: '#a66556',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Brush Script MT"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(223, 177, 52, 0.45)',
        'glow-rose': '0 0 44px -10px rgba(214, 143, 160, 0.48)',
        float: '0 30px 60px -24px rgba(0, 0, 0, 0.75)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'gold-sheen':
          'linear-gradient(110deg, #815714 0%, #e7c35d 28%, #fdf8ec 45%, #e7c35d 62%, #a77616 100%)',
        'aurora':
          'radial-gradient(60% 60% at 15% 10%, rgba(166,101,86,0.42) 0%, transparent 60%), radial-gradient(50% 50% at 85% 15%, rgba(185,103,122,0.38) 0%, transparent 60%), radial-gradient(60% 60% at 50% 100%, rgba(223,177,52,0.22) 0%, transparent 65%)',
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
