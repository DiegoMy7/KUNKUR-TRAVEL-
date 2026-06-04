import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        bone: "#F5F0E8",
        sand: "#D8A85B",
        andean: "#3F6B4F",
        night: "#0B1E2D",
        clay: "#B65A3C"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(216, 168, 91, 0.22)",
        glass: "0 24px 90px rgba(0, 0, 0, 0.42)"
      },
      backgroundImage: {
        "radial-ink":
          "radial-gradient(circle at 20% 0%, rgba(216,168,91,.18), transparent 34%), radial-gradient(circle at 90% 10%, rgba(63,107,79,.24), transparent 38%), linear-gradient(135deg, #050505 0%, #0B1E2D 48%, #050505 100%)"
      }
    }
  },
  plugins: []
};

export default config;
