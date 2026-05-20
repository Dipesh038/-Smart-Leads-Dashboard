import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Source Sans 3", "sans-serif"]
      },
      colors: {
        ink: {
          50: "#f6f7fb",
          100: "#e6e8f0",
          200: "#cfd4e3",
          300: "#aab4cc",
          400: "#7f8aa8",
          500: "#5e6a87",
          600: "#4b556f",
          700: "#3b445c",
          800: "#2c3347",
          900: "#1e2433"
        },
        tide: {
          50: "#f1fbf9",
          100: "#d5f5ef",
          200: "#a9eae0",
          300: "#74d9cd",
          400: "#3fbfb2",
          500: "#25a399",
          600: "#1e857d",
          700: "#1a6b65",
          800: "#165651",
          900: "#0f3b38"
        },
        ember: {
          50: "#fff7ed",
          100: "#ffedd4",
          200: "#ffd7a8",
          300: "#ffbc73",
          400: "#ff9440",
          500: "#f97316",
          600: "#e35a0c",
          700: "#b84309",
          800: "#93350b",
          900: "#782d0d"
        }
      },
      boxShadow: {
        soft: "0 12px 30px rgba(30, 36, 51, 0.15)",
        card: "0 8px 20px rgba(44, 51, 71, 0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;
