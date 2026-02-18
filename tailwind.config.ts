import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          dark: '#3730A3',
          soft: '#EEF2FF',
        },
        success: {
          DEFAULT: '#10B981',
          soft: '#D1FAE5',
        },
        warning: {
          DEFAULT: '#F59E0B',
          soft: '#FEF3C7',
        },
        danger: {
          DEFAULT: '#EF4444',
          soft: '#FEE2E2',
        },
        body: '#F8FAFC',
        surface: '#FFFFFF',
        heading: '#0F172A',
        muted: '#64748B',
      },
      backgroundColor: {
        body: '#F8FAFC',
        surface: '#FFFFFF',
      },
      textColor: {
        body: '#334155',
        heading: '#0F172A',
        muted: '#64748B',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        floating: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        'glow-primary': '0 0 20px rgba(79, 70, 229, 0.15)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.15)',
        'glow-warning': '0 0 20px rgba(245, 158, 11, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(79, 70, 229, 0.3)' },
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
