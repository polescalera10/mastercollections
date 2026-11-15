import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base Carbon / Obsidian (sin tonos marrones ni sepia antiguos)
        ink: '#07080A',
        graphite: '#101318',
        stone: '#1A1F27',
        // Tipografía blanca pura y gris técnico frío
        cream: '#F8FAFC',
        muted: '#94A3B8',
        // Acento disruptivo: Acid Volt / Streetwear Lime
        gold: '#D4FF00',
        'gold-bright': '#E6FF66',
        // Color primario de acción (CTA #1): Verde eléctrico WhatsApp
        action: '#25D366',
        'action-dark': '#1DA851',
        // Canal secundario: Azul Telegram
        telegram: '#2AABEE',
      },
      fontFamily: {
        // Space Grotesk sustituye a la serif clásica en titulares
        serif: ['var(--font-display)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '74rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
