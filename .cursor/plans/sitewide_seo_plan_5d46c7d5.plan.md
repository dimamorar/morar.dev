---
name: Sitewide SEO plan
overview: Audit and upgrade SEO for morar.dev (portfolio + blog + docs) with a focus on crawlability, indexation, rich snippets, and conversion paths from organic traffic.
todos:
  - id: seo-base-metadata
    content: Upgrade `app/layout.tsx` with `metadataBase`, title template, robots defaults, and canonical defaults for https://morar.dev
    status: pending
  - id: robots-route
    content: Add `app/robots.ts` that allows crawling and references the sitemap
    status: pending
  - id: sitemap-route
    content: Add `app/sitemap.ts` including static + blog + tags + projects + docs URLs
    status: pending
  - id: og-images
    content: Add OG/Twitter image strategy (default + blog post cover; optional generated OG route)
    status: pending
  - id: jsonld
    content: Add JSON-LD structured data (WebSite/Person sitewide; BlogPosting + BreadcrumbList on blog posts)
    status: pending
  - id: internal-linking
    content: Add internal linking blocks to blog/docs for topical clusters + conversion CTA
    status: pending
---

## Purpose & current posture

- **Site purpose**: personal brand hub for a Full Stack Engineer (hire-me intent) plus **blog** (thought leadership) and **docs** (evergreen long-tail acquisition).
- **Current strengths**:
- App Router with per-route `metadata` / `generateMetadata` on key pages.
- Content sources: Portfolio JSON, Blog (Payload CMS), Docs (Fumadocs MDX) — good for scalable pages.
- **Current gaps (high impact)**:
- No `robots.txt` and no `sitemap.xml` routes in `app/`.
- Root metadata is minimal (no `metadataBase`, no canonical, no OG image defaults, no robots policy).
- Blog post metadata missing `alternates.canonical`, `openGraph.url`, `openGraph.images`.
- Blog list/tag pages use `next/image` without consistent `sizes` and image skeleton component (not SEO, but performance/LCP).
- No structured data (Person + WebSite + BlogPosting + BreadcrumbList).

## Recommendations (prioritized)

## P0 — Must-have (crawl + index + correct canonicals)

- **Add canonical base + site defaults** in [`app/layout.tsx`](/Users/apple/Projects/5_morar.dev/app/layout.tsx):
- `metadataBase: new URL('https://morar.dev')`
- `alternates: { canonical: 'https://morar.dev' }` (or per-page canonicals)
- `robots` default: allow indexing, set `googleBot` hints.
- Set `title` to use a template (brand-consistent SERP titles).
- **Add `app/robots.ts`**:
- Allow all, reference sitemap.
- Disallow any private/admin paths if present.
- **Add `app/sitemap.ts`**:
- Include:
- Static routes: `/`, `/about`, `/blog`, `/projects`, `/docs`.
- Dynamic blog posts from [`lib/blog.ts`](/Users/apple/Projects/5_morar.dev/lib/blog.ts) via `getAllPostSlugs()`.
- Tag pages from `getAllTags()`.
- Docs pages from [`lib/source.ts`](/Users/apple/Projects/5_morar.dev/lib/source.ts) via `source.getPages()`.
- Project pages from [`lib/projects.ts`](/Users/apple/Projects/5_morar.dev/lib/projects.ts).
- Set `lastModified` where possible (blog: `updatedAt`, docs: build-time ok).

## P1 — Rich snippets & higher CTR

- **Structured data (JSON-LD)**
- Sitewide (in layout): `WebSite` + `Person` (Dmytro Morar) + `Organization` (optional).
- Blog posts: `BlogPosting` with `headline`, `datePublished`, `dateModified`, `author`, `image`, `mainEntityOfPage`.
- Docs pages: `Article` (or keep minimal; avoid misleading schema).
- Add `BreadcrumbList` for blog posts + docs pages.
- **OpenGraph/Twitter improvements**
- Add defaults in [`app/layout.tsx`](/Users/apple/Projects/5_morar.dev/app/layout.tsx) and override per page.
- Ensure blog posts include `openGraph.images` (cover image from CMS if available; otherwise a generated OG route).
- Add `openGraph.url` and `alternates.canonical` per page.

## P1 — Content architecture that ranks + converts

- **Homepage** ([`app/page.tsx`](/Users/apple/Projects/5_morar.dev/app/page.tsx) / [`components/profile-section.tsx`](/Users/apple/Projects/5_morar.dev/components/profile-section.tsx)):
- Make H1 value prop keyword-aligned (e.g., “Full Stack Engineer (React/Next.js)”).
- Add a short “Services / What I do” block with internal links to relevant projects + contact CTA.
- **Internal linking**
- From each blog post footer: link to 2–3 relevant docs pages + 1–2 projects.
- From docs pages: consistent “About author / Hire me” block + links to projects.
- **Tag pages** (`[app/tags/[tag]/page.tsx](/Users/apple/Projects/5_morar.dev/app/tags/[tag]/page.tsx)`):
- Add a short unique intro per tag (avoid thin/duplicate pages). If not possible, consider `noindex` for low-value tags.

## P2 — Technical SEO + performance hygiene

- **Images**
- Ensure `next/image` usage includes `sizes` everywhere (blog list + tag list still use `Image`).
- Prefer CMS images via HTTPS only; avoid mixed-content patterns.
- **Consistency**
- Ensure date formatting is stable (avoid locale-dependent strings in visible UI if SSR/client mismatch risk).
- **Analytics**
- Umami is fine; add outbound link tracking for project live/github links.

## Measurement / rollout

- Verify in Search Console:
- Coverage, sitemaps submitted, indexation of `/docs`.
- Rich results testing for blog posts.
- Track conversions:
- Clicks to email, LinkedIn, project live links from organic landing pages.