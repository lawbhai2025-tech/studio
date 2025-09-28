import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"PT Sans"', 'sans-serif'],
        headline: ['"PT Sans"', 'sans-serif'],
        code: ['monospace'],
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
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        rain: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'rain-splash': {
          '0%': { transform: 'scaleX(0)', opacity: '1' },
          '80%': { transform: 'scaleX(1)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        'cloud-move': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        'cloud-move-slow': {
          '0%': { transform: 'translateX(-150%)' },
          '100%': { transform: 'translateX(150%)' },
        },
        'cloud-move-reverse': {
          '0%': { transform: 'translateX(120%)' },
          '100%': { transform: 'translateX(-120%)' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        'heat-shimmer': {
          '0%, 100%': { transform: 'skewX(0)', opacity: '0' },
          '50%': { transform: 'skewX(2deg)', opacity: '1' },
        },
        lightning: {
          '0%, 100%': { opacity: '0' },
          '5%, 50%': { opacity: '1' },
          '6%, 51%': { opacity: '0' },
        },
        'heavy-rain': {
          '0%': { transform: 'translateY(-100px) skew(-15deg)', opacity: '0' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) skew(-15deg)', opacity: '0' },
        },
        'wind-gust': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        snow: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        rain: 'rain 1s linear infinite',
        'rain-splash': 'rain-splash 0.5s ease-out infinite',
        'cloud-move': 'cloud-move 20s linear infinite',
        'cloud-move-slow': 'cloud-move-slow 30s linear infinite',
        'cloud-move-reverse': 'cloud-move-reverse 25s linear infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        'heat-shimmer': 'heat-shimmer 3s ease-in-out infinite',
        lightning: 'lightning 2s linear infinite',
        'heavy-rain': 'heavy-rain 0.5s linear infinite',
        'wind-gust': 'wind-gust 2s ease-in-out infinite',
        snow: 'snow 5s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
