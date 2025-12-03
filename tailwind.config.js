/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '465px',
      'mobile': '620px',
      'tablet': '850px',

      // optionally keep your overrides for large screens
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      'h1-huge': '250px', 'h1': '64px', 'h2': '48px', 'h3': '36px', 'h4': '32px', 'h5': '28px', 'h6': '24px',
      'xl': '20px', 'lg': '18px', 'base': '16px',
    },
    extend: {
      colors: {
        'text-light': '#FFFFFF', 'text-dark': '#262626', 'text-secondary': '#656565',
        'primary-button': '#FF5659', 'accent': '#FFC739', 'dark-background': '#262626',
        'light-background': '#FFFFFF', 'med-background': '#EEEEEE',
      },
      fontFamily: {
        'heading': ['Neutra', 'Montserrat', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif'],
        'nav': ['Raleway', 'sans-serif'],
      },
      borderRadius: { 'card': '15px' },
      maxWidth: { 'container': '1440px' }
    },
  },
  plugins: [],
}