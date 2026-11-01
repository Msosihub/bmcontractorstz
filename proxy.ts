import { NextRequest, NextResponse } from "next/server";

/** Server-derived request context only; never trusts caller-supplied locale/path headers. */
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-bm-path", request.nextUrl.pathname);
  headers.set("x-bm-language", request.nextUrl.searchParams.get("lang") === "sw" ? "sw" : "en");
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)"] };
