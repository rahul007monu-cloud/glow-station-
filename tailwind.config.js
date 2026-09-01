/** @type {import('tailwindcss').Config} */

/**
 * Palette taken directly from the salon's signboard:
 * ivory-white board · polished gold channel letters · charcoal service plates.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* page + board surfaces */
        ivory: {
          50: '#fffdf9',
          100: '#fbf8f1',
          200: '#f5f0e5',
          300: '#ece5d6',
          400: '#ded4bf',
          500: '#cabfa6',
        },
        /* charcoal plates and all body copy */
        ink: {
          DEFAULT: '#20252b',
          soft: '#3a4149',
          muted: '#6b7379',
          plate: '#262b31',
          deep: '#14181c',
        },
        /* the signboard gold */
        gold: {
          50: '#fdf6e3',
          100: '#f7ebcb',
          200: '#eed9a3',
          300: '#e2c37a',
          400: '#d0a955',
          500: '#b98c3a',
          600: '#9c722c',
          700: '#7d5a23',
          800: '#5c421b',
          900: '#3d2c12',
        },
        /* the logo's blush pink */
        blush: {
          100: '#fdf1f7',
          200: '#fbe6f0',
          300: '#f2c9de',
          400: '#e79ec0',
          500: '#d97ba6',
        },
        /* the wooden slat walls and floor */
        wood: {
          200: '#f0dcbc',
          300: '#dcb884',
          400: '#c9945a',
          500: '#a9743f',
          600: '#835830',
        },
        /* cognac leather chairs */
        leather: {
          400: '#c0763f',
          500: '#a25c2c',
        },
        /* single warm accent for urgency chips */
        clay: {
          300: '#e8a887',
          400: '#d97f56',
          500: '#b4552d',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        sign: ['"Montserrat"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        board: '0 30px 60px -30px rgba(32, 37, 43, 0.45), 0 2px 0 0 rgba(255,255,255,0.9) inset',
        card: '0 18px 40px -24px rgba(32, 37, 43, 0.35)',
        lift: '0 34px 60px -30px rgba(32, 37, 43, 0.45)',
        glow: '0 0 40px -10px rgba(185, 140, 58, 0.55)',
        plate: 'inset 0 1px 0 rgba(255,255,255,0.14), 0 8px 18px -10px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'gold-sheen':
          'linear-gradient(110deg, #7d5a23 0%, #d0a955 26%, #fdf6e3 46%, #e2c37a 62%, #9c722c 100%)',
        'ivory-wall':
          'linear-gradient(180deg, #fffdf9 0%, #f7f3ea 40%, #efe8db 100%)',
        glass: 'linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0,-14px,0) rotate(1deg)' },
        },
        'floaty-slow': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-26px,0) scale(1.03)' },
        },
        drift: {
          '0%': { transform: 'translate3d(-4%,0,0)' },
          '50%': { transform: 'translate3d(4%,-3%,0)' },
          '100%': { transform: 'translate3d(-4%,0,0)' },
        },
        sheen: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.35', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.55' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        'floaty-slow': 'floaty-slow 13s ease-in-out infinite',
        drift: 'drift 24s ease-in-out infinite',
        sheen: 'sheen 6s linear infinite',
        twinkle: 'twinkle 3.5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.24,0,0.38,1) infinite',
        marquee: 'marquee 30s linear infinite',
        'spin-slow': 'spin-slow 28s linear infinite',
      },
    },
  },
  plugins: [],
};
