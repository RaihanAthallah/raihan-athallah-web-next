"use client";
import { useState, useEffect } from "react";
// import { LucideIcon } from "lucide-react";
import { Experience } from "@/app/types/experience";
import { ExperienceService } from "@/app/services/experience";
import ExperienceCard from "@/app/components/card/experience";
import { Project } from "@/app/types/project";
import { ProjectService } from "@/app/services/project";
import ProjectCard from "@/app/components/card/project";
import Header from "@/app/components/common/header";
import { Footer } from "@/app/components/common/footer";

// interface TechIcon {
//   icon: LucideIcon;
//   delay: number;
// }

const Home: React.FC = () => {
  // const techIcons: TechIcon[] = [
  //   { icon: Terminal, delay: 0 },
  //   { icon: Database, delay: 0.5 },
  //   { icon: Code, delay: 1 },
  //   { icon: Server, delay: 1.5 },
  // ];

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataExperience = await ExperienceService.fetchExperiences();
        const dataProjects = await ProjectService.fetchProjects();

        setExperiences(dataExperience);
        setProjects(dataProjects);
        // setProfile(dataProfile);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        // setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header></Header>

      <section id="PROJECTS" className="w-full max-w-7xl py-20">
        <h2 className="text-4xl font-bold text-cyan-400 mb-12 text-center">
          <span className="animate-coding">
            Featured Projects <span>💻</span>
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
      <section id="EXPERIENCES" className="w-full py-10">
        <h2 className="text-4xl font-bold text-cyan-400 mb-12 text-center">
          Working Experiences <span className="inline-block">✨</span>
        </h2>
        <div className="relative">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </section>

      <Footer></Footer>
    </>
  );
};

export default Home;
