/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs':  '375px',
      'sm':  '640px',
      'md':  '768px',
      'lg':  '1024px',
      'xl':  '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        'luxora-noir':       '#0F0D0B',
        'luxora-espresso':   '#1B1410',
        'luxora-walnut':     '#3D2B1F',
        'luxora-cedar':      '#5C4033',
        'luxora-terracotta': '#8B5E3C',
        'luxora-gold':       '#C09A6B',
        'luxora-champagne':  '#D4B896',
        'luxora-linen':      '#EDE0CF',
        'luxora-cream':      '#F7F2EB',
        'luxora-ivory':      '#FDFAF6',
        
        'bg-primary':        '#FDFAF6',
        'bg-elevated':       '#FFFFFF',
        'bg-dark':           '#1B1410',
        'text-primary':      '#3D2B1F',
        'text-secondary':    '#8B5E3C',
        'text-muted':        '#D4B896',
        'accent':            '#C09A6B',
        'border-soft':       'rgba(92, 64, 51, 0.12)',
        'glass-border':      'rgba(192, 154, 107, 0.2)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Jost', '"Helvetica Neue"', 'sans-serif'],
      },
      boxShadow: {
        'warm':  '0 8px 40px rgba(60, 35, 20, 0.12)',
        'float': '0 24px 64px rgba(60, 35, 20, 0.18)',
      },
      backgroundColor: {
        'glass-bg': 'rgba(253, 250, 246, 0.72)',
      }
    },
  },
  plugins: [],
}
