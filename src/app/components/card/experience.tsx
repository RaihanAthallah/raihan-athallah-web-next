import React from "react";
import { Calendar, Building2, Code, ExternalLink } from "lucide-react";
import { Experience } from "@/app/types/experience";
import { formatDate } from "@/app/utils/utils";

const ExperienceCard: React.FC<Experience> = ({ position, company, description, startDate, endDate, achievements }) => (
  <div className="relative pl-8 sm:pl-32 py-6 group">
    {/* Timeline line */}
    <div className="h-full w-1 bg-cyan-400/20 absolute left-0 sm:left-16 top-0" />

    {/* Timeline dot */}
    <div className="absolute left-[-5px] sm:left-[59px] top-8 h-3 w-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />

    <div className="bg-gray-800/50 p-6 rounded-lg hover:bg-gray-700/50 transition-all group-hover:shadow-lg group-hover:shadow-cyan-500/10">
      <div className="flex items-center gap-4 mb-4">
        <Building2 className="text-cyan-400" size={24} />
        <h3 className="text-xl font-semibold text-cyan-400">{position}</h3>
      </div>
      <div className="flex items-center gap-2 text-gray-400 mb-2">
        <Calendar size={16} />
        <span>{formatDate(startDate)}</span> <span>-</span>
      </div>
      <p className="text-gray-300 font-medium mb-3">{company}</p>
      <ul className="space-y-2">
        {achievements.map((achievement, index) => (
          <li key={index} className="text-gray-400">
            • {achievement.description}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ExperienceCard;
