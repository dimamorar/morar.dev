import { Github, Linkedin, Mail } from "lucide-react";
import { getPersonalInfo, getAboutInfo } from "@/lib/data";

export function ProfileSection() {
  const personalInfo = getPersonalInfo();
  const aboutInfo = getAboutInfo();

  const githubLink = personalInfo.social.find((s) => s.platform === "GitHub");
  const linkedinLink = personalInfo.social.find(
    (s) => s.platform === "LinkedIn"
  );

  return (
    <div className="container-narrow py-12 md:py-16">
      <div className="flex flex-col text-center md:text-left -ml-6 -mr-6">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">Hi, I&apos;m Dima</h1>
        </div>

        <div className="space-y-2 mb-6 text-sm md:text-base">
          <p className="text-muted-foreground">{aboutInfo.bio}</p>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-4">
          {githubLink && (
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
          )}
          {linkedinLink && (
            <a
              href={linkedinLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          )}
          <a
            href={`mailto:${personalInfo.email}`}
            className="hover:opacity-70 transition-opacity"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
