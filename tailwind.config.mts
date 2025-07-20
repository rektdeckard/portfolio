import type { Config } from "tailwindcss";

const colors = {
  black: "#1a1a1a",
  red: "#d29393",
  green: "#b3b393",
  yellow: "#cbaa89",
  blue: "#a8a1be",
  purple: "#b39fb0",
  cyan: "#c0af8c",
  white: "#dadada",
  brightBlack: "#5b5b5b",
  brightRed: "#c95954",
  brightGreen: "#828040",
  brightYellow: "#a6794c",
  brightBlue: "#5a6599",
  brightPurple: "#9c6995",
  brightCyan: "#74a39e",
  brightWhite: "#ffffff",
  brick: "#B24311",
  rust: "#422115",
  // NEW
  powder: "#F1E8E2",
  blush: "#EDE7EA",
  beige: "#E1E0D0",
  sky: "#CBE2EE",
  foam: "#BBDEC0",
} as const;

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      surface: "rgb(var(--color-surface) / <alpha-value>)",
      home: "rgb(var(--color-home) / <alpha-value>)",
      project: "rgb(var(--color-project) / <alpha-value>)",
      writing: "rgb(var(--color-writing) / <alpha-value>)",
      experiment: "rgb(var(--color-experiment) / <alpha-value>)",
      success: "rgb(var(--color-success) / <alpha-value>)",
      warning: "rgb(var(--color-warning) / <alpha-value>)",
      error: "rgb(var(--color-error) / <alpha-value>)",
    },
    fontFamily: {
      sans: ["sans-serif"],
      mono: ["MDIO", "DepartureMono", "monospace"],
    },
    extend: {},
  },
  darkMode: "media",
  plugins: [],
} satisfies Config;
