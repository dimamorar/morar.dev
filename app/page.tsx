import type React from "react";
import { CodeIcon, BriefcaseIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ExperienceCard } from "@/components/experience-card";
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator";
import { AnimatedSection } from "@/components/animated-section";
import { EnhancedProfile } from "@/components/enhanced-profile";
import { PortfolioHeader } from "@/components/portfolio-header";
import { getExperienceInfo, getTechnicalSkillsInfo } from "@/lib/data";

const SkillTagComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2 py-1 bg-zinc-800 rounded-full text-xs font-medium text-zinc-400">
      {children}
    </div>
  );
};

export default function Home() {
  const experienceInfo = getExperienceInfo();
  const technicalSkills = getTechnicalSkillsInfo();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20 z-0"></div>

      <PortfolioHeader />

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="md:sticky md:top-24 self-start">
            <AnimatedSection animation="slide-right">
              <EnhancedProfile />
            </AnimatedSection>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4 sm:space-y-6">
            <AnimatedSection animation="fade-up" id="skills">
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <CodeIcon className="w-5 h-5 mr-2 text-cyan-400" />
                    <h3 className="text-lg font-medium">Technical Skills</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <AnimatedSection animation="slide-right" delay={100}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-zinc-400">
                          Core
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {technicalSkills.core.map((skill, index) => (
                            <SkillTagComponent key={index}>
                              {skill}
                            </SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slide-left" delay={200}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-zinc-400">
                          React world
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {technicalSkills.react.map((skill, index) => (
                            <SkillTagComponent key={index}>
                              {skill}
                            </SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slide-right" delay={300}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-zinc-400">
                          Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {technicalSkills.tools.map((skill, index) => (
                            <SkillTagComponent key={index}>
                              {skill}
                            </SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slide-left" delay={400}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-zinc-400">
                          Team Work
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {technicalSkills.teamWork.map((skill, index) => (
                            <SkillTagComponent key={index}>
                              {skill}
                            </SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slide-left" delay={400}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-zinc-400">
                          Other
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {technicalSkills.other.map((skill, index) => (
                            <SkillTagComponent key={index}>
                              {skill}
                            </SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                    <AnimatedSection animation="slide-left" delay={400}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-zinc-400">
                          Soft Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {technicalSkills.softSkills.map((skill, index) => (
                            <SkillTagComponent key={index}>
                              {skill}
                            </SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" id="experience">
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <BriefcaseIcon className="w-5 h-5 mr-2 text-cyan-400" />
                    <h3 className="text-lg font-medium">Experience</h3>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    {experienceInfo.map((experience, index) => (
                      <AnimatedSection
                        key={index}
                        animation="fade-up"
                        delay={100 * (index + 1)}
                      >
                        <ExperienceCard
                          title={experience.title}
                          company={experience.company}
                          period={experience.period}
                          description={experience.description}
                          achievements={experience.achievements}
                          technologies={experience.technologies}
                        />
                      </AnimatedSection>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* <AnimatedSection animation="fade-up" id="projects">
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center">
                      <GlobeIcon className="w-5 h-5 mr-2 text-cyan-400" />
                      <h3 className="text-lg font-medium">Recent Projects</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs sm:text-sm px-2 sm:px-3"
                    >
                      View All
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {projects.map((project, index) => (
                      <AnimatedSection
                        key={project.id}
                        animation="zoom-in"
                        delay={100 * (index + 1)}
                      >
                        <ProjectCard
                          title={project.title}
                          category={project.category}
                          image={project.thumbnailImage}
                          slug={project.slug}
                        />
                      </AnimatedSection>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection> */}
          </div>
        </div>

        <AnimatedSection
          animation="fade-in"
          delay={500}
          className="mt-8 sm:mt-12 py-4 sm:py-6 text-center text-xs sm:text-sm text-zinc-500"
        >
          <p>© {new Date().getFullYear()} Dmytro Morar. All rights reserved.</p>
        </AnimatedSection>
      </div>

      <EnhancedScrollIndicator />
    </main>
  );
}
