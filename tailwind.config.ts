import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          amber: "#F59E0B",
          ink: "#0F172A",
          mist: "#F8FAFC"
        }
      },
      boxShadow: {
        premium: "0 24px 70px rgba(15, 23, 42, 0.12)",
        soft: "0 18px 42px rgba(37, 99, 235, 0.14)"
      },
      backgroundImage: {
        "fine-grid":
          "linear-gradient(rgba(15,23,42,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.045) 1px, transparent 1px)"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
