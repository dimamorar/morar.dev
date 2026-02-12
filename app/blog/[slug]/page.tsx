import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { PAYLOAD_CMS_URL } from "@/lib/payload";
import { CalendarRange } from "lucide-react";
import { BlogContent } from "@/components/blog-content";
import { BlogPostSchema } from "@/components/blog-post-schema";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
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
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const seoTitle = post.meta?.title || post.title;
  const excerpt = post.meta?.description || post.excerpt || post.title;
  const ogImage = post.cover?.url
    ? `${PAYLOAD_CMS_URL}${post.cover.url}`
    : "/og-image.png";

  return {
    title: seoTitle,
    description: excerpt,
    authors: post.authors.map((a) => ({ name: a.name })),
    openGraph: {
      title: seoTitle,
      description: excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.authors.map((a) => a.name),
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://morar.dev/blog/${slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = post!.publishedAt
    ? format(new Date(post!.publishedAt), "d MMM, yyyy")
    : "Draft";

  return (
    <>
      <BlogPostSchema post={post} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://morar.dev" },
          { name: "Blog", url: "https://morar.dev/blog" },
          { name: post.title },
        ]}
      />
      <div className="container-narrow py-6 md:py-6">
        <article className="prose max-w-none leading-[28px] px-4 -ml-6 -mr-6">
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
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="text-muted-foreground underline underline-offset-4 decoration-dotted hover:text-accent transition-colors"
                  >
                    #{tag.title}
                  </Link>
                ))}
              </div>
            )}

            <InlineTopButton className="self-center sm:self-auto" />
          </div>
        </footer>
        </article>
      </div>
    </>
  );
}
