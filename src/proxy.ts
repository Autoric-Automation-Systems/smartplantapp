import { NextResponse } from "next/server";
import { auth } from './lib/auth';

export async function proxy(request: Request) {
  const session = await auth();
  const { pathname } = new URL(request.url);
  //console.log("PROXY EXECUTOU", pathname);

  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/signin") ||
    pathname === "/signup";

  if (!isPublicRoute && !session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
  
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};