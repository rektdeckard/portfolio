import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";
import { shiftUTCToMDT } from "@utils/datetime";

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
    draft: z.boolean().optional(),
  }),
});

const writings = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/writing" }),
  schema: z.object({
    title: z.string().optional(),
    date: z.date().transform(shiftUTCToMDT),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { projects, writings };
