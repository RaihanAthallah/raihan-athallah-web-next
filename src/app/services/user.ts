import { Login } from "@/app/types/user";
import { url } from "inspector";
import { setCookie } from "@/app/utils/auth";
// use this service to fetch data from the server

// get API url from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("API_BASE_URL", API_BASE_URL);

export const UserService = {
  async login(user: Login) {
    const response = await fetch(`${API_BASE_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const jwt = await response.json();
    // set cookie
    setCookie("authToken", jwt.token, jwt.exp);

    return jwt as string;
  },
};
