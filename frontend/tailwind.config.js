/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Ported 1:1 from the original style.css :root tokens so new
      // AI-feature components (built with Tailwind) match the existing
      // hand-built resume templates exactly. Do not introduce a second
      // palette — extend this one.
      colors: {
        navy: {
          DEFAULT: '#0d1b2a',
          mid: '#1a2e45',
          light: '#243b55',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e2c47a',
        },
        ivory: {
          DEFAULT: '#faf7f2',
          dark: '#f0ebe0',
        },
        ink: {
          DEFAULT: '#1c1c1e',
          mid: '#3a3a3c',
          muted: '#6e6e73',
        },
        bg: {
          app: '#0f1e2e',
          preview: '#e8e2d9',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
        xl: '28px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.35)',
        float: '0 16px 48px rgba(0,0,0,0.45)',
        gold: '0 0 0 3px rgba(201,168,76,0.25)',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
