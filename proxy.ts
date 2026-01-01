import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;

  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
