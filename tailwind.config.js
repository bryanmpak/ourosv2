/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
        border: "var(--color-border)",
        dark: "var(--color-dark)",
        shadow: "var(--color-shadow)",
        hover: "var(--color-hover)",
        accent: "var(--color-accent)",
        destructive: "var(--color-destructive)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      boxShadow: {
        glassmorphism: "0 2px 32px 0 rgba( 75, 85, 99, 0.37 )",
      },
    },
  },
  plugins: [],
};
