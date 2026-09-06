import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        tek: {
          50: "#effcf9",
          100: "#d8f7ef",
          200: "#afeede",
          300: "#78dfca",
          400: "#42cbb3",
          500: "#18af99",
          600: "#0b9483",
          700: "#08776d",
          800: "#075f58"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 36, 28, 0.08)",
        card: "0 8px 24px rgba(15, 36, 28, 0.07)"
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
