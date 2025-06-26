import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "@/cores/utils/auth";

interface jwtData {
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken"); // Get token from cookies

  if (!token) {
    // Redirect to login if the token is missing
    return NextResponse.redirect("/login");
  }

  // Decode token safely
  const jwtData = jwtDecode<jwtData>(token.value);
  if (!jwtData || typeof jwtData.exp !== "number") {
    return NextResponse.redirect("/login"); // Invalid token, redirect
  }

  // Check token expiry
  const now = Date.now();
  const expiry = jwtData.exp * 1000; // Convert exp to milliseconds
  if (now > expiry) {
    return NextResponse.redirect("/login"); // Token expired, redirect
  }

  // Paths requiring authentication
  const protectedPaths = ["/admin-dashboard", "/project"];
  const isProtectedPath = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow request
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*", // Protect admin-dashboard and all its subpaths
    "/project/:path*", // Protect project and all its subpaths
  ],
};
