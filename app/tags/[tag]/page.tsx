import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { CalendarRange } from "lucide-react";
import { getPostsByTag, getAllTags } from "@/lib/blog";
import { PAYLOAD_CMS_URL } from "@/lib/payload";

export const revalidate = 3600;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tags = await getAllTags();
  const tag = tags.find((t) => t.slug === tagSlug);

  if (!tag) {
    return {
      title: "Tag Not Found",
      description: "The requested tag could not be found.",
    };
  }

  return {
    title: `${tag.title} Articles`,
    description: `All articles tagged with "${tag.title}".`,
    openGraph: {
      title: `${tag.title} Articles`,
      description: `All articles tagged with "${tag.title}".`,
      type: "website",
      url: `https://morar.dev/tags/${tagSlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tag.title} Articles`,
      description: `All articles tagged with "${tag.title}".`,
    },
    alternates: {
      canonical: `https://morar.dev/tags/${tagSlug}`,
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: { tag: string };
}) {
  const {tag: tagSlug} = await params;
  const tags = await getAllTags();
  const tag = tags.find((t) => t.slug === tagSlug);

  if (!tag) {
    notFound();
  }

  const posts = await getPostsByTag(tagSlug);

  return (
    <div className="container-narrow py-12 md:py-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tag: {tag.title}</h1>
          <p className="text-muted-foreground mt-2">
            All articles with the tag &ldquo;{tag.title}&rdquo;.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <p>No posts found with this tag.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => {
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
                            priority={index < 3}
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

        <div className="pt-4">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            &larr; to posts
          </Link>
        </div>
      </div>
    </div>
  );
}
