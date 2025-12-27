import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects - Dmytro Morar",
  description: "Explore projects and work by Dmytro Morar.",
};

export default function Projects() {
  const projects = getAllProjects();

  return (
    <div className="container-narrow py-12 md:py-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">
            A collection of projects I&apos;ve worked on. Some are client work,
            others are personal projects.
          </p>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="border rounded-lg p-6 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <Link href={`/projects/${project.slug}`}>
                      <h2 className="font-mono font-medium text-lg hover:underline">
                        {project.title}
                      </h2>
                    </Link>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

