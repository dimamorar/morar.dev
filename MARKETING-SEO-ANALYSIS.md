# Marketing & SEO Analysis: morar.dev

> Analysis Date: January 2026

## Current State Overview

| Category | Score | Status |
|----------|-------|--------|
| Technical SEO | 9/10 | Excellent |
| On-Page SEO | 8/10 | Strong |
| Content Strategy | 6/10 | Needs work |
| Lead Generation | 3/10 | Minimal |
| Social Proof | 4/10 | Limited |
| Conversion Optimization | 3/10 | Basic |

---

## What's Working Well

### Technical SEO
- Comprehensive metadata implementation across all pages
- Proper canonical URLs on every page
- Dynamic sitemap generation from CMS content
- Clean robots.txt configuration
- Full Next.js Metadata API utilization

### Structured Data
- `Person` schema on homepage (`components/person-schema.tsx`)
- `BlogPosting` schema on articles (`components/blog-post-schema.tsx`)
- `BreadcrumbList` schema for navigation (`components/breadcrumb-schema.tsx`)

### Image Optimization
- Next.js Image with AVIF/WebP formats
- Lazy loading with `loading="lazy"`
- Proper alt text on all images
- Skeleton loading states

### Open Graph & Social
- Dynamic OG image generation (`app/opengraph-image.tsx`)
- Twitter card images (`app/twitter-image.tsx`)
- Complete OG metadata on all pages

### URL Structure
- Clean, descriptive slugs
- Hierarchical organization
- No query parameters for content

---

## High-Priority Improvements

### 1. Add H1 to Homepage

**Issue:** Home page starts with H2 ("Recent posts"), missing H1.

**File:** `components/profile-section.tsx`

**Fix:** Wrap name or headline in `<h1>` tag:
```tsx
<h1 className="text-4xl font-bold">Dmytro Morar</h1>
// or with sr-only if visual styling is a concern
<h1 className="sr-only">Dmytro Morar - Full Stack Developer</h1>
```

**Impact:** Proper heading hierarchy signals page topic to search engines.

---

### 2. Add Newsletter Signup

**Issue:** No email capture mechanism exists anywhere on the site.

**Impact:** Missing the #1 owned marketing channel for developer audiences.

**Implementation:**
- Add signup form to blog sidebar or footer
- Offer lead magnet (e.g., "React Performance Checklist", "Next.js Best Practices Guide")
- Integrate with ConvertKit, Buttondown, or Resend

**Suggested locations:**
- `app/blog/page.tsx` - sidebar or after post list
- `app/blog/[slug]/page.tsx` - after article content
- `components/site-footer.tsx` - site-wide capture

**Example component structure:**
```tsx
// components/newsletter-signup.tsx
export function NewsletterSignup() {
  return (
    <form className="...">
      <h3>Get updates on web development</h3>
      <p>Join 500+ developers. No spam, unsubscribe anytime.</p>
      <input type="email" placeholder="you@example.com" required />
      <button type="submit">Subscribe</button>
    </form>
  )
}
```

---

### 3. Connect Contact Form to Backend

**Issue:** `components/contact-form.tsx` logs to console only (line ~160).

**Current code:**
```typescript
console.log("Form submitted:", data);
```

**Fix options:**
1. **Resend** - Simple email API
2. **SendGrid** - Enterprise email
3. **Payload CMS** - Store in existing CMS
4. **Formspree** - No-code option

**Implementation with Resend:**
```typescript
// app/api/contact/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  await resend.emails.send({
    from: 'contact@morar.dev',
    to: 'dmitry@morar.dev',
    subject: `Contact: ${subject}`,
    text: `From: ${name} (${email})\n\n${message}`
  });

  return Response.json({ success: true });
}
```

---

### 4. Add Social Sharing Buttons to Blog Posts

**Issue:** No way for readers to share articles.

**File:** `app/blog/[slug]/page.tsx`

**Add after article content:**
```tsx
// components/share-buttons.tsx
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex gap-2">
      <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}>
        Share on X
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}>
        Share on LinkedIn
      </a>
      <button onClick={() => navigator.clipboard.writeText(url)}>
        Copy Link
      </button>
    </div>
  )
}
```

**Impact:** Increases content reach and social signals.

---

### 5. Complete Sitemap Generation

**Issue:** Docs pages missing from sitemap.

**File:** `app/sitemap.ts` (line 53 has TODO comment)

**Fix:**
```typescript
import { source } from '@/lib/source';

// Inside sitemap function, add:
const docPages = source.getPages().map((page) => ({
  url: `https://morar.dev/docs/${page.slugs.join('/')}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.6,
}));

// Include in return array
return [...staticPages, ...blogPosts, ...tagPages, ...docPages];
```

---

## Medium-Priority Improvements

### 6. Add Related Posts Component

**Why:** Increases page views, time on site, and internal linking.

**Implementation:**
```tsx
// components/related-posts.tsx
export async function RelatedPosts({ currentSlug, tags }: Props) {
  const allPosts = await getAllPosts();
  const related = allPosts
    .filter(p => p.slug !== currentSlug)
    .filter(p => p.tags.some(t => tags.includes(t.slug)))
    .slice(0, 3);

  return (
    <section>
      <h2>Related Articles</h2>
      {related.map(post => <PostCard key={post.slug} post={post} />)}
    </section>
  );
}
```

**Location:** Add to `app/blog/[slug]/page.tsx` after main content.

---

### 7. Enable and Enhance Search

**Issue:** Search API exists (`/api/search`) but UI is disabled.

**File:** `app/layout.tsx` or docs layout

**Current:** `search: { enabled: false }`

**Fix:**
1. Enable search in Fumadocs layout
2. Extend search index to include blog posts
3. Add search to site header for global access

---

### 8. Add RSS Feed

**Why:** Many developers use RSS readers; standard for blogs.

**Create:** `app/feed.xml/route.ts`

```typescript
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const posts = await getAllPosts();

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dmytro Morar's Blog</title>
    <link>https://morar.dev/blog</link>
    <description>Articles about web development and software engineering</description>
    <atom:link href="https://morar.dev/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://morar.dev/blog/${post.slug}</link>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
```

**Also add to layout.tsx:**
```typescript
alternates: {
  types: {
    'application/rss+xml': '/feed.xml',
  },
},
```

---

### 9. Add Visual Breadcrumbs

**Current:** Only schema markup exists, not visible on page.

**File:** `app/blog/[slug]/page.tsx`

**Add component:**
```tsx
// components/breadcrumbs.tsx
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? (
            <Link href={item.href} className="hover:underline">{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          {i < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
```

---

### 10. Restore Projects/Portfolio Section

**Note:** Git history shows "refactor: remove projects pages"

**Why critical:** Portfolio is essential for developer personal brand and client acquisition.

**Recommendation:** Rebuild with case study format:

```markdown
## Project Structure
- Problem/Challenge
- Solution/Approach
- Technologies Used
- Results/Metrics
- Screenshots/Demo
```

**Consider:**
- Featured projects on homepage
- Dedicated `/projects` or `/work` page
- Filter by technology/type
- Link to live demos and GitHub repos

---

## Strategic Improvements

### 11. Add Social Proof Elements

**Current gaps:**
- No testimonials from colleagues/clients
- No client logos
- No project metrics
- No GitHub contribution stats

**Recommendations:**

1. **Testimonials section:**
```tsx
// components/testimonials.tsx
const testimonials = [
  {
    quote: "Dima delivered exceptional work...",
    author: "John Doe",
    role: "CTO at TechCorp"
  }
];
```

2. **GitHub stats widget:**
- Contribution graph
- Repository stars
- Follower count

3. **Blog metrics:**
- Display view counts from Umami
- Show reading time prominently

4. **Experience highlights:**
- "7+ years experience"
- "50+ projects delivered"
- Specific metrics from past roles

---

### 12. Implement Conversion Tracking

**Current:** Only basic Umami pageviews.

**Add custom events:**
```typescript
// Track with Umami
umami.track('contact_form_submit');
umami.track('cv_download');
umami.track('social_click', { platform: 'github' });
umami.track('blog_share', { platform: 'twitter', slug: 'post-slug' });
umami.track('newsletter_signup');
umami.track('external_link', { url: 'destination' });
```

**Implementation in components:**
```tsx
// CV download button
<a
  href="/dmytro_morar_cv.pdf"
  onClick={() => umami.track('cv_download')}
>
  Download CV
</a>
```

---

### 13. Content Strategy Enhancements

**Current:** Blog exists but no clear content organization.

**Recommendations:**

1. **Define content pillars:**
   - React/Next.js tutorials
   - TypeScript deep dives
   - Career/freelancing advice
   - Tool reviews

2. **Add category filtering:**
```tsx
// app/blog/page.tsx
<CategoryFilter categories={['React', 'Next.js', 'TypeScript', 'Career']} />
```

3. **Create content series:**
   - "React from Scratch" series
   - "Next.js Patterns" collection
   - Link related posts together

4. **Pillar/cluster architecture:**
   - Main pillar page (comprehensive guide)
   - Cluster posts (specific topics)
   - Internal links between them

---

### 14. Additional Schema Markup

**Already implemented:** Person, BlogPosting, BreadcrumbList

**Add:**

1. **WebSite schema with SearchAction:**
```json
{
  "@type": "WebSite",
  "url": "https://morar.dev",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://morar.dev/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

2. **FAQPage for relevant posts:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is React Server Components?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

3. **HowTo for tutorials:**
```json
{
  "@type": "HowTo",
  "name": "How to Set Up Next.js with TypeScript",
  "step": [...]
}
```

---

### 15. Performance Verification

**Already good:**
- Next.js Image optimization
- AVIF/WebP formats
- Lazy loading
- ISR caching

**Action items:**
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals in Search Console
- [ ] Verify LCP < 2.5s
- [ ] Check CLS on blog images
- [ ] Test mobile performance

---

## Quick Wins Checklist

```
[ ] Add H1 to homepage (ProfileSection)
[ ] Add docs pages to sitemap.ts
[ ] Enable social sharing buttons on blog posts
[ ] Connect contact form to email service
[ ] Add newsletter signup component
[ ] Track CV downloads in Umami
[ ] Add RSS feed route
[ ] Enable search in docs layout
[ ] Add visual breadcrumbs to blog posts
[ ] Request testimonials from past colleagues
```

---

## File Reference

| File | Current State | Action Needed |
|------|---------------|---------------|
| `components/profile-section.tsx` | No H1 | Add H1 heading |
| `components/contact-form.tsx` | Console.log only | Connect to backend |
| `app/sitemap.ts` | Missing docs | Add doc pages |
| `app/blog/[slug]/page.tsx` | No sharing | Add share buttons |
| `app/layout.tsx` | Search disabled | Enable search |
| `app/feed.xml/route.ts` | Doesn't exist | Create RSS feed |
| `components/newsletter-signup.tsx` | Doesn't exist | Create component |
| `components/share-buttons.tsx` | Doesn't exist | Create component |
| `components/related-posts.tsx` | Doesn't exist | Create component |
| `components/breadcrumbs.tsx` | Schema only | Add visual component |

---

## Priority Matrix

| Impact | Effort | Item |
|--------|--------|------|
| High | Low | Add H1 to homepage |
| High | Low | Complete sitemap |
| High | Medium | Newsletter signup |
| High | Medium | Connect contact form |
| High | Low | Social sharing buttons |
| Medium | Low | RSS feed |
| Medium | Low | Visual breadcrumbs |
| Medium | Medium | Related posts |
| Medium | Medium | Enable search |
| High | High | Restore projects section |
| Medium | High | Testimonials/social proof |

---

## Summary

**Strengths:**
- Excellent technical SEO foundation
- Modern Next.js patterns (ISR, metadata API)
- Good structured data implementation
- Clean URL structure
- Professional OG image generation

**Critical gaps:**
1. No email capture (newsletter)
2. Contact form not functional
3. No social sharing
4. Limited social proof
5. Projects section removed

The site has strong technical foundations but lacks marketing infrastructure for lead generation and conversion. Prioritize newsletter signup and contact form integration to capture visitor interest.
