// app/components/sections/Skills.tsx

import React from "react";
import { SiGoland, SiDotnet, SiTypescript, SiJavascript, SiPostgresql, SiMysql, SiDocker, SiGit, SiGooglecloud, SiRedis, SiPython, SiNestjs, SiExpress } from "react-icons/si";
import { FaAws, FaLinux, FaWindows } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import { Database, Cpu, Wrench } from "lucide-react";
import { IconType } from "react-icons";

// Define the structure for a skill
interface Skill {
  name: string;
  icon: IconType | React.ElementType; // Allow both react-icons and lucide-react icons
}

// Define the structure for a skill category
interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: Skill[];
}

// --- Your Skills Data ---
// You can easily update your skills here
const skillsData: SkillCategory[] = [
  {
    title: "Languages",
    icon: Cpu,
    skills: [
      { name: "Go (Golang)", icon: SiGoland },
      { name: "C#", icon: SiDotnet },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Python", icon: SiPython },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Cpu,
    skills: [
      { name: "React", icon: RiReactjsLine }, // Using TypeScript icon as a placeholder
      { name: "Next.js", icon: SiNestjs }, // Using TypeScript icon as a placeholder
      { name: "Express.js", icon: SiExpress }, // Using JavaScript icon as a placeholder
      { name: "Django", icon: SiPython }, // Using Python icon as a placeholder
      {name : "dotnet", icon: SiDotnet }, // Using C# icon as a placeholder
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "Redis", icon: SiRedis },
      {name : "Microsoft SQL Server", icon: SiDotnet }, // Using C# icon as a placeholder
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "Git", icon: SiGit },
      { name: "AWS", icon: FaAws }, // Assuming you meant to use a different icon for AWS
      { name: "GCP", icon: SiGooglecloud },
    ],
  },
  {
    title: "Operating System",
    icon: Wrench,
    skills: [
      { name: "Linux", icon: FaLinux }, // Using Go icon as a placeholder
      { name: "Windows", icon: FaWindows }, // Using C# icon as a placeholder
    ],
  },
    {
        title: "Other Skills",
        icon: Wrench,
        skills: [
        { name: "API Development", icon: SiGoland }, // Using Go icon as a placeholder
        { name: "Microservices", icon: SiDotnet }, // Using C# icon as a placeholder
        { name: "Cloud Computing", icon: SiGooglecloud }, // Using GCP icon as a placeholder
        { name: "DevOps", icon: SiDocker }, // Using Docker icon as a placeholder
        ],
    },
];

const Skills: React.FC = () => {
  return (
    <section id="SKILLS" className="py-20 md:py-28 border-t border-gray-800">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">Technical Skills</h2>
          <p className="text-gray-400 mt-2 text-lg">My toolbox for building robust and scalable solutions.</p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category) => (
            <div key={category.title} className="bg-gray-800/40 p-6 rounded-xl border border-gray-700/50 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="flex items-center gap-4 mb-4">
                <category.icon className="text-cyan-400" size={24} />
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-2 bg-gray-700/50 px-3 py-1.5 rounded-full">
                    <skill.icon className="text-cyan-400" size={18} />
                    <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
