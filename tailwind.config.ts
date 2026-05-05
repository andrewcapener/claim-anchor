import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B3A6B',
        gold: '#C9922A',
        'mid-blue': '#4A6FA5',
        'text-primary': '#1A1A2E',
        'text-secondary': '#6B7280',
        'off-white': '#F8F9FC',
        'border-default': '#E5E7EB',
        success: '#059669',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
