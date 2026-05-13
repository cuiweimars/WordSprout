import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedPaths = ["/learn"];
const authPaths = ["/auth/sign-in", "/auth/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth();

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPage = authPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/learn", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
