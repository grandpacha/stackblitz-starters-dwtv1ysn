import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        surface: '#111111',
        'surface-light': '#1A1A1A',
        border: '#222222',
        'border-light': '#333333',
        muted: '#999999',
        cream: '#F5F0EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.25rem, 5vw, 5rem)', { lineHeight: '1.05', fontWeight: '800' }],
        'h1': ['clamp(2rem, 4vw, 4.5rem)', { lineHeight: '1.05', fontWeight: '800' }],
        'h2': ['clamp(1.75rem, 3vw, 3.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h3': ['clamp(1.5rem, 2vw, 2rem)', { lineHeight: '1.2', fontWeight: '600' }],
        'stat': ['clamp(3rem, 8vw, 7.5rem)', { lineHeight: '1', fontWeight: '800' }],
      },
      spacing: {
        'section': 'clamp(3.75rem, 8vw, 8.75rem)',
      },
      maxWidth: {
        'content': '1320px',
      },
      borderRadius: {
        'card': '16px',
        'btn': '9999px',
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 45s linear infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};
export default config;
