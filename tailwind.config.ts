import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        muted: "var(--muted)",
        line: "var(--line)",
        brand: "var(--brand)",
        "brand-hover": "var(--brand-hover)",
        sand: "var(--sand)",
        terracotta: "var(--terracotta)",
        cream: "var(--cream)",
        beige: "var(--beige)",
        stone: "var(--stone)",
        wash: "var(--wash)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)"
      },
      fontFamily: {
        "serif-cn": ["var(--font-serif-cn)", "Songti SC", "STSong", "Source Han Serif SC", "serif"],
        "sans-cn": ["var(--font-sans-cn)", "-apple-system", "BlinkMacSystemFont", "PingFang SC", "Microsoft YaHei", "sans-serif"]
      },
      boxShadow: {
        card: "0 10px 30px rgba(153,57,33,0.06)",
        float: "0 20px 60px rgba(153,57,33,0.10)"
      },
      borderRadius: {
        card: "var(--radius-card)",
        btn: "var(--radius-btn)",
        chip: "var(--radius-chip)",
        DEFAULT: "var(--radius)"
      },
      backgroundImage: {
        "paper-noise": "var(--texture)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
