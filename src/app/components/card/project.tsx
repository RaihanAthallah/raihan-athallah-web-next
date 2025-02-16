import React from "react";
import { ExternalLink } from "lucide-react";
import { Project } from "@/app/types/project";
import Image from "next/image";

const ProjectCard: React.FC<Project> = ({ title, description, imageUrl, techStacks, projectUrl }) => (
  <div className="bg-gray-800/50 rounded-lg overflow-hidden group hover:bg-gray-700/50 transition-all">
    <div className="relative aspect-video overflow-hidden">
      <Image
        width={300} // Set your desired width
        height={200} // Set your desired height
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {projectUrl && (
        <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <ExternalLink className="text-cyan-400" size={32} />
        </a>
      )}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-cyan-400 mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div>
        <h4 className="text-sm font-semibold text-gray-400 mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {techStacks.map((tech) => (
            <span key={tech.name} className="px-2 py-1 text-sm bg-cyan-500/10 text-cyan-400 rounded">
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
