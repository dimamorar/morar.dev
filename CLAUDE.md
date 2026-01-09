# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm lint     # Run ESLint
pnpm start    # Start production server
```

## Architecture

Next.js 14 portfolio site with App Router, TypeScript, Tailwind CSS 4, and Payload CMS integration.

### Directory Structure

- `/app` - App Router pages and API routes
- `/components` - React components (page-level and `/ui` for shadcn/ui)
- `/lib` - Business logic: CMS fetching (`blog.ts`), config (`payload.ts`), data helpers
- `/data` - Static JSON (portfolio data, navigation)
- `/contexts` - React Context providers
- `/hooks` - Custom React hooks

### CMS Integration (Payload CMS)

Remote CMS at `https://cms.morar.dev`. Key patterns:

- `lib/blog.ts`: Fetches posts, transforms Lexical JSON to HTML with custom block converters (code, banner, mediaBlock, upload)
- `lib/payload.ts`: CMS URL config via `PAYLOAD_CMS_URL` env var
- `/api/revalidate`: On-demand ISR webhook (requires `REVALIDATE_SECRET`)
- Cache: No-store in dev, 1-hour ISR in production

Content flow: Payload CMS → REST API → Lexical JSON → HTML serialization → React render

### Routing

| Route | Type |
|-------|------|
| `/blog`, `/blog/[slug]` | ISR (1h revalidation) |
| `/projects`, `/projects/[slug]` | Static |
| `/docs/[[...slug]]` | Optional catch-all |

### Component Patterns

- Server Components: Data fetching in page components
- Client Components: `SiteHeader`, `BlogContent`, `PortfolioHeader` (interactivity/state)
- UI Library: shadcn/ui (11 components in `/components/ui`)
- Path alias: `@/*` maps to root

### Environment Variables

- `PAYLOAD_CMS_URL` - CMS endpoint (defaults to https://cms.morar.dev)
- `REVALIDATE_SECRET` - Webhook authentication token

## Code Style

- Conventional Commits: `feat|fix|refactor|build|ci|chore|docs|style|perf|test`
- Telegraph style in comments: noun-phrases, minimal tokens
- Fix root cause, not band-aids
- Verify changes with git status/diff before commits
