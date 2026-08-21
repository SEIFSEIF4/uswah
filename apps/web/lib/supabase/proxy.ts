import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "./database.types";

// Cookie-refresh helper used by the root proxy.ts file (Next 16 renamed
// middleware -> proxy).
//
// Pattern follows the official @supabase/ssr docs: build a fresh NextResponse,
// mirror cookies onto both the incoming request AND the outgoing response, then
// call getClaims() so the SDK refreshes the session token if it's near expiry and
// we get a verified JWT payload to drive routing decisions in the root proxy.
//
// We use getClaims() rather than getUser() at the edge because:
//   - it's verified cryptographically (signature check), no DB roundtrip
//   - pages still call getClaims()/getUser() when they need the row
//   - the cookie machinery still refreshes regardless
//
// Returns both the (possibly cookie-mutated) response AND the claims so the root
// proxy can branch on authed/unauthed cleanly.
//
// IMPORTANT: do not insert any logic between createServerClient and getClaims() —
// tokens that expired mid-handler will desync.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
          // Cache-Control and friends, so a CDN never caches somebody's session.
          Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims ?? null;

  return { response, claims };
}
