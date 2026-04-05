import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ace: {
          50: "#eef0ff", 100: "#dfe3ff", 200: "#c5cbff", 300: "#a0a1ff",
          400: "#8180ff", 500: "#5b5cff", 600: "#4a3ef5", 700: "#3e31d8",
          800: "#332aae", 900: "#2d2889", 950: "#1b1750",
        },
        dark: {
          DEFAULT: "#070b14", 50: "#f0f2f5", 100: "#d9dde5",
          800: "#0b1020", 900: "#10182a", 950: "#070b14",
        },
      },
      fontFamily: {
        tajawal: ["Tajawal", "sans-serif"],
        almarai: ["Almarai", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        float: "floatOrb 8s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;