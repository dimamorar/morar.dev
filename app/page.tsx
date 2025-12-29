import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProfileSection } from "@/components/profile-section";
import { getLatestPost } from "@/lib/blog";

export default async function Home() {
  const latestPost = await getLatestPost();

  return (
    <>
      <ProfileSection />

      <div className="container-narrow pb-12 md:pb-16">
        <div className="border-t border-border pt-8">
          <h2 className="text-lg font-medium mb-4">Recent posts</h2>
          {latestPost ? (
            <Link
              href={`/blog/${latestPost.slug}`}
              className="text-sm inline-flex items-center transition-colors"
            >
              {latestPost.title}
            </Link>
          ) : (
            <Link
              href="/blog"
              className="text-sm inline-flex items-center transition-colors"
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
