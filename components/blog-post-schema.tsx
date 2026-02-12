import { BlogPost } from "@/lib/blog";
import { PAYLOAD_CMS_URL } from "@/lib/payload";

interface BlogPostSchemaProps {
  post: BlogPost;
}

export function BlogPostSchema({ post }: BlogPostSchemaProps) {
  const schemaTitle = post.meta?.title || post.title;
  const schemaDescription = post.meta?.description || post.excerpt;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: schemaTitle,
    description: schemaDescription,
    author: {
      "@type": "Person",
      name: post.authors[0]?.name || "Dmytro Morar",
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    image: post.cover?.url ? `${PAYLOAD_CMS_URL}${post.cover.url}` : undefined,
    publisher: {
      "@type": "Person",
      name: "Dmytro Morar",
      url: "https://morar.dev",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://morar.dev/blog/${post.slug}`,
    },
    wordCount: post.content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
