---
name: Portfolio Site Rewrite Strategy
overview: Comprehensive strategy for rewriting morar.dev to include portfolio, blog, and documentation sections with marketing recommendations and technical architecture analysis.
todos:
  - id: extend-json-schema
    content: Extend portfolio-data.json to include blog and docs metadata structure
    status: pending
  - id: setup-content-structure
    content: Create content/blog/ and content/docs/ directories with example markdown files
    status: pending
  - id: setup-mdx-processing
    content: Install and configure MDX processing (next-mdx-remote or @next/mdx) with syntax highlighting
    status: pending
    dependencies:
      - setup-content-structure
  - id: create-blog-listing
    content: Create /blog page with post cards, filtering, and pagination
    status: pending
    dependencies:
      - setup-mdx-processing
  - id: create-blog-post-pages
    content: Create /blog/[slug] dynamic routes with post rendering, related posts, and SEO
    status: pending
    dependencies:
      - create-blog-listing
  - id: create-docs-structure
    content: Create /docs with hierarchical navigation, sidebar, and search functionality
    status: pending
    dependencies:
      - setup-mdx-processing
  - id: implement-docs-features
    content: Add table of contents, breadcrumbs, code highlighting, and search to docs
    status: pending
    dependencies:
      - create-docs-structure
  - id: update-navigation
    content: Update PortfolioHeader to include Blog and Docs links with active states
    status: pending
    dependencies:
      - create-blog-listing
      - create-docs-structure
  - id: seo-optimization
    content: Add sitemap, robots.txt, structured data, and Open Graph tags
    status: pending
    dependencies:
      - create-blog-post-pages
      - implement-docs-features
  - id: rss-feed
    content: Generate RSS feed for blog posts
    status: pending
    dependencies:
      - create-blog-post-pages
---

# Portfolio Site Rewrite Strategy

## Marketing Strategy for Developer Promotion

### 1. Content Strategy

- **Portfolio Section**: Showcase 3-5 best projects with detailed case studies
- **Blog Strategy**: 
  - Technical deep-dives (React, Next.js patterns)
  - AI/ML integration tutorials
  - Book reviews (position as thought leader)
  - Career growth essays (attract recruiters)
- **Documentation/Vault**: 
  - Public knowledge base demonstrates expertise
  - SEO goldmine for technical queries
  - Shows continuous learning

### 2. SEO & Discoverability

- **Technical Content**: Target "how to" queries (e.g., "React Query best practices")
- **Personal Branding**: Optimize for "Dima Morar React Developer"
- **Project Case Studies**: Long-form content with technical details
- **Documentation**: Internal linking structure like Cursor docs

### 3. Social Proof & Networking

- **LinkedIn Sync**: n8n automation keeps LinkedIn updated from JSON
- **GitHub Integration**: Showcase code contributions
- **Testimonials**: Add client/colleague testimonials section
- **Speaking/Writing**: Highlight any talks, articles, or contributions

### 4. Conversion Optimization

- **Clear CTAs**: "Hire Me", "Download CV", "Get in Touch"
- **Contact Form**: Easy way for recruiters to reach out
- **Availability Badge**: Real-time status (already implemented)
- **Project Filtering**: By technology, industry, or type

## Technical Architecture Analysis

### Option Comparison

#### Option 1: Single Next.js Site (RECOMMENDED)

**Pros:**

- Unified codebase and deployment
- Shared components and styling
- Single domain (better SEO)
- Lower maintenance overhead
- Your current stack already supports this

**Cons:**

- All content in one repo (can get large)
- Build times increase with more content

**Best For:** Your use case (monthly blog posts, manual Obsidian sync)

#### Option 2: Separate Apps

**Pros:**

- Independent deployments
- Technology flexibility per section

**Cons:**

- Multiple domains/subdomains (SEO split)
- Code duplication
- Higher maintenance
- More complex deployment

**Best For:** Large teams or completely different tech needs

#### Option 3: Separate CMS for Blog

**Pros:**

- Non-technical content editing
- Built-in admin interface

**Cons:**

- Additional cost (unless self-hosted)
- Overkill for monthly posts
- Integration complexity
- Vendor lock-in

**Best For:** Frequent publishing or non-technical writers

#### Option 4: Separate Framework for Documentation

**Pros:**

- Specialized features (search, navigation)

**Cons:**

- Maintenance overhead
- Styling consistency challenges
- Deployment complexity

**Best For:** Large documentation sites with complex needs

### Recommended Stack: Single Next.js Site

**Architecture:**

```
Next.js 14+ (App Router)
├── Portfolio Section (/)
│   └── Uses existing portfolio-data.json
├── Blog Section (/blog)
│   └── Markdown files in content/blog/
│   └── MDX for rich content
├── Documentation/Vault (/docs)
│   └── Markdown files from Obsidian
│   └── Similar structure to Cursor docs
└── Shared Components & Styling
```

**Content Management:**

- **Portfolio**: JSON file (existing `portfolio-data.json`)
- **Blog**: Markdown files in `content/blog/` directory
- **Documentation**: Markdown files in `content/docs/` directory (sync from Obsidian manually)

**Key Libraries:**

- `next-mdx-remote` or `contentlayer` for markdown processing
- `gray-matter` for frontmatter parsing
- `remark` and `rehype` plugins for markdown enhancements
- `next-seo` for SEO optimization

## Implementation Plan

### Phase 1: Foundation & Portfolio Enhancement

1. **Extend JSON Schema**: Add blog and docs metadata to portfolio-data.json
2. **Create Content Structure**: 

   - `content/blog/` for blog posts
   - `content/docs/` for documentation

3. **Markdown Processing**: Set up MDX with syntax highlighting
4. **Navigation**: Update header to include Blog and Docs links

### Phase 2: Blog Implementation

1. **Blog Listing Page**: `/blog` with post cards and filtering
2. **Blog Post Pages**: `/blog/[slug]` dynamic routes
3. **Blog Features**:

   - Categories/tags
   - Reading time
   - Related posts
   - SEO metadata
   - RSS feed

### Phase 3: Documentation/Vault

1. **Docs Structure**: Hierarchical navigation like Cursor
2. **Docs Features**:

   - Sidebar navigation
   - Search functionality
   - Code syntax highlighting
   - Table of contents
   - Breadcrumbs

3. **Obsidian Integration**: 

   - Manual sync process documented
   - Frontmatter template for Obsidian files

### Phase 4: SEO & Marketing Features

1. **SEO Optimization**:

   - Sitemap generation
   - Robots.txt
   - Structured data (JSON-LD)
   - Open Graph images

2. **Analytics**: Add privacy-friendly analytics
3. **RSS Feed**: For blog posts
4. **Newsletter**: Optional email signup

### Phase 5: LinkedIn Automation (Future)

1. **n8n Workflow**: 

   - Watch portfolio-data.json changes
   - Update LinkedIn profile via API
   - Sync experience, skills, projects

## File Structure

```
morar.dev/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (portfolio)
│   ├── blog/
│   │   ├── page.tsx (blog listing)
│   │   └── [slug]/
│   │       └── page.tsx (blog post)
│   └── docs/
│       ├── page.tsx (docs home)
│       └── [...slug]/
│           └── page.tsx (doc pages)
├── content/
│   ├── blog/
│   │   ├── ai-react-integration.md
│   │   └── ...
│   └── docs/
│       ├── react/
│       │   ├── hooks.md
│       │   └── ...
│       └── typescript/
│           └── ...
├── components/
│   ├── blog/
│   │   ├── blog-card.tsx
│   │   ├── blog-post.tsx
│   │   └── blog-navigation.tsx
│   └── docs/
│       ├── docs-sidebar.tsx
│       ├── docs-content.tsx
│       └── docs-search.tsx
├── lib/
│   ├── blog.ts (blog utilities)
│   ├── docs.ts (docs utilities)
│   └── mdx.ts (MDX processing)
└── data/
    └── portfolio-data.json (existing)
```

## Reference Implementation Details

### Cursor Docs Features to Replicate

- **Sidebar Navigation**: Collapsible sections, active page highlighting
- **Search**: Full-text search with keyboard shortcut (Cmd+K)
- **Breadcrumbs**: Show current location in hierarchy
- **Code Blocks**: Syntax highlighting with copy button
- **Table of Contents**: Auto-generated from headings
- **Dark Mode**: Already implemented

### Recommended Libraries

- **MDX**: `next-mdx-remote` or `@next/mdx`
- **Syntax Highlighting**: `shiki` or `prism-react-renderer`
- **Search**: `fuse.js` for client-side search
- **Reading Time**: `reading-time` library
- **Date Formatting**: `date-fns` (already installed)

## Next Steps

1. Review and approve this architecture
2. Set up markdown processing pipeline
3. Create blog and docs content structure
4. Implement navigation and routing
5. Add SEO and analytics
6. Deploy and test

This approach gives you a unified, maintainable site that showcases your expertise while being easy to update and extend.