---
title: "4"
order: 2
---

# 🛠️ Component Filter Toolbar

This is where your actual markdown content, text, and code snippets go...

# Projects Dashboard — Component & Page Documentation

> **Who this is for:** This guide is written for someone with basic knowledge of HTML and a little Astro. If you're experienced, you can skim the concept boxes and go straight to the code. If you're newer to this, read everything — the "What's happening here" sections explain the *why*, not just the *what*.

---

## Overview

The projects dashboard is made up of three files that work together:

| File | What it is | What it does |
|---|---|---|
| `src/pages/index.astro` | A **page** | Fetches all your projects and renders the dashboard |
| `src/components/ProjectCard.astro` | A **component** | Displays a single project as a clickable card |
| `src/components/FilterToolbar.astro` | A **component** | Renders the Status and Tags filter buttons |

The page is the conductor. It gets your data and passes it down to the two components. The components don't fetch anything themselves — they just receive what the page gives them and display it.

```
index.astro (page)
├── Layout (your site wrapper)
├── FilterToolbar (receives: statuses[], tags[])
└── ProjectCard × N (receives: title, description, link, image, tags[], status)
```

---

## The Content Collection Contract

Before looking at the components, it helps to understand what shape your project data needs to be in. The page uses `getCollection('projects')`, which means Astro expects a folder at `src/content/projects/` with one entry per project.

Each project entry's frontmatter must include these fields:

```yaml
# src/content/projects/my-project/index.md
---
title: "My Project Name"
description: "A short sentence describing what this is."
status: "in-progress"       # used by the filter and badge
image: "./cover.webp"       # a local image file next to this .md file
tags:
  - design
  - coding
---
```

> **Why local images?** Astro's `<Image />` component (used in `ProjectCard`) requires imported local images or `ImageMetadata` objects — it can't accept a plain string URL directly. Keeping images next to their content entry is a clean pattern.

**Allowed status values** (you define these yourself, but be consistent):

- `active`
- `in-progress`
- `complete`
- `on-hold`
- `archived`

Whatever string you use here will appear as the badge label on the card, and as a filter button in the toolbar. Casing: the code lowercases everything, so `In-Progress` and `in-progress` are treated the same.

---

## `index.astro` — The Dashboard Page

**Location:** `src/pages/index.astro`

### What it does

1. Fetches every entry from your `projects` content collection
2. Extracts a deduplicated, sorted list of all tags across all projects
3. Extracts a deduplicated, sorted list of all statuses across all projects
4. Passes those lists to `<FilterToolbar>`
5. Renders a `<ProjectCard>` for every project

### The code, explained

```astro
const allProjects = await getCollection('projects');
```
This line loads every `.md` (or `.mdx`) file from `src/content/projects/`. The result is an array of collection entries. Each entry has an `id` and a `data` object containing your frontmatter fields.

```astro
const allTags = Array.from(
  new Set(allProjects.flatMap(p => p.data.tags || []))
).sort();
```
This builds a list of every unique tag used across all projects, sorted alphabetically. `flatMap` pulls all the tag arrays into one flat list. `new Set(...)` removes duplicates. `Array.from(...)` converts it back to a regular array. The `|| []` is a safety net for projects that have no tags at all.

```astro
const allStatuses = Array.from(
  new Set(allProjects.map(p => p.data.status.toLowerCase()))
).sort();
```
Same pattern as above, but for status values. `.toLowerCase()` normalises them so `Active` and `active` don't appear as two separate buttons.

```astro
link={`/workshop/${project.id.replace(/\/index$/, '')}`}
```
This builds the URL for each project card. If your project lives at `src/content/projects/my-project/index.md`, Astro gives it an `id` of `my-project/index`. The `.replace(/\/index$/, '')` strips that trailing `/index` so the link becomes `/workshop/my-project` — clean and readable.

### Layout

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 450px));
  gap: 1.5rem;
}
```
`auto-fit` with `minmax` means the grid will fit as many columns as it can at a minimum width of 400px, up to 450px each. On a wide screen you get multiple columns; on mobile the cards stack into a single column automatically.

---

## `ProjectCard.astro` — The Project Card Component

**Location:** `src/components/ProjectCard.astro`

### Props (what you pass in)

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | ✅ | The project name. Displayed in uppercase. |
| `description` | `string` | ✅ | A short summary shown below the title. |
| `link` | `string` | ✅ | The URL the whole card links to. |
| `image` | `ImageMetadata` | ✅ | A local image imported via Astro's content collection. |
| `tags` | `string[]` | ✅ | An array of tag strings to display at the bottom of the card. |
| `status` | `string` | ✅ | A status string (e.g. `"active"`, `"in-progress"`). |

### How to use it

You normally won't use this component directly on a page — the `index.astro` page renders it in a loop. But if you ever want to add a card manually, the syntax is:

```astro
---
import ProjectCard from '@components/ProjectCard.astro';
import myImage from '../assets/my-project-cover.webp';
---

<ProjectCard
  title="My Project"
  description="A short description of what this project is."
  link="/workshop/my-project"
  image={myImage}
  tags={["design", "coding"]}
  status="active"
/>
```

### Structure

The card renders as an `<a>` tag — the whole card is the link. Inside it are two sections side by side:

```
┌─────────────────────────────────────┐
│  [120px]   │  Card body             │
│  Image     │  TITLE                 │
│  [badge]   │  Description text      │
│            │  #tag1  #tag2          │
└─────────────────────────────────────┘
```

### The status badge

The badge is positioned absolutely over the top-left corner of the image. It gets its text directly from the `status` prop, and it also gets a CSS class of the same name (e.g. `class="card-status-badge active"`). This means you can style each status differently in your global CSS:

```css
/* In your global stylesheet */
.card-status-badge.active        { background: #10b981; color: white; }
.card-status-badge.in-progress   { background: #f59e0b; color: white; }
.card-status-badge.complete      { background: #6b7280; color: white; }
.card-status-badge.on-hold       { background: #ef4444; color: white; }
```

> **Note:** The badge styling is intentionally *not* defined inside the component — this keeps the component flexible and lets your global theme control the colours.

### The data attributes (how filtering works)

Two important HTML attributes are added to the card's `<a>` element:

```html
<a
  data-tags="design,coding"
  data-project-status="active"
  ...
>
```

These are invisible to the user but are read by the `FilterToolbar`'s JavaScript to decide which cards to show or hide. **This is the link between the two components.** If you change these attribute names in `ProjectCard`, you must update the matching `getAttribute` calls in `FilterToolbar`.

### Known issue to be aware of

In the current code, there is a small bug on this line:

```astro
<a href={link} class={`project-card status-${status.toLowerCase}`} ...>
```

`status.toLowerCase` should be `status.toLowerCase()` — with parentheses, because `toLowerCase` is a function that needs to be called. Without the parentheses, the class name will render as `status-function toLowerCase() { [native code] }` instead of e.g. `status-active`. This doesn't break filtering (which uses `data-project-status`), but it may affect any CSS you write targeting `.status-active` etc.

**Fix:**
```astro
<a href={link} class={`project-card status-${status.toLowerCase()}`} ...>
```

---

## `FilterToolbar.astro` — The Filter Toolbar Component

**Location:** `src/components/FilterToolbar.astro`

### Props (what you pass in)

| Prop | Type | Required | Description |
|---|---|---|---|
| `statuses` | `string[]` | ✅ | List of status values to show as filter buttons. |
| `tags` | `string[]` | ✅ | List of tags to show as filter buttons. |

Both arrays are generated dynamically by `index.astro` from your actual content — you never need to maintain them by hand.

### How to use it

```astro
<FilterToolbar statuses={allStatuses} tags={allTags} />
```

That's it. Everything else — the buttons, the click logic, the show/hide behaviour — is self-contained inside the component.

### What it renders

Two rows of buttons, each with an "All" button that resets that row's filter:

```
Status:  [ All ]  [ active ]  [ in-progress ]  [ complete ]
Tags:    [ All ]  [ #design ]  [ #coding ]  [ #tools ]
```

### How the filtering works (plain-English)

The filtering is handled entirely in the browser using vanilla JavaScript (no frameworks). Here's the logic step by step:

1. When the page loads, both active filters are set to `"all"`.
2. When you click a Status button, it records the new active status and calls `applyFilters()`.
3. When you click a Tag button, same thing for the active tag.
4. `applyFilters()` loops through every element on the page that has a `data-tags` attribute (i.e. every `ProjectCard`).
5. For each card, it checks:
   - Does `data-project-status` match the active status? (or is the filter `"all"`?)
   - Does the comma-separated `data-tags` list include the active tag? (or is the filter `"all"`?)
6. If both match → remove the `is-hidden` class → card is visible.
7. If either doesn't match → add the `is-hidden` class → card disappears.

```
               ┌─ activeStatus = "all"? ──── always match
Click status ──┤
               └─ activeStatus = "active"? ─ match cards where data-project-status="active"

               ┌─ activeTag = "all"? ──────── always match
Click tag ─────┤
               └─ activeTag = "coding"? ───── match cards where data-tags includes "coding"

Both must match for a card to be visible.
```

### The Astro script boundary

One important thing to understand about Astro: the frontmatter (the `---` block at the top) runs on the **server** at build time. The `<script>` tag runs in the **browser** at runtime. They cannot share variables directly.

That's why the filter state (`activeStatus`, `activeTag`) lives inside the `<script>` tag and uses `document.querySelectorAll` to find elements — it's reading from the DOM, not from the props.

```astro
---
// 🏗️ This runs at BUILD TIME (server)
const { statuses, tags } = Astro.props;  // ✅ Props are available here
---

<script>
  // 🌐 This runs in the BROWSER at runtime
  // ❌ You cannot access `statuses` or `tags` here directly
  // ✅ You read state from the DOM instead
  const cards = document.querySelectorAll('[data-tags]');
</script>
```

### Styling and CSS variables

The toolbar uses CSS custom properties (variables) for its colours. These are expected to be defined in your global stylesheet:

| Variable | Used for |
|---|---|
| `--accent-sand` | Button border colour and bottom divider line |
| `--text-muted` | Row labels and default button text |
| `--surface-color` | Button background on hover/active |
| `--accent-blue` | Active/hovered Status buttons (fallback: `#3b82f6`) |
| `--accent-green` | Active/hovered Tag buttons (fallback: `#10b981`) |

The fallback values (e.g. `var(--accent-blue, #3b82f6)`) mean the component won't break visually if a variable is missing — it'll use the hardcoded colour instead. But for a consistent look, define these in your global CSS.

---

## How the three files work together at a glance

```
Build time (server):
  index.astro
    → getCollection('projects')       fetches all project data
    → extracts allTags, allStatuses   builds the filter lists
    → passes to FilterToolbar         toolbar renders correct buttons
    → maps projects to ProjectCards   each card gets its data attributes

Runtime (browser):
  User clicks a filter button
    → FilterToolbar JS updates activeStatus or activeTag
    → applyFilters() loops over all [data-tags] elements
    → Adds/removes .is-hidden on each ProjectCard
    → Cards appear/disappear instantly (no page reload)
```

---

## Expanding the components

### Adding a new status value

Just add it to your project's frontmatter. The toolbar and card will pick it up automatically because everything is derived from your content collection.

```yaml
status: "prototype"  # New! No code changes needed.
```

Then add a badge colour for it in your global CSS:

```css
.card-status-badge.prototype { background: #8b5cf6; color: white; }
```

### Adding a "reset all filters" button

In `FilterToolbar.astro`, add a button and a handler:

```html
<!-- In the template -->
<button id="reset-btn">Reset filters</button>
```

```js
// In the <script> tag
document.getElementById('reset-btn').addEventListener('click', () => {
  activeStatus = 'all';
  activeTag = 'all';
  statusButtons.forEach(b => b.classList.toggle('active', b.dataset.statusFilter === 'all'));
  tagButtons.forEach(b => b.classList.toggle('active', b.dataset.tagFilter === 'all'));
  applyFilters();
});
```

### Showing a "no results" message

After `applyFilters()`, add a check:

```js
function applyFilters() {
  // ...existing filter logic...

  const visible = [...cards].filter(c => !c.classList.contains('is-hidden'));
  const empty = document.getElementById('no-results');
  if (empty) empty.style.display = visible.length === 0 ? 'block' : 'none';
}
```

And add to your page markup:

```html
<p id="no-results" style="display:none">No projects match these filters.</p>
```

---

## Quick reference — Props summary

### `<ProjectCard />`
```
title        string       Project name
description  string       Short summary
link         string       URL for the card link
image        ImageMetadata  Local image (from content collection)
tags         string[]     Array of tag strings
status       string       Status label (e.g. "active", "in-progress")
```

### `<FilterToolbar />`
```
statuses     string[]     List of status values (usually from getCollection)
tags         string[]     List of tag values (usually from getCollection)
```