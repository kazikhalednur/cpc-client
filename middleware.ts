import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "@prisma/client";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // If trying to access dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Not logged in
    if (!token) {
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Not authorized
    const allowedRoles = [Role.SUPER_ADMIN, Role.ADMIN] as const;
    if (
      !token.role ||
      !allowedRoles.includes(token.role as (typeof allowedRoles)[number])
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If trying to access auth pages while logged in
  if (token && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/profile/:path*"],
};
