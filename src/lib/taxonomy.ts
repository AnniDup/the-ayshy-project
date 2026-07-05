// src/lib/taxonomy.ts
// Single source of truth for domains, tag categories, and colour mapping.

// ─── DOMAINS ────────────────────────────────────────────────────────────────
// Controlled list. Add new domains here — nowhere else.
// Projects declare membership via `domains: [...]` in frontmatter.
// Slug is used in the UI filter; label is what's displayed.

export const DOMAINS = [
  { slug: 'fallout-4',              label: 'Fallout 4' },
  { slug: 'terraria',               label: 'Terraria' },
  { slug: 'oxygen-not-included',    label: 'Oxygen Not Included' },
  { slug: 'digital-stack',          label: 'Digital Stack' },
  { slug: 'data-information-design',label: 'Data & Information Design' },
  { slug: 'tabletop',               label: 'Tabletop' },
  { slug: 'faith-core',             label: 'FAITH Core' },
] as const;

export type DomainSlug = typeof DOMAINS[number]['slug'];

export function getDomainLabel(slug: string): string {
  return DOMAINS.find(d => d.slug === slug)?.label ?? slug;
}

// ─── TAG CATEGORIES ─────────────────────────────────────────────────────────
// Tags provide broad context. Each tag maps to a category which maps to a
// colour. Add new tags by assigning them to an existing category.
// To add a new category: add it here AND add a .card-tag.tag-* rule in
// ProjectCard.astro.

export type TagCategory = 'medium' | 'franchise' | 'mechanic' | 'platform' | 'other';

const CATEGORY_MAP: Record<string, TagCategory> = {
  // medium — what kind of thing this fundamentally is
  'games':    'medium',
  'web':      'medium',
  'modding':  'medium',
  'tabletop': 'medium',

  // franchise — the IP/series/world it belongs to
  'terraria':             'franchise',
  'fallout 4':            'franchise',
  'oxygen not included':  'franchise',
  'oni':                  'franchise',
  'faith core':           'franchise',

  // mechanic — genre, system, or technique involved
  'sim':          'mechanic',
  'adventure':    'mechanic',
  'survival':     'mechanic',
  'rpg':          'mechanic',
  'homebrew':     'mechanic',
  'ied':          'mechanic',   // Information Experience Design

  // platform — the stack, tooling, or output format
  'digital stack':  'platform',
  'astro':          'platform',
  'git pages':      'platform',
  'online':         'platform',
  'html':           'platform',
  'unity':          'platform',
};

const CATEGORY_CLASS: Record<TagCategory, string> = {
  medium:   'tag-rust',
  franchise:'tag-gold',
  mechanic: 'tag-green',
  platform: 'tag-sky',
  other:    'tag-neutral',
};

export function getTagCategory(tag: string): TagCategory {
  return CATEGORY_MAP[tag.toLowerCase()] ?? 'other';
}

export function getTagColorClass(tag: string): string {
  return CATEGORY_CLASS[getTagCategory(tag)];
}
