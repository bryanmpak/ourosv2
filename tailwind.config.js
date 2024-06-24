/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        title: "var(--color-title)",
        text: "var(--color-text)",
        nav_bg: "var(--color-nav_bg)",
        light: "var(--color-light)",
        neutral: "var(--color-neutral)",
        dark: "var(--color-dark)",
        shadow: "var(--color-shadow)",
        hover: "var(--color-hover)",
        accent: "var(--color-accent)",
        destructive: "var(--color-destructive)",
      },
      boxShadow: {
        glassmorphism: "0 2px 32px 0 rgba( 75, 85, 99, 0.37 )",
      },
    },
  },
  plugins: [],
}
