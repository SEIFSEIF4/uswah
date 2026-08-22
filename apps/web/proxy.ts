import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { isLocale, localeFromHeader, splitLocale } from "@/lib/i18n";
import {
  DEFAULT_LOGIN_ROUTE,
  DEFAULT_REDIRECT_ROUTE,
  isAuthRoute,
  isProtectedRoute,
  isRecoveryRoute,
} from "@/routes";

export async function proxy(request: NextRequest) {
  const { response, claims } = await updateSession(request);

  const pathname = request.nextUrl.pathname;
  const authed = claims !== null;

  // Locale-less path → send it to a locale. Every page lives under /<locale>,
  // which is what lets the locale layout own <html lang dir>.
  if (!isLocale(pathname.split("/")[1] ?? "")) {
    const locale = localeFromHeader(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Carry the refreshed session cookies, or the refresh is lost on the hop.
    const redirect = NextResponse.redirect(url);
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }

  // Route rules are written locale-less, so /en/saved and /ar/saved share one entry.
  const { locale, path } = splitLocale(pathname);

  // Unauthed visitor on a protected route → push to sign-in. Recovery routes are
  // still protected, so this catches unauthed users trying to reach them too.
  if (isProtectedRoute(path) && !authed) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${DEFAULT_LOGIN_ROUTE}`;
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Already-authed user hitting an auth route → bounce onward. Recovery routes are
  // exempt: an authed-but-unfinished user needs to actually reach them.
  if (isAuthRoute(path) && !isRecoveryRoute(path) && authed) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${DEFAULT_REDIRECT_ROUTE}`;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // The metadata routes are extensionless, so the dot rule below does not cover them:
  // without naming them here they get locale-redirected and a crawler follows a 307
  // to a page that does not exist.
  matcher: [
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|apple-icon|opengraph-image|avatar|.*\\..*).*)",
  ],
};
