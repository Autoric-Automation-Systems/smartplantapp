import { NextResponse } from "next/server";
import { auth } from './lib/auth';

export async function proxy(request: Request) {
  const session = await auth();
  const { pathname } = new URL(request.url);
  const isLoggedIn = !!session?.user;
  //console.log("PROXY EXECUTOU", pathname);

  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/signin") ||
    pathname === "/signup" ||
    pathname.startsWith("/terms")
    ;

  if (!isPublicRoute && !isLoggedIn) {
    console.log("PROXY REDIRECIONOU PARA HOME", pathname);
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};