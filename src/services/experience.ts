import { Experience } from "@/cores/types/experience";
// use this service to fetch data from the server

// get API url from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("API_BASE_URL", API_BASE_URL);

export const ExperienceService = {
  async fetchExperiences() {
    const response = await fetch(`${API_BASE_URL}/api/experiences`);
    if (!response.ok) {
      throw new Error("Failed to fetch experiences");
    }
    const data = await response.json();
    return data as Experience[];
  },

  async fetchExperience(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/experiences/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch experience");
    }
    const data = await response.json();
    return data as Experience;
  },

  async createExperience(experience: Experience) {
    const response = await fetch(`${API_BASE_URL}/api/experiences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experience),
    });
    if (!response.ok) {
      throw new Error("Failed to create experience");
    }
    const data = await response.json();
    return data as Experience;
  },

  async updateExperience(experience: Experience) {
    const response = await fetch(`${API_BASE_URL}/api/experiences/${experience.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experience),
    });
    if (!response.ok) {
      throw new Error("Failed to update experience");
    }
    const data = await response.json();
    return data as Experience;
  },

  async deleteExperience(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/experiences/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete experience");
    }
    const data = await response.json();
    return data as Experience;
  },
};
