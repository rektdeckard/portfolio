// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import wikiLinkPlugin, { getPermalinks } from "@portaljs/remark-wiki-link";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false }), mdx()],

  markdown: {
    remarkPlugins: [
      // [
      //   wikiLinkPlugin,
      //   {
      //     pathFormat: "obsidian-short",
      //     wikiLinkResolver: (slug: string) => {
      //       throw new Error("Unresolved wiki link: " + slug);
      //       return ["/assets/images/" + slug.split("/")[-1]];
      //     },
      //     permalinks: getPermalinks("public/assets/images"),
      //     hrefTemplate: (permalink: string) => `/assets/images/${permalink}`,
      //   },
      // ],
    ],
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "one-light",
        dark: "ayu-dark",
      },
    },
  },
  output: "server",
  adapter: netlify(),
});
