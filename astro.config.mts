// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false }), mdx(), solidJs()],
  devToolbar: { enabled: true },
  markdown: {
    gfm: true,
    remarkPlugins: [],
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "github-light",
        // dark: "vesper",
        dark: {
          name: "console-dark",
          type: "dark",
          settings: [
            {
              scope: "comment",
              settings: {
                foreground:
                  "rgba(var(--color-secondary) / var(--tw-text-opacity))",
                fontStyle: "italic",
              },
            },
            {
              scope: "string",
              settings: {
                foreground:
                  "rgba(var(--color-success) / var(--tw-text-opacity))",
              },
            },
            {
              scope: "keyword",
              settings: {
                foreground:
                  "rgba(var(--color-warning) / var(--tw-text-opacity))",
                fontStyle: "bold",
              },
            },
            {
              scope: "number",
              settings: {
                foreground: "rgba(var(--color-home) / var(--tw-text-opacity))",
              },
            },
            { scope: "function", settings: { foreground: "#dcdcaa" } },
            { scope: "variable", settings: { foreground: "#9cdcfe" } },
            { scope: "type", settings: { foreground: "#4ec9b0" } },
            {
              scope: "constant",
              settings: {
                foreground:
                  "rgba(var(--color-primary) / var(--tw-text-opacity))",
              },
            },
            { scope: "class", settings: { foreground: "#4ec9b0" } },
            { scope: "interface", settings: { foreground: "#4ec9b0" } },
            { scope: "enum", settings: { foreground: "#b8d7a3" } },
            { scope: "property", settings: { foreground: "#9cdcfe" } },
            { scope: "namespace", settings: { foreground: "#4ec9b0" } },
            { scope: "parameter", settings: { foreground: "#9cdcfe" } },
            {
              scope: "operator",
              settings: {
                foreground:
                  "rgba(var(--color-secondary) / var(--tw-text-opacity))",
              },
            },
            {
              scope: "punctuation",
              settings: {
                foreground:
                  "rgba(var(--color-secondary) / var(--tw-text-opacity))",
              },
            },
            { scope: "tag", settings: { foreground: "#569cd6" } },
            { scope: "attribute", settings: { foreground: "#9cdcfe" } },
            { scope: "builtin", settings: { foreground: "#c586c0" } },
            { scope: "symbol", settings: { foreground: "#b5cea8" } },
          ],
        },
      },
    },
  },
  site: "https://2025.tobiasfried.com",
  output: "server",
  adapter: netlify(),
});
