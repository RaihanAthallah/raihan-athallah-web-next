import { useState } from "react";
import Modal from "../common/modal";

export function CreateProjectModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [project, setProject] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Project submitted:", project);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Project">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Project Title</label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            className="w-full rounded-lg bg-gray-700/50 p-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            placeholder="Enter project title"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            className="w-full rounded-lg bg-gray-700/50 p-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            placeholder="Enter project description"
            rows={4}
          />
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
