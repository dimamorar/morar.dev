import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { getPersonalInfo, getAboutInfo } from "@/lib/data";

export default function Home() {
  const personalInfo = getPersonalInfo();
  const aboutInfo = getAboutInfo();

  // Get social links, filtering out Twitter if not present
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
          <div className="space-y-4">
            <Link href="/blog" className="block group">
              <article className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <p className="text-xs text-muted-foreground mb-1">
                  Coming soon
                </p>
                <h3 className="font-medium group-hover:underline">
                  Blog posts will appear here
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Check back soon for updates and articles.
                </p>
              </article>
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
            >
              View all posts
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
