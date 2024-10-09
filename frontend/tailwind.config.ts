import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
        lg: '48px',
      },
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
    },
    fontSize: {
      '4xs': [
        'var(--font-4xs)',
        { lineHeight: 'var(--line-height-4xs)', fontWeight: '500' },
      ],
      '3xs': [
        'var(--font-3xs)',
        { lineHeight: 'var(--line-height-3xs)', fontWeight: '400' },
      ],
      '2xs': [
        'var(--font-2xs)',
        { lineHeight: 'var(--line-height-2xs)', fontWeight: '500' },
      ],
      xs: [
        'var(--font-xs)',
        { lineHeight: 'var(--line-height-xs)', fontWeight: '500' },
      ],
      sm: [
        'var(--font-sm)',
        { lineHeight: 'var(--line-height-sm)', fontWeight: '400' },
      ],
      md: [
        'var(--font-md)',
        { lineHeight: 'var(--line-height-md)', fontWeight: '400' },
      ],
      lg: [
        'var(--font-lg)',
        { lineHeight: 'var(--line-height-lg)', fontWeight: '600' },
      ],
      xl: [
        'var(--font-xl)',
        { lineHeight: 'var(--line-height-2xl)', fontWeight: '600' },
      ],
      '2xl': [
        'var(--font-2xl)',
        { lineHeight: 'var(--line-height-xl)', fontWeight: '600' },
      ],
      '3xl': [
        'var(--font-3xl)',
        { lineHeight: 'var(--line-height-3xl)', fontWeight: '700' },
      ],
      '4xl': [
        'var(--font-4xl)',
        { lineHeight: 'var(--line-height-4xl)', fontWeight: '700' },
      ],
    },
    extend: {
      boxShadow: {
        'sphere-primary':
          '0 14px 26px -12px rgba(61,112,178,.42),0 4px 23px 0px rgba(0,0,0,.12),0 8px 10px -5px rgba(61,112,178,.2)',
        'sphere-secondary':
          '0 14px 26px -12px rgba(85,150,230,.42),0 4px 23px 0px rgba(0,0,0,.12),0 8px 10px -5px rgba(85,150,230,.2)',
      },
      spacing: {
        400: '400px',
      },
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
        background: {
          DEFAULT: 'hsl(var(--background))',
          secondary: 'hsl(var(--background-secondary))',
        },
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
        white: 'hsl(var(--white))',
        gray: {
          50: 'hsl(var(--gray-50))',
          100: 'hsl(var(--gray-100))',
          200: 'hsl(var(--gray-200))',
          300: 'hsl(var(--gray-300))',
          400: 'hsl(var(--gray-400))',
          500: 'hsl(var(--gray-500))',
          600: 'hsl(var(--gray-600))',
          700: 'hsl(var(--gray-700))',
          800: 'hsl(var(--gray-800))',
          900: 'hsl(var(--gray-900))',
        },
        blue: {
          50: 'hsl(var(--blue-50))',
          100: 'hsl(var(--blue-100))',
          200: 'hsl(var(--blue-200))',
          300: 'hsl(var(--blue-300))',
          400: 'hsl(var(--blue-400))',
          500: 'hsl(var(--blue-500))',
          600: 'hsl(var(--blue-600))',
          700: 'hsl(var(--blue-700))',
          800: 'hsl(var(--blue-800))',
          900: 'hsl(var(--blue-900))',
        },
        green: {
          DEFAULT: 'hsl(var(--green))',
          100: 'hsl(var(--green-100))',
          200: 'hsl(var(--green-200))',
        },
        red: {
          DEFAULT: 'hsl(var(--red))',
          100: 'hsl(var(--red-100))',
        },
        yellow: {
          400: 'hsl(var(--yellow-400))',
        },
        neutral: {
          100: 'hsl(var(--neutral-100))',
          200: 'hsl(var(--neutral-200))',
          300: 'hsl(var(--neutral-300))',
          400: 'hsl(var(--neutral-400))',
          500: 'hsl(var(--neutral-500))',
          600: 'hsl(var(--neutral-600))',
          700: 'hsl(var(--neutral-700))',
          800: 'hsl(var(--neutral-800))',
        },
        dark: {
          100: 'hsl(var(--dark-100))',
          200: 'hsl(var(--dark-200))',
          300: 'hsl(var(--dark-300))',
          400: 'hsl(var(--dark-400))',
          500: 'hsl(var(--dark-500))',
          600: 'hsl(var(--dark-600))',
          700: 'hsl(var(--dark-700))',
          800: 'hsl(var(--dark-800))',
          900: 'hsl(var(--dark-900))',
          950: 'hsl(var(--dark-950))',
        },
        black: {
          DEFAULT: 'hsl(var(--black))',
          99: 'var(--black-99)',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        roboto: ['var(--font-roboto)'],
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
        'fade-in-left': {
          '0%': {
            transform: 'translate3d(20px, 0, 0)',
            opacity: '0',
          },
          '100%': {
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
          },
        },
        'fade-in-up': {
          '0%': {
            transform: 'translate3d(0, 20px, 0)',
          },
          '100%': {
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
          },
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
        'fade-in-left': 'fade-in-left 0.5s',
        'fade-in-up': 'fade-in-up 0.5s',
        'fade-out': 'fade-out 0.7s ease-out',
        'slide-in': 'slide-in 1s cubic-bezier(0.16, 0.81, 0.32, 1)',
        'bounce-in-left': 'bounce-in-left 0.7s ease-in-out',
        'bounce-in-right': 'bounce-in-right 0.7s ease-in-out',
        'bounce-in-up': 'bounce-in-up 0.7s ease-in-out',
        'bounce-in-down': 'bounce-in-down 0.7s ease-in-out',
        'flip-in-x': 'flip-in-x 1s ease-out',
        'spin-fast': 'spin 0.7s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
