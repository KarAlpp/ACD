/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '2vw', // ekrana göre padding
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
        // vw tabanlı font size'lar
        xs: "clamp(0.75rem, 0.9vw, 0.875rem)",
        sm: "clamp(0.875rem, 1vw, 1rem)",
        base: "clamp(1rem, 1.2vw, 1.125rem)",
        lg: "clamp(1.125rem, 1.4vw, 1.25rem)",
        xl: "clamp(1.25rem, 1.6vw, 1.5rem)",
        "2xl": "clamp(1.5rem, 2vw, 2rem)",
        "3xl": "clamp(1.875rem, 2.5vw, 2.25rem)",
        "4xl": "clamp(2.25rem, 3vw, 3rem)",
      },
      spacing: {
        // Oranlı spacing'ler (vw tabanlı)
        "5vw": "5vw",
        "10vw": "10vw",
        "2vh": "2vh",
        "5vh": "5vh",
        "10vh": "10vh",
      },
      maxWidth: {
        screen: "1920px", // sabit canvas hissi
      },
    },
  },
  plugins: [],
};
