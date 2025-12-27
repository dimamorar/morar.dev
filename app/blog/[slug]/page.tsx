import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Blog Post - Dmytro Morar`,
    description: "Blog post",
  };
}

// Placeholder content - will be replaced with Ghost CMS integration
const posts: Record<string, { title: string; date: string; content: string }> =
  {
    "coming-soon": {
      title: "Blog Coming Soon",
      date: "Coming soon",
      content: `
Blog posts will be available here soon. This section will be connected to Ghost CMS for content management.

Stay tuned for articles about:
- Web development
- React and Next.js
- Frontend architecture
- Best practices
- And more!
      `,
    },
  };

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="container-narrow py-12 md:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to blog
      </Link>

      <article className="prose">
        <time className="text-sm text-muted-foreground">{post.date}</time>
        <h1 className="mt-2">{post.title}</h1>
        <div className="whitespace-pre-line">{post.content}</div>
      </article>
    </div>
  );
}

