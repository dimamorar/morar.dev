import { getPersonalInfo, getTechnicalSkillsInfo } from "@/lib/data";

export function PersonSchema() {
  const personalInfo = getPersonalInfo();
  const technicalSkills = getTechnicalSkillsInfo();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: "Full Stack Engineer",
    url: "https://morar.dev",
    email: personalInfo.email,
    image: `https://morar.dev${personalInfo.avatar}`,
    sameAs: personalInfo.social.map((s) => s.url),
    knowsAbout: [
      ...technicalSkills.core.slice(0, 5),
      ...technicalSkills.react.slice(0, 3),
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kyiv",
      addressCountry: "Ukraine",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
