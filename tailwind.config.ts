import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fondo oscuro editorial
        ink: '#0B0A09',
        graphite: '#161311',
        stone: '#2A2420',
        // Tipografía crema/blanca
        cream: '#F6F1E8',
        muted: '#A8A095',
        // Acento de lujo dorado/champán
        gold: '#C8A24C',
        'gold-bright': '#E6CA86',
        // Único color de acción (CTA) — azul Telegram, destaca sobre el dorado
        action: '#2AABEE',
        'action-dark': '#1E96D4',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
