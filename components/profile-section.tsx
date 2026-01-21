import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { getPersonalInfo, getAboutInfo } from "@/lib/data";
import { TrackedSocialLink } from "@/components/tracked-social-link";

export function ProfileSection() {
  const personalInfo = getPersonalInfo();
  const aboutInfo = getAboutInfo();

  const githubLink = personalInfo.social.find((s) => s.platform === "GitHub");
  const linkedinLink = personalInfo.social.find(
    (s) => s.platform === "LinkedIn"
  );
  const xLink = personalInfo.social.find(
    (s) => s.platform === "X" || s.platform === "Twitter"
  );

  return (
    <div className="container-narrow py-12 md:py-16">
      <div className="flex flex-col text-center md:text-left -ml-6 -mr-6">
        <div className="mb-4">
          <h1 className="sr-only">Dmytro Morar - Full Stack Developer</h1>
          <h2 className="text-2xl md:text-3xl font-bold">Hi, I&apos;m Dima</h2>
        </div>

        <div className="space-y-2 mb-6 text-sm md:text-base">
          <p className="text-muted-foreground">{aboutInfo.bio}</p>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-4">
          {githubLink && (
            <TrackedSocialLink
              href={githubLink.url}
              platform="github"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              ariaLabel="GitHub"
            >
              <Github className="h-6 w-6" />
            </TrackedSocialLink>
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
          {xLink && (
            <TrackedSocialLink
              href={xLink.url}
              platform="x"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              ariaLabel="X"
            >
              <Twitter className="h-6 w-6" />
            </TrackedSocialLink>
          )}
          <TrackedSocialLink
            href={`mailto:${personalInfo.email}`}
            platform="email"
            className="hover:opacity-70 transition-opacity"
            ariaLabel="Email"
          >
            <Mail className="h-6 w-6" />
          </TrackedSocialLink>
        </div>
      </div>
    </div>
  );
}
