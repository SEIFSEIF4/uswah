import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/auth";

const LOCALES = ["en", "ar"];

// Two jobs, in this order: refresh the auth token (Server Components cannot write
// cookies, so it has to happen here), then send locale-less paths to a locale.
export async function proxy(request: NextRequest) {
  const response = await updateSession(request);

  const { pathname } = request.nextUrl;
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return response;
  }

  const prefers = request.headers.get("accept-language") ?? "";
  const locale = /(^|,)\s*ar\b/i.test(prefers) ? "ar" : "en";

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  // Carry the refreshed session cookies onto the redirect, or the refresh is lost.
  const redirect = NextResponse.redirect(url);
  response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
  return redirect;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
