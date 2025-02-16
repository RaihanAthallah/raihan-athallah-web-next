import Modal from "../common/modal"; // Adjust the path as necessary

export function CreateExperienceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose(); // Close the modal on submit
    // handle save logic here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="mb-4 text-xl font-semibold">Create Experience</h3>
      <form onSubmit={handleSubmit}>
        <label className="mb-2 block text-sm font-medium text-gray-700">Project Title</label>
        <input type="text" className="mb-4 w-full rounded border-gray-300 p-2" placeholder="Enter project title" />
        <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
        <textarea className="mb-4 w-full rounded border-gray-300 p-2" placeholder="Enter project description" />
        <button
          type="button"
          onClick={onClose} // Close modal on cancel
          className="mr-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Cancel
        </button>
        <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Save
        </button>
      </form>
    </Modal>
  );
}
