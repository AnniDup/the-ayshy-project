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
    // Track the project lifecycle
    status: z.enum(['idea', 'in-progress', 'completed']),
    // Control whether the public can see the actual content page
    isDraft: z.boolean().default(false),
    // When true, all links to this project route to /soon regardless of any other state.
    // Toggle off when ready to expose the real page. Independent of isDraft.
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { projects };