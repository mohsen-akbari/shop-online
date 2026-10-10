import { NextResponse } from "next/server";

import { extractUserId } from "@/utils/api.utils";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // const token = request.cookies.get("token")?.value;

  const isPublicPage =
    pathname === "/auth/sign-in" || pathname === "/auth/sign-up";

  if (!(await extractUserId(request)) && !isPublicPage) {
    const loginUrl = new URL("/auth/sign-in", request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  if ((await extractUserId(request)) && isPublicPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
  //  matcher: [
  //     "/",
  //     "/dashboard/:path*",
  //     "/products/:path*",
  //     "/cart/:path*",
  //     "/checkout/:path*",
  //     "/orders/:path*",
  //     "/auth/sign-in",
  //     "/auth-sign-up",
  //   ],
};

