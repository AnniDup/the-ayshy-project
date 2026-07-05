// src/lib/utils.ts

import type { CollectionEntry } from 'astro:content';

/**
 * Resolves the correct link for a project entry.
 *
 * When `placeholder: true` is set in the project's frontmatter, this always
 * returns `/soon` — regardless of status, isDraft, or anything else.
 * Toggle `placeholder` to false in the frontmatter when you're ready to
 * expose the real content page.
 *
 * Use this everywhere a project link is computed (index, workshop, incubation,
 * domain pages, sidebar) so routing behaviour stays consistent site-wide.
 */
export function projectLink(entry: CollectionEntry<'projects'>): string {
  if (entry.data.placeholder) return '/soon';
  return `/workshop/${entry.id.replace(/\/index$/, '')}`;
}
