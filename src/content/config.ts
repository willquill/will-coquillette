import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }: { image: () => z.ZodType<any> }) =>
    z.object({
      title: z.string().max(80).min(10),
      description: z.string().max(220).min(110),
      hero: image().optional(),
      heroAlt: z.string().optional(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      tags: z.array(z.string()),
    }),
});

export const collections = {
  blog: blogCollection,
};
