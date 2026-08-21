import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/**
 * One rule: everything except /login needs a session. Whether that session
 * belongs to an admin is the (protected) layout's question, and every server
 * action re-checks on its own.
 */
export async function proxy(request: NextRequest) {
  const { response, claims } = await updateSession(request);
  const { pathname } = request.nextUrl;
  const authed = claims !== null;

  const redirectTo = (path: string, params?: Record<string, string>) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.search = new URLSearchParams(params).toString();
    // Carry the refreshed session cookies, or the refresh is lost on the hop.
    const redirect = NextResponse.redirect(url);
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  };

  if (pathname === "/login") {
    return authed ? redirectTo("/") : response;
  }
  if (!authed) {
    return redirectTo("/login", pathname === "/" ? undefined : { redirect: pathname });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
