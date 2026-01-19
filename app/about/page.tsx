import { Metadata } from "next";
import {
  getPersonalInfo,
  getAboutInfo,
  getExperienceInfo,
  getTechnicalSkillsInfo,
} from "@/lib/data";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Dmytro Morar - React/Next.js developer with 7+ years of experience.",
  openGraph: {
    title: "About Dmytro Morar",
    description:
      "Learn more about Dmytro Morar - React/Next.js developer with 7+ years of experience.",
    type: "profile",
    url: "https://morar.dev/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dmytro Morar",
    description:
      "Learn more about Dmytro Morar - React/Next.js developer with 7+ years of experience.",
  },
  alternates: {
    canonical: "https://morar.dev/about",
  },
};

export default function About() {
  const personalInfo = getPersonalInfo();
  const aboutInfo = getAboutInfo();
  const experienceInfo = getExperienceInfo();
  const technicalSkills = getTechnicalSkillsInfo();

  return (
    <div className="container-narrow py-12 md:py-16">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p className="text-lg text-muted-foreground">{aboutInfo.bio}</p>

        <a
          href="/dmytro_morar_cv.pdf"
          download
          className="inline-flex items-center gap-2 text-sm text-muted-foreground no-underline hover:text-accent transition-colors"
          aria-label="Download Dmytro Morar CV"
        >
          <Download className="h-5 w-5" />
          CV
        </a>

        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <ul className="space-y-2">
          <li>
            <strong>Frontend:</strong> {technicalSkills.react.join(", ")}
          </li>
          <li>
            <strong>Core:</strong> {technicalSkills.core.join(", ")}
          </li>
          <li>
            <strong>Tools:</strong> {technicalSkills.tools.join(", ")}
          </li>
          <li>
            <strong>Other:</strong> {technicalSkills.other.join(", ")}
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        <div className="space-y-6">
          {experienceInfo.map((exp, index) => (
            <div key={index} className="border-l-2 pl-4 py-2">
              <p className="text-sm text-muted-foreground">{exp.period}</p>
              <h3 className="font-mono font-medium mt-1">{exp.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {exp.company}
              </p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">Get in touch</h2>
        <div className="space-y-3">
          <p>
            If you want to work together or just say hi, reach out at{" "}
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-muted-foreground underline hover:text-primary"
            >
              {personalInfo.email}
            </a>
            .
          </p>

          <a
            href="/dmytro_morar_cv.pdf"
            download
            className="inline-flex items-center gap-2 text-sm text-muted-foreground no-underline hover:text-accent transition-colors"
            aria-label="Download Dmytro Morar CV"
          >
            <Download className="h-5 w-5" />
            CV
          </a>
        </div>
      </div>
    </div>
  );
}
