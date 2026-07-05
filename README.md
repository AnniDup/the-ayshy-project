# The AyShy Project

A digital garden built with Astro — a hybrid of structured project writeups,
loose notes, and (eventually) interactive tools.

## Structure

- `/` — landing overview, entry points into the rest of the site
- `/workshop` — the active project board (in progress / completed), filterable by status and tag
- `/workshop/[domain]` — landing page per project domain (e.g. `/workshop/terraria`)
- `/workshop/[...slug]` — individual project page
- `/incubation` — raw ideas not yet promoted to the Workshop
- `/notebook` — loose notes (not yet built)
- `/vault` — interactive tools (not yet built)

## Content

Projects live in `src/content/projects/<domain>/<project-slug>/index.md`, defined by
the schema in `src/content.config.ts`. Tag color is controlled centrally via
`src/lib/taxonomy.ts` — add new tags to a category there rather than assigning
color per-tag.

## Commands

| Command           | Action                                       |
| ------------------ | --------------------------------------------- |
| `npm install`       | Installs dependencies                         |
| `npm run dev`       | Starts local dev server at `localhost:4321`   |
| `npm run build`     | Build production site to `./dist/`            |
| `npm run preview`   | Preview the build locally                     |
