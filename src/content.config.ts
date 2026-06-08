// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: "./src/content/projects" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    image: image(), 
    tags: z.array(z.string()),
    date: z.coerce.date().optional(),
    view_type: z.enum(['dashboard', 'technical', 'glossary']).optional(),
  }),
});

export const collections = { projects };