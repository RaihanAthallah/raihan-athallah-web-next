import React from "react";
import { Calendar, Building2 } from "lucide-react";
import { Experience } from "@/cores/types/experience";
import { formatDateRange } from "@/cores/utils/utils"; // Assuming you create this helper

// This card is now a self-contained block, making it reusable and easier to manage.
// The timeline layout is handled by the parent component (Home.tsx).
const ExperienceCard: React.FC<Experience> = ({ position, company, startDate, endDate, achievements }) => (
  <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700/50 w-full transition-all duration-300 hover:border-cyan-400/50 hover:bg-gray-800">
    <h3 className="text-xl font-bold text-cyan-400">{position}</h3>
    <div className="flex flex-col  gap-x-4 gap-y-1 text-gray-400 mt-1 mb-4">
      <div className="flex items-center gap-2">
        <Building2 size={16} />
        <p className="font-medium">{company}</p>
      </div>
      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <span>{formatDateRange(startDate, endDate)}</span>
      </div>
    </div>
    <ul className="space-y-2 list-disc list-inside">
      {achievements.map((achievement) => (
        <li key={achievement.id} className="text-gray-300 text-sm">
          {achievement.description}
        </li>
      ))}
    </ul>
  </div>
);

export default ExperienceCard;
