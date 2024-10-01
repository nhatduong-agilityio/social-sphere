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
        body: 'hsl(var(--body))',
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
        border: {
          DEFAULT: 'hsl(var(--border))',
          secondary: 'hsl(var(--border-secondary))',
          tertiary: 'hsl(var(--border-tertiary))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sphere: {
          '10': 'hsl(var(--sphere-10))',
          '20': 'hsl(var(--sphere-20))',
          '30': 'hsl(var(--sphere-30))',
          '40': 'hsl(var(--sphere-40))',
          '50': 'hsl(var(--sphere-50))',
        },
        'sphere-green': {
          '10': 'hsl(var(--sphere-green-10))',
          '20': 'hsl(var(--sphere-green-20))',
        },
        icon: {
          DEFAULT: 'hsl(var(--icon))',
          primary: 'hsl(var(--icon-primary))',
          secondary: 'hsl(var(--icon-secondary))',
          light: 'hsl(var(--icon-light))',
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
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in': {
          '0%': {
            opacity: '0',
            transform: 'translateX(50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'bounce-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(280px)',
          },
          '50%': {
            opacity: '1',
            transform: 'translateX(-20px)',
          },
          '70%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'bounce-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-280px)',
          },
          '50%': {
            opacity: '1',
            transform: 'translateX(20px)',
          },
          '70%': { transform: 'translateX(-10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'bounce-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(200px)',
          },
          '50%': {
            opacity: '1',
            transform: 'translateY(-10px)',
          },
          '70%': { transform: 'translateY(5px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'bounce-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-200px)',
          },
          '50%': {
            opacity: '1',
            transform: 'translateY(10px)',
          },
          '70%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'flip-in-x': {
          '0%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            opacity: '0',
          },
          '40%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
          },
          '60%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
            opacity: '1',
          },
          '80%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
          },
          '100%': {
            transform: 'perspective(400px)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-out': 'fade-out 0.7s ease-out',
        'slide-in': 'slide-in 1s cubic-bezier(0.16, 0.81, 0.32, 1)',
        'bounce-in-left': 'bounce-in-left 0.7s ease-in-out',
        'bounce-in-right': 'bounce-in-right 0.7s ease-in-out',
        'bounce-in-up': 'bounce-in-up 0.7s ease-in-out',
        'bounce-in-down': 'bounce-in-down 0.7s ease-in-out',
        'flip-in-x': 'flip-in-x 1s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
