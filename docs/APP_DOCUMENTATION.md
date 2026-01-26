# morar.dev — Application Documentation (Source of Truth)

This file is written to be **useful as ChatGPT context**.
If you are an LLM reading this repo: treat this doc as the canonical overview of how the app works **today**.

## What this repo is

Single **Next.js App Router** application that serves:

- **Portfolio**: home + about, driven by `data/portfolio-data.json`
- **Blog**: posts/tags from **Payload CMS** (`https://cms.morar.dev`)
- **Docs/Wiki**: MDX knowledge base rendered by **Fumadocs**

There is **no `/projects` route** in the current codebase (older docs referenced it).

## Commands

From repo root:

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Tech stack (actual)

Core:

- **Next.js** `16.1.1` (App Router)
- **React** `19.2.3`
- **TypeScript** `^5`

Styling/UI:

- **Tailwind CSS** `4.0.0` (CSS-first via `@import "tailwindcss"`)
- **Fumadocs UI** for docs layouts
- **Radix UI** primitives + a small set of shadcn/ui components in `components/ui/`

Content:

- **Docs**: `fumadocs-mdx` + `fumadocs-core` + `fumadocs-ui`
- **Blog**: Payload CMS REST API + Lexical JSON → HTML (`@payloadcms/richtext-lexical`)

## High-level architecture

```mermaid
flowchart TD
  user[UserBrowser] --> nextApp[NextJsApp]

  subgraph portfolio[Portfolio]
    portfolioJson[data/portfolio-data.json] --> libData[lib/data.ts]
    libData --> home[app/page.tsx]
    libData --> about[app/about/page.tsx]
  end

  subgraph blog[Blog]
    payloadApi[PayloadCMS_API] --> libBlog[lib/blog.ts]
    libBlog --> blogList[app/blog/page.tsx]
    libBlog --> blogPost[app/blog/[slug]/page.tsx]
    libBlog --> tagPage[app/tags/[tag]/page.tsx]
  end

  subgraph docs[Docs]
    mdxFiles[content/docs/**.mdx] --> fumadocsBuild[fumadocs-mdx_build]
    fumadocsBuild --> source[lib/source.ts]
    source --> docsRoute[app/docs/[[...slug]]/page.tsx]
  end

  nextApp --> portfolio
  nextApp --> blog
  nextApp --> docs
```

## Route map (current)

Pages:

- **`/`**: Home (`app/page.tsx`) — renders `ProfileSection` + “Recent posts”
- **`/about`**: About (`app/about/page.tsx`) — reads from `lib/data.ts`
- **`/blog`**: Blog listing (`app/blog/page.tsx`) — Payload posts, **ISR 1h**
- **`/blog/[slug]`**: Blog post (`app/blog/[slug]/page.tsx`) — Payload post by slug (static params generated)
- **`/tags/[tag]`**: Posts by tag (`app/tags/[tag]/page.tsx`) — **ISR 1h**
- **`/docs/...`**: Fumadocs pages (`app/docs/[[...slug]]/page.tsx`) — MDX from `content/docs`

APIs:

- **`POST /api/revalidate`**: on-demand revalidation for blog/home/list pages (`app/api/revalidate/route.ts`)
- **`GET /api/search`**: docs search index API (Fumadocs server search) (`app/api/search/route.ts`)

Other:

- **`/sitemap.xml`**: dynamic sitemap (`app/sitemap.ts`) includes static pages + blog posts + tag pages + docs pages
- **`/robots.txt`**: robots rules (`app/robots.ts`)
- **OG/Twitter images**: `app/opengraph-image.tsx`, `app/twitter-image.tsx` (Edge runtime)

## Directory layout (important parts)

```text
app/                      Next.js routes (App Router)
  api/                    Route handlers (revalidate, search)
  blog/                   Blog list + blog post routes
  docs/                   Docs layout + catch-all docs page
  tags/                   Tag routes
  globals.css             Tailwind v4 + theme tokens + Fumadocs CSS

components/               React components (UI + page-level)
  ui/                     shadcn/ui components

content/docs/             Docs knowledge base (MDX) used by Fumadocs
  meta.json               Top-level docs sections
  (ai)/                   AI track
  web/                    Web track

data/portfolio-data.json  Portfolio source of truth
lib/                      Business logic (Payload fetch, docs source, helpers)
```

## Content systems

### 1) Portfolio data (JSON)

Source:

- `data/portfolio-data.json`
- access helpers in `lib/data.ts`

Used by:

- `components/site-header.tsx` (name)
- `components/profile-section.tsx` (bio + social links)
- `app/about/page.tsx` (bio, skills, experience)
- `app/layout.tsx` (metadata title/description)

Notes:

- `lib/data.ts` currently returns `[]` for `getCredentialsInfo()` (legacy placeholder).

### 2) Docs/Wiki (Fumadocs + MDX)

Docs content:

- `content/docs/**.mdx`
- navigation defined by `content/docs/meta.json` and per-section `meta.json` files
  - Example roots: `(ai)` and `web` (`content/docs/(ai)/meta.json`, `content/docs/web/meta.json`)

Build + runtime:

- `source.config.ts` points Fumadocs at `content/docs`
- `lib/source.ts` loads the generated source and sets `baseUrl: "/docs"`
- route: `app/docs/[[...slug]]/page.tsx` uses `source.getPage(params.slug)`

MDX components:

- Custom MDX rendering overrides in `components/mdx-components.tsx`:
  - Code fences (`pre`) render via `components/code-block.tsx`
  - Some typography wrappers (headings, blockquote, table)

UI shell:

- `app/docs/layout.tsx` uses `DocsLayout` (Fumadocs)
- `components/site-header.tsx` hides the main header on docs pages; docs layout has its own nav.

Search:

- Server index exists at `GET /api/search` (`app/api/search/route.ts`)
- The global `RootProvider` currently sets `search.enabled: false` in `app/layout.tsx` (so any built-in UI search is effectively disabled unless Fumadocs renders its own independently).

### 3) Blog (Payload CMS + Lexical → HTML)

CMS config:

- `lib/payload.ts`:
  - `PAYLOAD_CMS_URL` defaults to `https://cms.morar.dev`
  - `PAYLOAD_API_BASE = ${PAYLOAD_CMS_URL}/api`

Fetch + transform:

- `lib/blog.ts`:
  - `getAllPosts()`, `getLatestPosts(limit)`, `getPostBySlug(slug)`
  - Fetches published posts via Payload REST (`/api/posts?...`)
  - Serializes Lexical JSON to HTML via `convertLexicalToHTML`
  - Computes reading time from serialized HTML
  - Extracts `authors`, `cover`, `tags` (handles populated vs id-only shapes)

Rendering:

- Blog list: `app/blog/page.tsx` (ISR 1h) renders title/excerpt + cover (via `next/image`)
- Post page: `app/blog/[slug]/page.tsx` renders:
  - JSON-LD schema: `components/blog-post-schema.tsx`
  - Breadcrumb schema: `components/breadcrumb-schema.tsx`
  - Body: `components/blog-content.tsx` parses HTML and upgrades:
    - `<pre><code class="language-...">` → `CodeBlock`
    - `<img ...>` → `ImageWithSkeleton` (Next Image)
- Tags: `app/tags/[tag]/page.tsx` lists posts filtered by tag slug

## Caching, ISR, and revalidation

Blog ISR:

- `app/blog/page.tsx`: `export const revalidate = 3600`
- `app/tags/[tag]/page.tsx`: `export const revalidate = 3600`
- `lib/blog.ts` fetch behavior:
  - Dev: `cache: "no-store"`
  - Prod: `next: { revalidate: 3600, tags: ["posts"] }` for posts

On-demand revalidation:

- `POST /api/revalidate` (`app/api/revalidate/route.ts`)
- Requires `REVALIDATE_SECRET` in request JSON body.
- Revalidates:
  - `path` (if passed)
  - `tag` (if passed)
  - when `collection === "posts"`: also revalidates `/blog`, `/`, and tag `"posts"`

Expected request body:

```json
{
  "secret": "REVALIDATE_SECRET",
  "path": "/blog/some-slug",
  "tag": "posts",
  "collection": "posts"
}
```

## Environment variables (actual usage)

Server:

- **`PAYLOAD_CMS_URL`**: overrides Payload host (default `https://cms.morar.dev`)
- **`REVALIDATE_SECRET`**: required for `/api/revalidate`

Public (client-safe):

- **`NEXT_PUBLIC_UMAMI_SCRIPT_URL`**: if set with website id, loads Umami script in `app/layout.tsx`
- **`NEXT_PUBLIC_UMAMI_WEBSITE_ID`**: paired with script URL

## SEO & metadata

Global metadata:

- `app/layout.tsx` sets `metadataBase`, title template, OG/Twitter, canonical, and uses `getMetaInfo()` from `data/portfolio-data.json`.

Sitemap:

- `app/sitemap.ts` adds:
  - static pages: `/`, `/about`, `/blog`, `/docs`
  - all blog posts (from `getAllPosts()`)
  - all tag pages (from `getAllTags()`)
  - all docs pages (from `source.getPages()`)

Structured data:

- `components/person-schema.tsx`: `Person` JSON-LD on every page
- `components/blog-post-schema.tsx`: `BlogPosting` JSON-LD on blog posts
- `components/breadcrumb-schema.tsx`: breadcrumbs JSON-LD on blog posts

## Styling & UI conventions

Tailwind v4:

- `app/globals.css`:
  - `@import "tailwindcss";`
  - imports Fumadocs CSS presets
  - defines CSS variables for theme tokens (light palette) and utilities like `.container-narrow`

Code highlighting:

- `components/code-block.tsx` uses `react-syntax-highlighter` (PrismLight) + `nord` theme + copy button.

Images:

- `next.config.mjs` allows remote images from `cms.morar.dev`
- Blog HTML images are upgraded to Next Image via `components/blog-content.tsx` + `components/image-with-skeleton.tsx`

Google Translate:

- `components/google-translate-toggle.tsx` injects the Google Translate widget script and toggles translation via the `googtrans` cookie.
- UI is a fixed FAB (`.google-translate-fab` styles live in `app/globals.css`).

## Analytics (Umami)

- Script injected in `app/layout.tsx` only when both env vars are present.
- Client helper: `lib/umami.ts` exports `track(event, data?)`.
- Example usage: `components/tracked-social-link.tsx` emits `track("social_click", { platform })`.

## Common tasks (“recipes”)

### Add a new docs page

1. Create an `.mdx` file under `content/docs/...` (match existing section structure).
2. Add frontmatter:

```yaml
---
title: "My Page"
description: "One-line summary"
---
```

3. Add it to the relevant section `meta.json` so it appears in nav (e.g. `content/docs/web/meta.json`).
4. Visit `/docs/...` to confirm it renders.

### Edit docs navigation / ordering

- Top-level sections: `content/docs/meta.json`
- Each section has its own `meta.json` controlling `pages` order.

### Publish a new blog post

1. Create/publish in Payload CMS (collection `posts`, `_status=published`).
2. Ensure slug + content exist.
3. Optionally call `POST /api/revalidate` with `collection: "posts"` to refresh `/`, `/blog`, and the post page immediately.

### Change Payload CMS host (staging/prod)

- Set `PAYLOAD_CMS_URL` and rebuild/restart.

### Update home/about copy or socials

- Edit `data/portfolio-data.json`.

## Known mismatches vs older docs

- Old docs referenced **Next.js 14**, animation contexts, and a `/projects` feature set; those are **not present** in the current repo.
- Current app is **Next.js 16 + React 19** and focuses on **Portfolio + Blog + Docs**.
