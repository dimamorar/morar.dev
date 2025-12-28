import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { getPersonalInfo, getAboutInfo } from "@/lib/data";
import { getLatestPost } from "@/lib/blog";

export default async function Home() {
  const personalInfo = getPersonalInfo();
  const aboutInfo = getAboutInfo();
  const latestPost = await getLatestPost();

  const githubLink = personalInfo.social.find((s) => s.platform === "GitHub");
  const linkedinLink = personalInfo.social.find(
    (s) => s.platform === "LinkedIn"
  );

  return (
    <div className="container-narrow py-24 md:py-32">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Hi, I&apos;m {personalInfo.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {aboutInfo.bio}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/about"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
          >
            About me
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
          >
            Blog
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
          <Link
            href="/docs"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
          >
            Docs
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>

        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">Find me on</p>
          <div className="flex items-center gap-4">
            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            {linkedinLink && (
              <a
                href={linkedinLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            )}
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </div>

        <div className="pt-8">
          <h2 className="text-lg font-mono font-medium mb-4">Recent posts</h2>
          {latestPost ? (
            <Link
              href={`/blog/${latestPost.slug}`}
              className="text-sm text-foreground hover:text-foreground/80 inline-flex items-center transition-colors"
            >
              {latestPost.title}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          ) : (
            <Link
              href="/blog"
              className="text-sm text-foreground hover:text-foreground/80 inline-flex items-center transition-colors"
            >
              View all posts
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
