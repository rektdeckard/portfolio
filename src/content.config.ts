import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";
import { shiftUTCToMDT } from "@utils/datetime";
import { fetchBookDetails } from "@utils/books";

const READING_ISBNS = [
  9783982016108, // Writing A Compiler In Go
  9781878574510, // Tank Girl
  9780333781746,
  9780063111318,
] as const;

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

const readings = defineCollection({
  loader: async () =>
    Promise.all(
      READING_ISBNS.map((isbn) =>
        fetchBookDetails(isbn).then((data) => ({
          id: `${isbn}`,
          isbn,
          ...data,
        })),
      ),
    ),
  schema: z.object({
    id: z.string(),
    isbn: z.number(),
    bib_key: z.string(),
    info_url: z.string().url(),
    preview: z.string(),
    preview_url: z.string().url(),
    thumbnail_url: z.string().url().optional(),
    details: z.object({
      title: z.string(),
      authors: z
        .array(z.object({ key: z.string(), name: z.string() }))
        .optional(),
      contributors: z
        .array(z.object({ role: z.string(), name: z.string() }))
        .optional(),
      publish_date: z.string(),
      type: z.object({ key: z.string() }),
      local_id: z.array(z.string()).optional(),
      publishers: z.array(z.string()),
      source_records: z.array(z.string()),
      key: z.string(),
      works: z.array(z.object({ key: z.string() })),
      identifiers: z.record(z.array(z.string())).optional(),
      isbn_10: z.array(z.string()).optional(),
      isbn_13: z.array(z.string()).optional(),
      ocaid: z.string().optional(),
      languages: z.array(z.object({ key: z.string() })).optional(),
      covers: z.array(z.number()).optional(),
      latest_revision: z.number(),
      revision: z.number().optional(),
      created: z.object({ type: z.string(), value: z.string() }),
      last_modified: z.object({ type: z.string(), value: z.string() }),
    }),
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

export const collections = { projects, readings, writings };
