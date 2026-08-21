"use server";

/**
 * Email code, no password — the site's login flow (web/app/[locale]/login)
 * minus the locale plumbing. Same Supabase project, so a code sent here signs
 * into the same account; whether that account is an admin is checked after.
 */

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const PENDING_EMAIL = "uswah_dash_otp_email";

/** Blocks ?redirect=//evil.com getting through the login form. */
const safeInternal = (target: string | null) =>
  target && target.startsWith("/") && !target.startsWith("//") ? target : "/";

function read(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim(),
    token: String(formData.get("token") ?? "").trim(),
    redirectTo: formData.get("redirect") as string | null,
  };
}

const loginUrl = (params: Record<string, string>) => `/login?${new URLSearchParams(params)}`;

export async function requestOtp(formData: FormData) {
  const { email, redirectTo } = read(formData);
  const supabase = await createClient();

  // shouldCreateUser so an admin's first-ever sign-in works here too; a
  // stranger's fresh account still cannot pass the ADMIN_EMAILS gate.
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true },
  });
  if (error) {
    redirect(loginUrl({ error: error.message, ...(redirectTo ? { redirect: redirectTo } : {}) }));
  }

  // The address rides in an httpOnly cookie rather than the query string: it is
  // personal data, and a URL ends up in history and logs.
  const jar = await cookies();
  jar.set(PENDING_EMAIL, email, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 15,
    path: "/",
  });

  redirect(loginUrl({ sent: "1", ...(redirectTo ? { redirect: redirectTo } : {}) }));
}

export async function verifyOtp(formData: FormData) {
  const { token, redirectTo } = read(formData);
  const jar = await cookies();
  const email = jar.get(PENDING_EMAIL)?.value;

  if (!email) {
    redirect(loginUrl({ expired: "1" }));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error) {
    redirect(
      loginUrl({ error: error.message, sent: "1", ...(redirectTo ? { redirect: redirectTo } : {}) }),
    );
  }

  jar.delete(PENDING_EMAIL);
  revalidatePath("/", "layout");
  redirect(safeInternal(redirectTo));
}

/** Drop the pending address so a different one can be used. */
export async function restartOtp(formData: FormData) {
  const { redirectTo } = read(formData);
  const jar = await cookies();
  jar.delete(PENDING_EMAIL);
  redirect(redirectTo ? loginUrl({ redirect: redirectTo }) : "/login");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
