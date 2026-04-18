import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        card: 'hsl(var(--card))',

        base: 'hsl(var(--base))',
        surface: 'hsl(var(--surface))',
        cream: 'hsl(var(--cream))',
        sand: 'hsl(var(--sand))',
        lime: 'hsl(var(--lime))',
        'lime-light': 'hsl(var(--lime-light))',
        sky: 'hsl(var(--sky))',
        gold: 'hsl(var(--gold))',
        rose: 'hsl(var(--rose))',
      },
    },
    fontFamily: {
      heading: ['Space Grotesk', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [],
};

export default config;
