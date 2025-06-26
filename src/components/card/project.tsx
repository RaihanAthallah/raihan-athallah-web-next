import React from "react";
import { ExternalLink } from "lucide-react";
import { Project } from "@/cores/types/project";
import Image from "next/image";

const ProjectCard: React.FC<Project> = ({ title, description, imageUrl, techStacks, projectUrl }) => (
  <div className="bg-gray-800/40 rounded-xl overflow-hidden group border border-transparent hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative aspect-video overflow-hidden">
      <Image width={400} height={225} src={imageUrl} alt={`Screenshot of ${title}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      {projectUrl && (
        <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-gray-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" aria-label={`View live project: ${title}`}>
          <ExternalLink className="text-cyan-400" size={32} />
        </a>
      )}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-2">{title}</h3>
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">{description}</p>
      <div>
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {techStacks.map((tech) => (
            <span key={tech.name} className="px-3 py-1 text-xs bg-cyan-900/50 text-cyan-300 rounded-full">
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
