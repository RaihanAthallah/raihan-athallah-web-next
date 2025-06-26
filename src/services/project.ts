import { Project } from "@/cores/types/project";
// use this service to fetch data from the server

// get API url from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("API_BASE_URL", API_BASE_URL);

export const ProjectService = {
  async fetchProjects() {
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const data = await response.json();
    return data as Project[];
  },

  async fetchProject(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }
    const data = await response.json();
    return data as Project;
  },

  async createProject(project: Project) {
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error("Failed to create project");
    }
    const data = await response.json();
    return data as Project;
  },

  async updateProject(project: Project) {
    const response = await fetch(`${API_BASE_URL}/api/projects/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error("Failed to update project");
    }
    const data = await response.json();
    return data as Project;
  },

  async deleteProject(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete project");
    }
    const data = await response.json();
    return data as Project;
  },
};
