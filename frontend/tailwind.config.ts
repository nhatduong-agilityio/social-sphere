import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px', // iPhone 6, 7, 8, X, 11, 12 / Galaxy S8 / HTC One, Blackberry Passport / Amazon Kindle Fire HD 7 …
        sm: '600px', // LG G Pad 8.3 / Amazon Kindle Fire …
        md: '768px', // Microsoft Surface / iPad Pro 9.7 / iPad Mini …
        lg: '1024px', // iPad Pro 12.9 / Microsoft Surface Pro 3 …
        xl: '1280px', // Google Chromebook Pixel / Samsung Chromebook …
        '2xl': '1400px', // Macbook Air 2020 M1 / MacBook Pro 15
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        tn: 'var(--radius-tn)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        roboto: ['var(--font-roboto)'],
      },
      fontSize: {
        tn: [
          'var(--font-tn)',
          {
            lineHeight: 'var(--line-height-tn)',
            fontWeight: '500',
          },
        ],
        '2xs': [
          'var(--font-2xs)',
          {
            lineHeight: 'var(--line-height-2xs)',
            fontWeight: '400',
          },
        ],
        xs: [
          'var(--font-xs)',
          {
            lineHeight: 'var(--line-height-xs)',
            fontWeight: '500',
          },
        ],
        sm: [
          'var(--font-sm)',
          {
            lineHeight: 'var(--line-height-sm)',
            fontWeight: '500',
          },
        ],
        base: [
          'var(--font-base)',
          {
            lineHeight: 'var(--line-height-base)',
            fontWeight: '400',
          },
        ],
        md: [
          'var(--font-md)',
          {
            lineHeight: 'var(--line-height-md)',
            fontWeight: '400',
          },
        ],
        lg: [
          'var(--font-lg)',
          {
            lineHeight: 'var(--line-height-lg)',
            fontWeight: '600',
          },
        ],
        xl: [
          'var(--font-xl)',
          {
            lineHeight: 'var(--line-height-xl)',
            fontWeight: '600',
          },
        ],
        '3xl': [
          'var(--font-3xl)',
          {
            lineHeight: 'var(--line-height-3xl)',
            fontWeight: '700',
          },
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
