import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProfileSection } from "@/components/profile-section";
import { getLatestPosts } from "@/lib/blog";

export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      <ProfileSection />
      <div className="container-narrow pb-12 md:pb-16">
        <div className="border-t border-border pt-8 -ml-4 px-4 md:px-0">
          <h2 className="text-lg font-medium mb-4">Recent posts</h2>
          {latestPosts.length > 0 ? (
            <div className="space-y-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block"
                >
                  <div className="text-sm leading-6">{post.title}</div>
                </Link>
              ))}
            </div>
          ) : (
            <Link
              href="/blog"
              className="text-sm inline-flex items-center transition-colors leading-6"
            >
              View all posts
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
