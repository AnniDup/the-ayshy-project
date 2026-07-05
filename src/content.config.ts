import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    image: image(),
    tags: z.array(z.string()).default([]),
    domains: z.array(z.string()).default([]),
    date: z.date().optional(),
    view_type: z.enum(['dashboard', 'technical', 'glossary', 'standard']).optional(),
    status: z.enum(['active', 'resting', 'shelved', 'idea']),
    isDraft: z.boolean().default(false),
    placeholder: z.boolean().default(false),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: 'index.md', base: './src/content/changelog' }),
  schema: z.object({}),
});

export const collections = { projects, changelog };
