import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gengar: {
          50: "#faf7ff",
          100: "#f2ebff",
          200: "#e7d9ff",
          300: "#d1b8ff",
          400: "#b589ff",
          500: "#9654ff",
          600: "#7c2aff",
          700: "#5d0fff",
          800: "#4a0cd4",
          900: "#3e0baa",
          950: "#250675",
        },
        ghost: {
          DEFAULT: "hsl(var(--ghost))",
          foreground: "hsl(var(--ghost-foreground))",
          light: "hsl(var(--ghost-light))",
          dark: "hsl(var(--ghost-dark))",
        },
        shadow: {
          purple: "hsl(var(--shadow-purple))",
          dark: "hsl(var(--shadow-dark))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "ghost-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(150, 84, 255, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(150, 84, 255, 0.6)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-purple": {
          "0%, 100%": { backgroundColor: "rgba(150, 84, 255, 0.1)" },
          "50%": { backgroundColor: "rgba(150, 84, 255, 0.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        "ghost-glow": "ghost-glow 2s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "pulse-purple": "pulse-purple 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
