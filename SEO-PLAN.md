# SEO Improvement Plan for morar.dev

## Site Overview

Portfolio website for Dmytro Morar, a Full Stack Engineer (React/Next.js) with 7+ years experience. The site showcases professional profile, blog content via Payload CMS, project case studies, and documentation.

**Target Audience**: Potential employers, clients, and developers seeking collaboration.

---

## Current SEO Status Summary

| Area | Status | Priority |
|------|--------|----------|
| Sitemap | Missing | High |
| Robots.txt | Missing | High |
| Structured Data (JSON-LD) | Missing | High |
| Canonical URLs | Missing | High |
| Open Graph Images | Missing | High |
| Metadata | Partial (blog only has OG/Twitter) | Medium |
| Homepage H1 | Missing | Medium |
| Image Priority (above-fold) | Not set | Medium |
| Alt Text | Good | - |
| URL Structure | Excellent | - |
| Link Handling | Excellent | - |
| Semantic HTML | Good | - |

---

## High Priority Improvements

### 1. Create Sitemap (`/app/sitemap.ts`)

**Why**: Essential for search engine crawling and indexing all pages.

```typescript
// /app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { projects } from '@/lib/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://morar.dev'

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  // Dynamic blog posts
  const posts = await getAllPosts()
  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Tag pages
  const tags = await getAllTags()
  const tagPages = tags.map(tag => ({
    url: `${baseUrl}/tags/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  // Project pages
  const projectPages = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages, ...tagPages, ...projectPages]
}
```

### 2. Create Robots.txt (`/app/robots.ts`)

**Why**: Controls crawler access and points to sitemap.

```typescript
// /app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://morar.dev/sitemap.xml',
  }
}
```

### 3. Add Structured Data (JSON-LD)

**Why**: Enables rich snippets in search results, improves CTR.

#### 3a. Person Schema for Homepage/About

Create `/components/seo/person-schema.tsx`:

```typescript
export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dmytro Morar',
    jobTitle: 'Full Stack Engineer',
    url: 'https://morar.dev',
    sameAs: [
      'https://github.com/dmorar',
      'https://linkedin.com/in/dmorar',
    ],
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Full Stack Development'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kyiv',
      addressCountry: 'Ukraine',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

#### 3b. BlogPosting Schema for Blog Posts

Create `/components/seo/blog-post-schema.tsx`:

```typescript
import { Post } from '@/lib/blog'

export function BlogPostSchema({ post }: { post: Post }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.authors[0]?.name || 'Dmytro Morar',
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    image: post.cover?.url,
    publisher: {
      '@type': 'Person',
      name: 'Dmytro Morar',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://morar.dev/blog/${post.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 4. Add Canonical URLs

**Why**: Prevents duplicate content issues across URLs.

Update metadata in each page to include canonical:

```typescript
// Example for /app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    // ... existing metadata
    alternates: {
      canonical: `https://morar.dev/blog/${params.slug}`,
    },
  }
}
```

Apply to all dynamic pages:
- `/app/blog/[slug]/page.tsx`
- `/app/projects/[slug]/page.tsx`
- `/app/tags/[tag]/page.tsx`

### 5. Add Open Graph Images

**Why**: Improves social sharing appearance and CTR.

#### Option A: Static Default OG Image

Create a static `opengraph-image.png` (1200x630px) in `/app/` directory. Next.js will automatically use this.

#### Option B: Dynamic OG Image Generation

Create `/app/og/[...slug]/route.tsx`:

```typescript
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Dmytro Morar'
  const subtitle = searchParams.get('subtitle') || 'Full Stack Developer'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 60,
          background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
          color: 'white',
          width: '100%',
          height: '100%',
          padding: 60,
          justifyContent: 'center',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 20 }}>
          {title}
        </div>
        <div style={{ fontSize: 36, color: '#94a3b8' }}>
          {subtitle}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

---

## Medium Priority Improvements

### 6. Extend Metadata to All Pages

Currently only `/blog/[slug]` has full OG/Twitter metadata. Add to all pages:

**Template for static pages:**

```typescript
// /app/about/page.tsx
export const metadata: Metadata = {
  title: 'About | Dmytro Morar',
  description: 'Full Stack Engineer with 7+ years of experience specializing in React, Next.js, and TypeScript.',
  openGraph: {
    title: 'About Dmytro Morar',
    description: 'Full Stack Engineer with 7+ years of experience specializing in React, Next.js, and TypeScript.',
    type: 'website',
    url: 'https://morar.dev/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Dmytro Morar - Full Stack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dmytro Morar',
    description: 'Full Stack Engineer with 7+ years of experience specializing in React, Next.js, and TypeScript.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://morar.dev/about',
  },
}
```

**Pages needing metadata updates:**
- `/app/page.tsx` - Homepage
- `/app/about/page.tsx` - About page
- `/app/blog/page.tsx` - Blog listing
- `/app/projects/page.tsx` - Projects listing
- `/app/projects/[slug]/page.tsx` - Project detail
- `/app/tags/[tag]/page.tsx` - Tag archive

### 7. Fix Homepage H1 Hierarchy

**Current Issue**: Homepage only has H2 "Recent posts" - missing primary H1.

**Fix** in `/app/page.tsx`:

```tsx
// Add hero section with H1 before recent posts
<section className="mb-12">
  <h1 className="text-4xl font-bold tracking-tight mb-4">
    Dmytro Morar
  </h1>
  <p className="text-xl text-muted-foreground">
    Full Stack Developer specializing in React & Next.js
  </p>
</section>

<section>
  <h2 className="text-2xl font-semibold mb-6">Recent posts</h2>
  {/* ... existing posts grid */}
</section>
```

### 8. Set Image Priority for Above-Fold Images

In homepage and blog list, add `priority={true}` to first visible images:

```tsx
// For the first 1-2 images on any page
<Image
  src={post.cover.url}
  alt={post.cover.alt || post.title}
  priority={true}  // Loads immediately, improves LCP
  fill
  // ...
/>
```

Apply to:
- Homepage hero/profile image
- First post image on blog listing
- Hero image on about page

### 9. Enable Blog Post Revalidation

In `/app/blog/[slug]/page.tsx`, ensure revalidation is enabled:

```typescript
export const revalidate = 3600 // 1 hour - keeps content fresh
```

---

## Low Priority Improvements

### 10. Add Breadcrumb Schema

For better navigation signals to search engines:

Create `/components/seo/breadcrumb-schema.tsx`:

```typescript
interface BreadcrumbItem {
  name: string
  url?: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

Usage in blog post:
```tsx
<BreadcrumbSchema
  items={[
    { name: 'Home', url: 'https://morar.dev' },
    { name: 'Blog', url: 'https://morar.dev/blog' },
    { name: post.title },
  ]}
/>
```

### 11. Optimize next.config.mjs for Images

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'cms.morar.dev' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
}
```

### 12. Add Skip-to-Content Link

For accessibility (impacts SEO indirectly):

In `/app/layout.tsx`:

```tsx
<body>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:ring-2"
  >
    Skip to main content
  </a>
  {/* ... rest of layout */}
  <main id="main-content">
    {children}
  </main>
</body>
```

---

## Files Summary

### Files to Create

| File | Purpose | Priority |
|------|---------|----------|
| `/app/sitemap.ts` | Dynamic XML sitemap | High |
| `/app/robots.ts` | Robots.txt rules | High |
| `/components/seo/person-schema.tsx` | Person JSON-LD | High |
| `/components/seo/blog-post-schema.tsx` | Article JSON-LD | High |
| `/components/seo/breadcrumb-schema.tsx` | Breadcrumb JSON-LD | Low |
| `/app/opengraph-image.png` | Default OG image (1200x630) | Medium |

### Files to Modify

| File | Changes | Priority |
|------|---------|----------|
| `/app/layout.tsx` | Add PersonSchema, skip link | High |
| `/app/blog/[slug]/page.tsx` | Add canonical, BlogPostSchema, uncomment revalidate | High |
| `/app/page.tsx` | Add metadata, H1, canonical | Medium |
| `/app/about/page.tsx` | Add full OG/Twitter metadata | Medium |
| `/app/blog/page.tsx` | Add full OG/Twitter metadata | Medium |
| `/app/projects/page.tsx` | Add full OG/Twitter metadata | Medium |
| `/app/projects/[slug]/page.tsx` | Add full metadata, canonical | Medium |
| `/app/tags/[tag]/page.tsx` | Add canonical | Medium |
| `/next.config.mjs` | Image optimization settings | Low |

---

## Verification Steps

After implementing changes:

1. **Sitemap**: Visit `https://morar.dev/sitemap.xml`
2. **Robots**: Visit `https://morar.dev/robots.txt`
3. **Structured Data**: Test at https://search.google.com/test/rich-results
4. **OG Tags**: Test at https://developers.facebook.com/tools/debug/ or https://cards-dev.twitter.com/validator
5. **Lighthouse**: Run SEO audit in Chrome DevTools (target: 100)
6. **Google Search Console**: Submit sitemap after deployment

---

## Expected Impact

| Improvement | Expected Benefit |
|-------------|------------------|
| Sitemap | 50%+ faster indexing of new content |
| Structured Data | Rich snippets in search results (author, date, images) |
| OG Images | Professional appearance when shared on social media |
| Canonical URLs | Prevents duplicate content penalties |
| Full Metadata | 20-30% improvement in CTR from search results |

---

## Implementation Order

1. Create `sitemap.ts` and `robots.ts` (30 min)
2. Create JSON-LD schema components (30 min)
3. Add default OG image (15 min)
4. Update all page metadata with canonicals (1 hr)
5. Fix homepage H1 structure (15 min)
6. Add image priorities (15 min)
7. Run verification tests


  After deployment, verify at:
  - https://morar.dev/sitemap.xml - Sitemap
  - https://morar.dev/robots.txt - Robots
  - https://search.google.com/test/rich-results - Structured data
  - https://developers.facebook.com/tools/debug/ - OG tags