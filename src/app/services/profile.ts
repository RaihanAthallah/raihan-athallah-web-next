import { Profile } from "@/app/types/profile";
// use this service to fetch data from the server

// get API url from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("API_BASE_URL", API_BASE_URL);

export const ProfileService = {
  async fetchProfile() {
    const response = await fetch(`${API_BASE_URL}/api/profile`);
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    const data = await response.json();
    return data as Profile;
  },

  async createProfile(profile: Profile) {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
    if (!response.ok) {
      throw new Error("Failed to create profile");
    }
    const data = await response.json();
    return data as Profile;
  },

  async updateProfile(profile: Profile) {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
    const data = await response.json();
    return data as Profile;
  },
};
