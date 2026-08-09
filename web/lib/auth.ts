import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./database.types";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/**
 * Cookie-aware client for anything that depends on who is signed in.
 * Public content reads use the plain client in ./supabase instead, so those pages
 * stay statically generated.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(URL, KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component, which cannot write cookies.
          // Safe to ignore: the proxy below refreshes the session.
        }
      },
    },
  });
}

/** Signed-in user's id, or null. Never trust getSession() in server code. */
export async function currentUserId() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return data?.claims?.sub ?? null;
}

/**
 * Refreshes the auth token and hands it to both the Server Components and the browser.
 * Returns the response so the proxy can copy its cookies onto a redirect.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(URL, KEY, {
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
  });

  // Nothing may run between createServerClient and getClaims(), or users get
  // logged out at random and it is miserable to debug.
  await supabase.auth.getClaims();

  return response;
}
