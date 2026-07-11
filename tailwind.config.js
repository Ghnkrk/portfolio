/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        panel: "#0b0b0f",
        border: "#1d1d26",
        primary: "#ffffff",
        secondary: "#a1a1aa",
        accent: {
          blue: "#3b82f6",
          cyan: "#06b6d4",
          emerald: "#10b981",
        },
        system: {
          gray: "#16161a",
          darkGray: "#0c0c0e",
          lightGray: "#2a2a35",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Source Code Pro", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-glow": "pulseGlow 2s infinite ease-in-out",
        "scanline": "scanline 8s linear infinite",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: 0.3, transform: "scale(1)" },
          "50%": { opacity: 0.8, transform: "scale(1.05)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        }
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-glow": "0 0 20px rgba(6, 182, 212, 0.15)",
        "neon-glow": "0 0 10px rgba(59, 130, 246, 0.5)",
      }
    },
  },
  plugins: [],
}
