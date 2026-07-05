// src/lib/taxonomy.ts
//
// Controlled tag taxonomy. Tags map to a *category*, and categories map to a
// color. This keeps tag color meaningful (same kind of thing = same color
// everywhere) instead of being assigned per-tag, which would drift over time.
//
// To add a new tag: assign it to one of the existing categories below.
// To add a new category: add it to TAG_CATEGORIES and give it a color class
// in the .card-tag.tag-* rules in ProjectCard.astro.

export type TagCategory = 'medium' | 'franchise' | 'mechanic' | 'platform' | 'other';

const CATEGORY_MAP: Record<string, TagCategory> = {
  // medium — what kind of thing this fundamentally is
  'games': 'medium',
  'web': 'medium',

  // franchise — the IP/series/world it belongs to
  'terraria': 'franchise',
  'fallout 4': 'franchise',
  'oxygen not included': 'franchise',

  // mechanic — genre, system, or technique involved
  'sim': 'mechanic',

  // platform — the stack/tooling/output format
  'digital stack': 'platform',
  'astro': 'platform',
};

const CATEGORY_CLASS: Record<TagCategory, string> = {
  medium: 'tag-rust',
  franchise: 'tag-gold',
  mechanic: 'tag-green',
  platform: 'tag-sky',
  other: 'tag-neutral',
};

export function getTagCategory(tag: string): TagCategory {
  return CATEGORY_MAP[tag.toLowerCase()] ?? 'other';
}

export function getTagColorClass(tag: string): string {
  return CATEGORY_CLASS[getTagCategory(tag)];
}
