import type { Config } from "tailwindcss";

export const COLORS = {
  Paper: {
    primary: "rgb(26 26 26)",
    secondary: "rgb(91 91 91)",
    surface: "rgb(255 255 255)",
    home: "rgb(241 232 226)",
    project: "rgb(225 224 208)",
    writing: "rgb(203 226 238)",
    experiment: "rgb(237 231 234)",
    success: "rgb(154 169 147)",
    warning: "rgb(193 155 78)",
    error: "rgb(198 112 96)",
  },
  Console: {
    primary: "rgb(132 182 177)",
    secondary: "rgb(86 150 162)",
    surface: "rgb(11 15 19)",
    home: "rgb(9 31 46)",
    project: "rgb(57 59 32)",
    writing: "rgb(61 47 59)",
    experiment: "rgb(61 46 34)",
    success: "rgb(22 128 0)",
    warning: "rgb(202 138 0)",
    error: "rgb(220 38 38)",
  },
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
