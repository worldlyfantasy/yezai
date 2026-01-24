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
        sand: "var(--sand)",
        stone: "var(--stone)",
        wash: "var(--wash)"
      },
      fontFamily: {
        "serif-cn": ["Songti SC", "STSong", "Noto Serif SC", "Source Han Serif SC", "serif"],
        "sans-cn": ["-apple-system", "BlinkMacSystemFont", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", "sans-serif"]
      },
      boxShadow: {
        card: "0 10px 30px rgba(31,35,40,0.06)",
        float: "0 20px 60px rgba(31,35,40,0.10)"
      },
      borderRadius: {
        card: "var(--radius-card)",
        btn: "var(--radius-btn)",
        chip: "var(--radius-chip)"
      },
      backgroundImage: {
        "paper-noise": "var(--texture)"
      }
    }
  },
  plugins: []
};

export default config;
