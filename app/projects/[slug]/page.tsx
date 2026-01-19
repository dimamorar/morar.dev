import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }
  return {
    title: `${project.title} - Dmytro Morar`,
    description: project.shortDescription,
  };
}

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container-narrow py-12 md:py-16">
      <Link
        href="/projects"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to projects
      </Link>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">{project.category}</div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground">{project.shortDescription}</p>
        </div>

        {project.coverImage && (
          <ImageWithSkeleton
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            loading="lazy"
            className="object-cover"
            wrapperClassName="relative h-64 md:h-96 w-full rounded-lg overflow-hidden border"
          />
        )}

        <div className="prose max-w-none">
          <div className="space-y-4">
            {project.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <h2>Key Features</h2>
          <ul>
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h2>Technologies Used</h2>
          <div className="flex flex-wrap gap-2 not-prose">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-3 not-prose mt-8">
              {project.liveUrl && (
                <Button asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Project
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source Code
                  </a>
                </Button>
              )}
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <>
              <h2>Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                {project.gallery.map((image, index) => (
                  <ImageWithSkeleton
                    key={index}
                    src={image.url}
                    alt={image.caption || `Gallery image ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    loading="lazy"
                    className="object-cover"
                    wrapperClassName="relative h-64 rounded-lg overflow-hidden border"
                  />
                ))}
              </div>
            </>
          )}

          <div className="border-t pt-8 mt-12 not-prose">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              {project.client && (
                <div>
                  <h3 className="font-medium mb-1">Client</h3>
                  <p className="text-muted-foreground">{project.client}</p>
                </div>
              )}
              <div>
                <h3 className="font-medium mb-1">Timeline</h3>
                <p className="text-muted-foreground">{project.timeline}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Role</h3>
                <p className="text-muted-foreground">{project.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
