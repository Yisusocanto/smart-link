import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken =
    request.cookies.get("__Secure-smart-link.session_token")?.value ||
    request.cookies.get("smart-link.session_token")?.value;

  const { pathname } = request.nextUrl;

  // Define protected routes
  if (pathname.startsWith("/dashboard")) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect to dashboard if logged in and trying to access auth pages
  if (pathname === "/login" || pathname === "/register") {
    if (sessionToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
