"use server";

/**
 * Email and password. Accounts are seeded with `pnpm admin:seed`, never from
 * this screen — a dashboard has no self-serve signup. Whether the account is
 * an admin is checked after, against ADMIN_EMAILS.
 */

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Blocks ?redirect=//evil.com getting through the login form. */
const safeInternal = (target: string | null) =>
  target && target.startsWith("/") && !target.startsWith("//") ? target : "/";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = formData.get("redirect") as string | null;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(
      `/login?${new URLSearchParams({
        error: error.message,
        ...(redirectTo ? { redirect: redirectTo } : {}),
      })}`,
    );
  }

  revalidatePath("/", "layout");
  redirect(safeInternal(redirectTo));
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
