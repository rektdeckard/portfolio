import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
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
    },
    fontFamily: {
      sans: ["sans-serif"],
      mono: ["DepartureMono", "monospace"],
    },
    extend: {},
  },
  darkMode: "media",
  plugins: [],
} satisfies Config;
