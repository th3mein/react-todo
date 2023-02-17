/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"PT Sans"', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#202225',
        secondary: '#5865f2',
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3d5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
      },
      backgroundImage: {
        'body-dark':
          'radial-gradient(circle at 10% 20%, rgb(87, 108, 117) 0%, rgb(37, 50, 55) 100.2%)',
      },
    },
  },
  plugins: [],
}
