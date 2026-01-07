import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarRange } from "lucide-react";
import { getAllPosts, getAllPostSlugs } from "@/lib/blog";
import { PAYLOAD_CMS_URL } from "@/lib/payload";

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
          <div className="space-y-8">
            {posts.map((post) => {
              const publishedDate = post.publishedAt
                ? format(new Date(post.publishedAt), "d MMM, yyyy")
                : "Draft";

              return (
                <article key={post.id}>
                  <h2 className="text-[18px]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary no-underline hover:underline hover:decoration-dashed hover:underline-offset-4"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <CalendarRange className="w-4 h-4" />
                    <time dateTime={post.publishedAt}>{publishedDate}</time>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  {post.excerpt && (
                    <div className="flex gap-4 mt-2">
                      {post.cover?.url && (
                        <div className="shrink-0 w-32 h-20 relative">
                          <Image
                            src={`${PAYLOAD_CMS_URL}${post.cover.url}`}
                            alt={post.cover.alt || post.title}
                            fill
                            className="object-cover rounded border border-border"
                          />
                        </div>
                      )}
                      <p className="text-muted-foreground text-sm flex-1">
                        {post.excerpt}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
