// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "src/utils/auth";



export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/personal/family")) {
    const token = request.cookies.get("auth_token")?.value;

    if (!token || !(await verifyToken(token))) {
      console.warn("🔒 Access denied — unsigned or invalid token detected.");
      const url = request.nextUrl.clone();
      url.pathname = "/personal";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/personal/family/:path*"],
};
