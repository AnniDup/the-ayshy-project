import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "src/content/projects" }),
  schema: ({ image }: SchemaContext) => z.object({
    title: z.string(),
    description: z.string(),
    image: image(), 
    tags: z.array(z.string()),
    date: z.coerce.date().optional(),
    view_type: z.enum(['dashboard', 'technical', 'glossary']).optional(),
    status: z.enum(['idea', 'in-progress', 'completed']), 
    isDraft: z.boolean().default(false),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "src/content/docs" }),
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = { projects, docs };