/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'white': '#ffffff',
        'gradient-green': '#64E275',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        'wallnutt': ['"Wallnutt Corps"', 'sans-serif'],
      },
      backgroundImage: {
        'beauty-green': 'linear-gradient(93deg, #64E275 -74.03%, #11B6BC 12.62%, #1776B1 99.27%)',
      },
      maxWidth: {
        'container': '1440px',
      },
      spacing: {
        '86.68': '5.4175rem', // pxToRem(86.68)
        '21.86': '1.36625rem', // pxToRem(21.86)
        '136.68': '8.5425rem', // pxToRem(136.68)
        '28.14': '1.75875rem', // pxToRem(28.14)
        '54.59': '3.411875rem', // pxToRem(54.59)
        '16': '1rem', // pxToRem(16)
        '24': '1.5rem', // pxToRem(24)
        '8.824': '0.5515rem', // pxToRem(8.824)
        '29.412': '1.83825rem', // pxToRem(29.412)
        '7.353': '0.4595625rem', // pxToRem(7.353)
        '1.471': '0.0919375rem', // pxToRem(1.471)
        '200.18': '12.51125rem', // pxToRem(200.18)
        '42': '2.625rem', // pxToRem(42)
        '780.93': '48.808125rem', // pxToRem(780.93)
        '120.386': '7.524125rem', // pxToRem(120.386)
        '170.93': '10.683125rem', // pxToRem(170.93)
        '10': '0.625rem', // pxToRem(10)
        '20': '1.25rem', // pxToRem(20)
        '35': '2.1875rem', // pxToRem(35)
      },
      fontSize: {
        '50': ['3.125rem', '3.0625rem'], // pxToRem(50) with line-height
        '120': ['7.5rem', '8.4375rem'], // pxToRem(120) with line-height
        '15': ['0.9375rem', '1.375rem'], // pxToRem(15) with line-height
        '24': ['1.5rem', 'normal'], // pxToRem(24)
        '49': '3.0625rem', // pxToRem(49)
        '22': '1.375rem', // pxToRem(22)
        '135': '8.4375rem', // pxToRem(135)
      },
    },
  },
  plugins: [],
}
