import { defineCollection, z } from "astro:content";

const post = defineCollection({
  type: "content",
  schema: z.object({
    isActive: z.boolean(),
    number: z.number().transform((num) => num.toString()),
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    options: z
      .object({
        description: z.string().optional().nullable().transform((val) => val ?? undefined),
        repository: z.string().optional().nullable().transform((val) => val ?? undefined),
        youtube: z.string().optional().nullable().transform((val) => val ?? undefined),
        website: z.string().optional().nullable().transform((val) => val ?? undefined),
        image: z.string().optional().nullable().transform((val) => val ?? undefined),
      })
      .optional(),
    works: z
      .object({
        worksDisplay: z.boolean().optional().nullable(),
        worksTitle: z.string().optional().nullable().transform((val) => val ?? undefined),
        worksDescription: z.string().optional().nullable().transform((val) => val ?? undefined),
        worksImage: z.string().optional().nullable().transform((val) => val ?? undefined),
      })
      .optional(),
  }),
});
export const collections = { post };
