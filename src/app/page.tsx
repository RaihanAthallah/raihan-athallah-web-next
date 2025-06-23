"use client";
import { useState, useEffect } from "react";
import { Experience } from "@/app/types/experience";
import { ExperienceService } from "@/app/services/experience";
import { Project } from "@/app/types/project";
import { ProjectService } from "@/app/services/project";
import Header from "@/app/components/common/header";
import { Footer } from "@/app/components/common/footer";
import ProjectCard from "@/app/components/card/project";
import ExperienceCard from "@/app/components/card/experience";
import Skills from "@/app/components/card/skill";
import Contact from "@/app/components/common/contact";

const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dataExperience, dataProjects] = await Promise.all([ExperienceService.fetchExperiences(), ProjectService.fetchProjects()]);
        setExperiences(dataExperience);
        setProjects(dataProjects);
      } catch (error) {
        console.error("Error fetching page data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="bg-gray-900 text-white w-full overflow-x-hidden">
      <Header />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* === FEATURED PROJECTS SECTION === */}
        <section id="PROJECTS" className="py-20 md:py-28">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">Featured Projects</h2>
            <p className="text-gray-400 mt-2 text-lg">A selection of my proudest work.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{loading ? Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-[420px] bg-gray-800/50 rounded-lg animate-pulse"></div>) : projects.map((project) => <ProjectCard key={project.id} {...project} />)}</div>
        </section>
        <Skills />

        {/* === WORKING EXPERIENCE SECTION (VERTICAL TIMELINE) === */}
        <section id="EXPERIENCES" className="py-20 md:py-28">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">Working Experience</h2>
            <p className="text-gray-400 mt-2 text-lg">My professional journey so far.</p>
          </div>
          <div className="relative">
            {/* The vertical line running through the center */}
            <div className="absolute left-1/2 top-2 h-full w-0.5 bg-cyan-400/30 transform -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-12 md:space-y-0">
              {loading
                ? Array.from({ length: 2 }).map((_, index) => <div key={index} className="h-48 bg-gray-800/50 rounded-lg animate-pulse w-full md:w-5/12 mx-auto"></div>)
                : experiences.map((exp, index) => (
                    <div key={exp.id} className="flex flex-col md:flex-row items-start md:justify-between md:mb-16">
                      {/* Left or Right Side Content based on index */}
                      <div className={`w-full md:w-5/12 ${index % 2 !== 0 ? "md:order-3" : ""}`}>
                        <ExperienceCard {...exp} />
                      </div>

                      {/* Timeline Dot (visible on desktop) */}
                      <div className="hidden md:block absolute left-1/2 top-8 z-10 w-4 h-4 bg-cyan-500 rounded-full border-2 border-gray-900 transform -translate-x-1/2"></div>

                      {/* Spacer for desktop layout */}
                      <div className="hidden md:block w-5/12"></div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
        <Contact />
      </div>

      <Footer />
    </main>
  );
};

export default Home;
