import { useState } from "react";
import Modal from "../common/modal"; // Adjust the path as necessary
import { Plus, X } from "lucide-react";
import { Experience } from "../../cores/types/experience";

export function CreateExperienceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [experience, setExperience] = useState<Omit<Experience, "endDate"> & { endDate?: Date }>({
    id: "", // Generate UUID dynamically or let the backend handle it
    position: "",
    company: "",
    description: "",
    startDate: new Date(),
    endDate: undefined, // or null
    createdAt: new Date(),
    updatedAt: new Date(),
    achievements: [],
  });

  const [newAchievement, setNewAchievement] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setExperience((prev) => ({
        ...prev,
        achievements: [
          ...prev.achievements,
          {
            id: crypto.randomUUID(),
            description: newAchievement,
            experienceId: prev.id,
          },
        ],
      }));
      setNewAchievement("");
    }
  };

  const handleRemoveAchievement = (id: string) => {
    setExperience((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((achievement) => achievement.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log({
        position: experience.position,
        company: experience.company,
        description: experience.description,
        startDate: experience.startDate,
        endDate: experience.endDate,
        achievements: experience.achievements.map((achievement) => achievement.description),
      });
    } catch (error) {
      console.error("Failed to create experience:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Experience">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Position</label>
          <input type="text" name="position" value={experience.position} onChange={handleChange} className="w-full rounded-lg bg-gray-700/50 p-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" placeholder="Enter position" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Company</label>
          <input type="text" name="company" value={experience.company} onChange={handleChange} className="w-full rounded-lg bg-gray-700/50 p-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" placeholder="Enter company name" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Description</label>
          <textarea name="description" value={experience.description} onChange={handleChange} className="w-full rounded-lg bg-gray-700/50 p-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" placeholder="Enter description" rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-cyan-400">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={experience.startDate.toISOString().split("T")[0]}
              onChange={(e) =>
                setExperience((prev) => ({
                  ...prev,
                  startDate: new Date(e.target.value),
                }))
              }
              className="w-full rounded-lg bg-gray-700/50 p-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-cyan-400">End Date (optional)</label>
            <input
              type="date"
              name="endDate"
              value={experience.endDate ? experience.endDate.toISOString().split("T")[0] : ""}
              onChange={(e) =>
                setExperience((prev) => ({
                  ...prev,
                  endDate: e.target.value ? new Date(e.target.value) : undefined,
                }))
              }
              className="w-full rounded-lg bg-gray-700/50 p-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Achievements</label>
          <div className="space-y-4">
            <ul className="space-y-2">
              {experience.achievements.map((achievement) => (
                <li key={achievement.id} className="flex items-center justify-between rounded-lg bg-gray-700/30 p-2">
                  <span className="text-gray-300">{achievement.description}</span>
                  <button type="button" onClick={() => handleRemoveAchievement(achievement.id)} className="rounded-full p-1 text-gray-400 hover:bg-gray-600/50 hover:text-red-400">
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-2">
              <input type="text" value={newAchievement} onChange={(e) => setNewAchievement(e.target.value)} className="flex-1 rounded-lg bg-gray-700/50 p-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" placeholder="Add achievement" />
              <button type="button" onClick={handleAddAchievement} className="rounded-lg bg-cyan-500/20 p-2 text-cyan-400 hover:bg-cyan-500/30">
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button type="button" onClick={onClose} className="rounded-lg bg-gray-700/50 px-4 py-2 text-gray-300 hover:bg-gray-600/50">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-cyan-500/20 px-4 py-2 text-cyan-400 hover:bg-cyan-500/30">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
