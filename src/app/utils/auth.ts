import { jwtData } from "@/app/types/user";

export function jwtDecode<T>(token: string): T {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  console.log("jsonPayload", jsonPayload);
  console.log("user data", JSON.parse(jsonPayload) as T);

  return JSON.parse(jsonPayload) as T;
}

export function setToken(token: string): void {
  localStorage.setItem("token", token);
}

export function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export function getToken(): string | null {
  return localStorage.getItem("authToken");
}

export function removeToken(): void {
  localStorage.removeItem("token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getUser(): jwtData | null {
  const token = getToken();
  if (!token) return null;
  return jwtDecode<jwtData>(token);
}
