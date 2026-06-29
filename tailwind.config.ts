import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#1A1A1A",
          card: "#222222",
        },
        foreground: "#F5F5F5",
        gold: {
          DEFAULT: "#C6A15B",
          light: "#D4B06A",
        },
        muted: "#B0B0B0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(198, 161, 91, 0.4)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 20px 4px rgba(198, 161, 91, 0.25)",
            transform: "scale(1.05)",
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #C6A15B 0%, #A8864A 100%)",
        "gradient-card": "linear-gradient(135deg, #222222 0%, rgba(198, 161, 91, 0.2) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
