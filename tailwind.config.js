/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        title: "var(--color-title)",
        text: "var(--color-text)",
        nav_bg: "var(--color-nav_bg)",
        light: "var(--color-light)",
        neutral: "var(--color-neutral)",
        dark: "var(--color-dark)",
        shadow: "var(--color-shadow)",
      },
      boxShadow: {
        glassmorphism: "0 8px 32px 0 rgba( 75, 85, 99, 0.37 )",
      },
    },
  },
  plugins: [],
}
