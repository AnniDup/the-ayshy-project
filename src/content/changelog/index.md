# Release Log

## v0.1.1 — 2026-07-05 — IA Restructure & Design Refinements

### Structure
- Flattened content collection — projects moved from nested domain folders to flat `src/content/projects/<slug>/` structure
- Domain membership now declared via `domains: []` frontmatter array — projects can belong to multiple domains simultaneously
- Domains defined as a controlled list in `taxonomy.ts` — adding or renaming a domain updates everywhere automatically
- Migrated to Astro 6 Content Layer API using `glob()` loader — resolves silent collection failure on v6
- Top-level navigation simplified to three items: Landing, Workshop, Notebook
- Removed Vault and Incubation as top-level pages — idea-status projects tracked within Workshop
- Added `/releases` page driven by plain markdown changelog — no code edits needed to log changes
- Added `changelog` content collection at `src/content/changelog/index.md`
- Sidebar footer added with Release Log and GitHub icon links

### Domains
- Renamed and restructured domain taxonomy to: Fallout 4, Terraria, Oxygen Not Included, Digital Stack, Data & Information Design, Tabletop, FAITH Core
- Domains are now filters over the project collection, not physical folder containers
- Domain pages (`/workshop/[domain]`) generated dynamically from taxonomy — URL is permanent regardless of domain label changes
- Sidebar hides domains with no assigned projects

### Navigation
- Sidebar accordion rebuilt — Workshop and each domain independently collapsible
- Clicking a domain label navigates to the domain page AND opens its project list, closing other open domains
- Clicking the `▾` chevron toggles collapse without navigating
- Fixed sidebar flash on load — panels hidden via CSS before JS runs, avoiding flicker
- Fixed panel toggle bug where `getComputedStyle` was needed instead of inline style check
- Active domain panel stays open when navigating into a child project page
- Domains with zero projects hidden from sidebar entirely

### Cards
- Project cards redesigned — title is now the dominant element on the text side
- Domain label added above title as a quiet breadcrumb (muted, not gold)
- Tags on project cards changed to neutral colour — no category colouring on cards
- Status colours updated: Active → teal, Resting → amber, Shelved → red, Idea → gray
- Status badge remains top-right, portrait image remains dominant left column
- Fixed card grid to three columns across all pages
- Card height fixed — text clamped to prevent variable-height cards

### Landing Page
- Two full-width entry cards (Workshop / Notebook) spanning the top
- Domain chips replaced with full domain stat cards — each shows project count, status breakdown bar, per-status dot rows, and most recently touched project
- Domain cards highlight on hover with green top-edge accent and slide-in arrow
- One-liner updated: "A growing collection of projects and half-finished ideas to keep the boredom at bay."
- Recently Updated section retained as a bottom widget showing three most recent projects
- Featured gold border removed — all cards use neutral border with green hover

### Content
- Added project: Data Governance Journey (domain: Data & Information Design)
- Added tag: IED (Information Experience Design)
- Status vocabulary formalised: active / resting / shelved / idea
- `placeholder: true` frontmatter field introduced — independent of `isDraft`, controls routing to `/soon`
- `/soon` page restyled with design tokens, retained as site-wide placeholder destination

---

## v0.1.0 — 2026-07-05 — Foundation Rebuild

### Design
- New design token system — graphite-black base, green as primary, rust and gold as accents
- Space Grotesk (display), Inter (body), IBM Plex Mono (tags/metadata) type stack
- Sidebar with hexagonal mark, active left-border highlight, domain navigation
- Portrait-left project cards with status badge, tag colour taxonomy
- `/soon` placeholder page styled and wired as site-wide fallback

### Structure
- Consolidated `global.css` — single token system replacing competing earthy and terminal themes
- `src/lib/taxonomy.ts` introduced as single source of truth for tag category and colour mapping
- `src/lib/utils.ts` introduced with `projectLink()` — all links routed through one function
- `placeholder` field added to content schema for routing control independent of draft state
- Proper dedicated pages for all routes — no generic placeholders
- Removed deprecated `DEPRStatusFilterBar.astro` and `DEPRTagFilterBar.astro`
- Fixed `status.toLowerCase()` bug in ProjectCard

### Pages
- `/` — landing overview with entry points and recently updated projects
- `/workshop` — full project board with status and tag filtering
- `/workshop/[domain]` — per-domain filtered view
- `/workshop/[...slug]` — individual project pages with breadcrumb and status banner
- `/incubation` — idea-status projects (later removed as top-level in v0.1.1)
- `/notebook` and `/vault` — dedicated placeholder pages
- `Layout.astro` rebuilt with proper meta, title, favicon, and Google Fonts

### Config
- `astro.config.mjs` configured with `site` for GitHub Pages
- `tsconfig.json` updated with `@lib` and `@components` path aliases
- `README.md` replaced with real project documentation
- Content templates added to `/templates` folder for all four view types

---

## v0.0.1 — 2026-06-08 — Initial Scaffold

- Initial Astro project scaffolded and deployed to GitHub Pages
- Basic content collection schema for projects
- First project entries across Fallout 4, Terraria, Oxygen Not Included, Digital Stack
- Sidebar, ProjectCard, FilterToolbar components from initial scaffold
