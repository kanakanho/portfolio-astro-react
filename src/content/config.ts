import { defineCollection, z } from "astro:content";
import { toPostImagePath } from "@/utils/PostImages.mjs";

const post = defineCollection({
  type: "content",
  schema: ({ image }) => {
    const postImage = () =>
      z
        .string()
        .nullish()
        .transform(toPostImagePath)
        .pipe(
          z
            .union([
              z
                .string()
                .regex(/^\.\.?\//)
                .pipe(image()),
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
