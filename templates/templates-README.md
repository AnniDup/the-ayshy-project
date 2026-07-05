# Content Templates

Templates for new project entries. Copy the relevant file into
`src/content/projects/<domain>/<project-slug>/index.md` and fill it in.

| Template | `view_type` | Use for |
|----------|-------------|---------|
| `project-standard.md` | *(none)* | General writeups, adventure maps, freeform notes about a project |
| `project-dashboard.md` | `dashboard` | Tracked work with tasks, roadmap, running notes |
| `project-technical.md` | `technical` | Builds, code projects, setups with stack/architecture info |
| `project-glossary.md` | `glossary` | Reference collections, terminology, game mechanic guides |

## Key fields to set when creating a new entry

```
placeholder: true    → links to /soon, real page is hidden
placeholder: false   → real content page is live and linked

isDraft: true        → content is not ready (separate from routing)
isDraft: false       → content is considered ready

status: active   → currently being worked on (shows in /workshop)
status: resting  → stepping back temporarily (shows in /workshop)
status: shelved  → deprioritised but not abandoned (shows in /workshop)
status: idea     → future potential, not started (shows in /incubation)
```

`placeholder` and `isDraft` are independent. You can have a live page that's
still a draft (showing WIP content), or a placeholder on something that's
fully written but you want to keep hidden while reworking the layout.

## Folder structure for a new project

```
src/content/projects/
  <domain>/
    <project-slug>/
      index.md          ← your content file (copied from a template above)
      assets/
        thumbnail.jpg   ← card thumbnail image
```
