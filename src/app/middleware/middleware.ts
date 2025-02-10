import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "@/app/utils/auth";

interface jwtData {
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken"); // Example: Check for an auth token in cookies
  if (!token) {
    // Redirect to the login page if the user is not authenticated
    return NextResponse.redirect("/login");
  }

  //   check token expiry
  const jwtData = jwtDecode(token.value);
  const now = new Date();
  const expiry = new Date(jwtData.exp * 1000);
  if (now > expiry) {
    // Redirect to the login page if the token is expired
    return NextResponse.redirect("/login");
  }

  // Paths that require authentication
  const protectedPaths = ["/admin-dashboard", "/project"];

  const isProtectedPath = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isProtectedPath && !token) {
    // Redirect to the login page if the user is not authenticated
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "pages/admin-dashboard/:path*", // Protect admin-dashboard and all its subpaths
    "/project/:path*", // Protect project and all its subpaths
  ],
};
