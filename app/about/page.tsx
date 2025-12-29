import { Metadata } from "next";
import {
  getPersonalInfo,
  getAboutInfo,
  getExperienceInfo,
  getTechnicalSkillsInfo,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "About - Dmytro Morar",
  description:
    "Learn more about Dmytro Morar - React/Next.js developer with 7+ years of experience.",
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
      </div>
    </div>
  );
}
