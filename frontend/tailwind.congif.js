/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { // Daha gelişmiş padding ayarı
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
      fontSize: {
        // Daha kontrollü font boyutları
        'xs': 'clamp(0.75rem, 1vw, 0.875rem)',
        'sm': 'clamp(0.875rem, 1vw, 1rem)',
        'base': 'clamp(1rem, 1.1vw, 1.125rem)',  // Daha küçük değişim
        'lg': 'clamp(1.125rem, 1.2vw, 1.25rem)',
        'xl': 'clamp(1.25rem, 1.3vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 1.6vw, 2rem)',
        '3xl': 'clamp(1.875rem, 2vw, 2.25rem)',
        '4xl': 'clamp(2.25rem, 2.5vw, 3rem)', // Daha küçük değişim
      },
      spacing: {
        // Daha kontrollü spacing
        '2vw': 'min(2vw, 1rem)', // max değer ekleyerek çok büyümesini engelle
        '5vw': 'min(5vw, 2rem)',
        '10vw': 'min(10vw, 3rem)',
        '2vh': 'min(2vh, 1rem)',
        '5vh': 'min(5vh, 2rem)',
        '10vh': 'min(10vh, 3rem)',
      },
      maxWidth: {
        'screen-xl': '1280px', // Ekstra max-width
        'screen-2xl': '1440px',
        'screen-3xl': '1920px', // Yeni eklendi
      },
    },
  },
  plugins: [],
};
