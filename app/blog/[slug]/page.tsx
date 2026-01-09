import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { CalendarRange } from "lucide-react";
import { BlogContent } from "@/components/blog-content";
import { InlineTopButton } from "@/components/inline-top-button";

// export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found - Dmytro Morar",
      description: "The requested blog post could not be found.",
    };
  }

  const excerpt = post.excerpt || post.title;

  return {
    title: `${post.title} - Dmytro Morar`,
    description: excerpt,
    authors: post.authors.map((a) => ({ name: a.name })),
    openGraph: {
      title: post.title,
      description: excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.authors.map((a) => a.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: excerpt,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const publishedDate = post!.publishedAt
    ? format(new Date(post!.publishedAt), "d MMM, yyyy")
    : "Draft";

  return (
    <div className="container-narrow py-6 md:py-6">
      <article className="prose max-w-none leading-[28px] ml-[-1.5rem] mr-[-1.5rem]">
        <header className="mb-8">
          <h1 className="inline-block text-2xl font-bold text-accent sm:text-3xl mb-2">
            {post!.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <CalendarRange className="w-4 h-4" />
            <time dateTime={post!.publishedAt}>
              {publishedDate.toLocaleLowerCase()}
            </time>
            <span>·</span>
            <span>{post!.readingTime} min read</span>
          </div>
        </header>

        <BlogContent html={post!.content} />

        <footer className="mt-10 mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-muted-foreground"
                  >
                    #{tag.title}
                  </span>
                ))}
              </div>
            )}

            <InlineTopButton className="self-center sm:self-auto" />
          </div>
        </footer>
      </article>
    </div>
  );
}
