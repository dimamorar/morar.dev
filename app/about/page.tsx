import { Metadata } from "next";
import { getPersonalInfo, getAboutInfo, getExperienceInfo, getTechnicalSkillsInfo, getMetaInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "About - Dmytro Morar",
  description: "Learn more about Dmytro Morar - React/Next.js developer with 7+ years of experience.",
};

export default function About() {
  const personalInfo = getPersonalInfo();
  const aboutInfo = getAboutInfo();
  const experienceInfo = getExperienceInfo();
  const technicalSkills = getTechnicalSkillsInfo();

  return (
    <div className="container-narrow py-12 md:py-16">
      <div className="prose">
        <h1>About</h1>
        <p>{aboutInfo.bio}</p>

        <h2>Background</h2>
        <p>
          I&apos;ve been building web applications for over 7 years, working with
          startups and established companies to create products that make a
          difference. My focus has always been on writing clean, maintainable
          code and creating exceptional user experiences.
        </p>

        <h2>Skills</h2>
        <ul>
          <li>
            <strong>Frontend:</strong>{" "}
            {technicalSkills.react.join(", ")}
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

        <h2>Experience</h2>
        <div className="space-y-6 not-prose">
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

        <h2>Get in touch</h2>
        <p>
          I&apos;m always interested in hearing about new projects and
          opportunities. Feel free to reach out at{" "}
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>.
        </p>
      </div>
    </div>
  );
}

