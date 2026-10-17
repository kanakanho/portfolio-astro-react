import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { POST_DIR, toPostImagePath } from "@/utils/PostImages.mjs";

const post = defineCollection({
  loader: glob({ pattern: "**/*.md", base: POST_DIR }),
  schema: ({ image }) => {
    const postImage = () =>
      z.preprocess(
        (value) => toPostImagePath(typeof value === "string" ? value : undefined),
        z
          .union([
            z.preprocess(
              (value) => (typeof value === "string" && /^\.\.?\//.test(value) ? value : null),
              image(),
            ),
            z.string(),
          ])
          .optional(),
      );

    return z.object({
      isActive: z.boolean(),
      number: z.number().transform((num) => num.toString()),
      title: z.string(),
      date: z.string(),
      tags: z.array(z.string()),
      options: z
        .object({
          description: z
            .string()
            .optional()
            .nullable()
            .transform((val) => val ?? undefined),
          repository: z
            .string()
            .optional()
            .nullable()
            .transform((val) => val ?? undefined),
          youtube: z
            .string()
            .optional()
            .nullable()
            .transform((val) => val ?? undefined),
          website: z
            .string()
            .optional()
            .nullable()
            .transform((val) => val ?? undefined),
          image: postImage(),
        })
        .optional(),
      works: z
        .object({
          worksDisplay: z.boolean().optional().nullable(),
          worksTitle: z
            .string()
            .optional()
            .nullable()
            .transform((val) => val ?? undefined),
          worksDescription: z
            .string()
            .optional()
            .nullable()
            .transform((val) => val ?? undefined),
          worksImage: postImage(),
        })
        .optional(),
    });
  },
});
export const collections = { post };
