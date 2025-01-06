import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.union([
      z.number(),
      z.tuple([z.number()]),
      z.tuple([z.number(), z.number().optional()]),
    ]),
    url: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { projects };
