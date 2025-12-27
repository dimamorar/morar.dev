import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Dmytro Morar",
  description:
    "Articles about web development, software engineering, and technology by Dmytro Morar.",
};

const posts = [
  {
    slug: "coming-soon",
    title: "Blog Coming Soon",
    description: "Blog posts will be available here soon. Stay tuned!",
    date: "Coming soon",
    readTime: "0 min read",
  },
];

export default function Blog() {
  return (
    <div className="container-narrow py-12 md:py-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Thoughts on software development, design, and technology.
          </p>
        </div>

        <div className="space-y-1">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group py-4 border-b last:border-0"
            >
              <article>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <time>{post.date}</time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="font-mono font-medium text-lg group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {post.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
