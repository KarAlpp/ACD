/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        'DEFAULT': '1rem',
        'sm': '2rem',
        'lg': '4rem',
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'], // ✅ Montserrat tanımlandı
      },
      fontSize: {
        'xs': 'clamp(0.75rem, 1vw, 0.875rem)',
        'sm': 'clamp(0.875rem, 1vw, 1rem)',
        'base': 'clamp(1rem, 1.1vw, 1.125rem)',
        'lg': 'clamp(1.125rem, 1.2vw, 1.25rem)',
        'xl': 'clamp(1.25rem, 1.3vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 1.6vw, 2rem)',
        '3xl': 'clamp(1.875rem, 2vw, 2.25rem)',
        '4xl': 'clamp(2.25rem, 2.5vw, 3rem)',
      },
      spacing: {
        '2vw': 'min(2vw, 1rem)',
        '5vw': 'min(5vw, 2rem)',
        '10vw': 'min(10vw, 3rem)',
        '2vh': 'min(2vh, 1rem)',
        '5vh': 'min(5vh, 2rem)',
        '10vh': 'min(10vh, 3rem)',
      },
      maxWidth: {
        'screen-xl': '1280px',
        'screen-2xl': '1440px',
        'screen-3xl': '1920px',
      },
    },
  },
  plugins: [],
};
