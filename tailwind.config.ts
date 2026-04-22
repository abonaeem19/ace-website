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
        ace: { 50: "#e6feff", 100: "#b3fdff", 200: "#80fbff", 300: "#4df9ff", 400: "#1af8ff", 500: "#00F0FF", 600: "#00c0cc", 700: "#009099", 800: "#006066", 900: "#003033" },
        dark: { DEFAULT: "#04040C", 50: "#f0f2f5", 800: "#07071A", 900: "#04040C", 950: "#020208" },
      },
      fontFamily: {
        tajawal: ["Tajawal", "Noto Kufi Arabic", "sans-serif"],
        almarai: ["Almarai", "Noto Kufi Arabic", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;