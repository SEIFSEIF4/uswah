import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "ar"];

// Every page lives under /<locale>. This sends bare paths to the right one so the
// locale layout can own <html lang dir>, and so a deep link without a locale still lands.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  const prefers = request.headers.get("accept-language") ?? "";
  const locale = /(^|,)\s*ar\b/i.test(prefers) ? "ar" : "en";

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
