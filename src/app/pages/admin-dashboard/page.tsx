"use client";

import { useState, useEffect } from "react";
import React from "react";
import type { Project } from "../../types/project";
import type { Experience } from "../../types/experience";
import type { Profile } from "../../types/profile";

import { CreateProjectModal } from "@/app/components/modal/createProject";
import { CreateExperienceModal } from "@/app/components/modal/createExperience";
import { formatDate } from "@/app/utils/utils";
import Navbar from "@/app/components/common/navbar";
import { ExperienceService } from "@/app/services/experience";
import { ProjectService } from "@/app/services/project";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "experience" | "profile">("projects");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile] = useState<Profile | null>(null); // Removed setProfile since it's unused

  const handleCreateProject = () => setIsModalOpen(true);
  const handleCreateExperience = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataExperience = await ExperienceService.fetchExperiences();
        const dataProjects = await ProjectService.fetchProjects();

        setExperiences(dataExperience);
        setProjects(dataProjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="bg-gray-1000/50 mt-20 w-full max-w-7xl rounded-lg p-8">
      <div className="mx-auto max-w-10xl">
        <div className="mb-8 flex space-x-4">
          <button onClick={() => setActiveTab("projects")} className={`rounded-lg px-4 py-2 ${activeTab === "projects" ? "bg-cyan-500 text-white" : "bg-dark"}`}>
            Projects
          </button>
          <button onClick={() => setActiveTab("experience")} className={`rounded-lg px-4 py-2 ${activeTab === "experience" ? "bg-cyan-500 text-white" : "bg-dark"}`}>
            Experience
          </button>
          <button onClick={() => setActiveTab("profile")} className={`rounded-lg px-4 py-2 ${activeTab === "profile" ? "bg-cyan-500 text-white" : "bg-dark"}`}>
            Profile
          </button>
        </div>

        {activeTab === "projects" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Projects</h2>
            <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={handleCreateProject}>
              Create
            </button>
            <CreateProjectModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <div className="space-y-4">
              {projects?.map((project) => (
                <div key={project.id} className="rounded-lg bg-white p-4 shadow">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  {project.techStacks.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Tech Stack:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {project.techStacks.map((tech) => (
                          <span key={tech.name} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Experience</h2>
            <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={handleCreateExperience}>
              Create
            </button>
            <CreateExperienceModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <div className="space-y-4">
              {experiences?.map((experience) => (
                <div key={experience.id} className="rounded-lg bg-gray-800/50 p-6 p-4 shadow">
                  <h3 className="text-xl font-semibold">{experience.position}</h3>
                  <p className="text-gray-300">{experience.company}</p>
                  <p className="mt-1 text-sm text-gray-400">
                    {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : "Present"}
                  </p>
                  <p className="mt-2">{experience.description}</p>
                  {experience.achievements.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Key Achievements:</p>
                      <ul className="mt-1 list-inside list-disc">
                        {experience.achievements.map((achievement, index) => (
                          <li key={index} className="text-gray-300">
                            {achievement.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Profile</h2>
            {profile && (
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-xl font-semibold">{profile.name}</h3>
                <p className="text-gray-600">{profile.title}</p>
                <p className="mt-2">{profile.bio}</p>
                {profile.socials && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold">Social Links:</p>
                    <div className="mt-2 space-y-1">
                      {Object.entries(profile.socials).map(([platform, url]) => (
                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="block text-cyan-600 hover:text-cyan-700">
                          {platform}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-8">
        <Navbar />
        <AdminDashboard />
      </div>
    </main>
  );
}
