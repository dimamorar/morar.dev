import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts, getAllPostSlugs } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - Dmytro Morar",
  description:
    "Articles about web development, software engineering, and technology by Dmytro Morar.",
};

// Enable ISR - revalidate every hour
export const revalidate = 3600;

// Generate static params for all post pages at build time
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div className="container-narrow py-12 md:py-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Thoughts on software development, design, and technology.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <p>No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {posts.map((post) => {
              const publishedDate = post.publishedAt
                ? format(new Date(post.publishedAt), "MMM d, yyyy")
                : "Draft";

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block group py-4 border-b last:border-0 hover:bg-zinc-900/30 transition-colors rounded-lg px-2 -mx-2"
                >
                  <article>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <time dateTime={post.publishedAt}>{publishedDate}</time>
                      <span>·</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <h2 className="font-mono font-medium text-lg group-hover:underline">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm mt-1">
                        {post.excerpt}
                      </p>
                    )}
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
