// src/lib/utils.ts

import type { CollectionEntry } from 'astro:content';

/**
 * Resolves the correct link for a project entry.
 * URLs are now flat: /workshop/[slug] — domain never appears in the URL.
 * When placeholder: true, always routes to /soon.
 */
export function projectLink(entry: CollectionEntry<'projects'>): string {
  if (entry.data.placeholder) return '/soon';
  return `/workshop/${entry.id}`;
}
