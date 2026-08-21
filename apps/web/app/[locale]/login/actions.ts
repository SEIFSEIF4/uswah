"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { DEFAULT_LOGIN_ROUTE, DEFAULT_REDIRECT_ROUTE, safeInternalRedirect } from "@/routes";

/**
 * Email code, no password.
 *
 * There is no separate sign-up: `shouldCreateUser` makes the first code an account. A
 * password would be one more thing to store, reset and get wrong for a site whose only
 * account feature is a list of saved situations.
 */
const PENDING_EMAIL = "uswah_otp_email";

function read(formData: FormData) {
  const locale = String(formData.get("locale") ?? DEFAULT_LOCALE);
  return {
    locale: isLocale(locale) ? locale : DEFAULT_LOCALE,
    email: String(formData.get("email") ?? "").trim(),
    token: String(formData.get("token") ?? "").trim(),
    redirectTo: formData.get("redirect") as string | null,
  };
}

const loginUrl = (locale: string, params: Record<string, string>) =>
  `/${locale}${DEFAULT_LOGIN_ROUTE}?${new URLSearchParams(params)}`;

export async function requestOtp(formData: FormData) {
  const { locale, email, redirectTo } = read(formData);
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    // locale rides along as user metadata so the email template can branch on it.
    // Supabase writes options.data to user_metadata when the account is created, so this
    // fixes the language at first sign-in; a returning reader who switches language
    // keeps the original until the metadata is updated elsewhere.
    options: { shouldCreateUser: true, data: { locale } },
  });
  if (error) {
    redirect(loginUrl(locale, { error: error.message, ...(redirectTo ? { redirect: redirectTo } : {}) }));
  }

  // The address rides in an httpOnly cookie rather than the query string: it is personal
  // data, and a URL ends up in history, logs and anything the reader shares.
  const jar = await cookies();
  jar.set(PENDING_EMAIL, email, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 15,
    path: "/",
  });

  redirect(loginUrl(locale, { sent: "1", ...(redirectTo ? { redirect: redirectTo } : {}) }));
}

export async function verifyOtp(formData: FormData) {
  const { locale, token, redirectTo } = read(formData);
  const jar = await cookies();
  const email = jar.get(PENDING_EMAIL)?.value;

  if (!email) {
    redirect(loginUrl(locale, { expired: "1" }));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error) {
    redirect(loginUrl(locale, { error: error.message, sent: "1", ...(redirectTo ? { redirect: redirectTo } : {}) }));
  }

  jar.delete(PENDING_EMAIL);
  revalidatePath("/", "layout");
  // safeInternalRedirect blocks ?redirect=//evil.com getting through the login form.
  redirect(safeInternalRedirect(redirectTo, `/${locale}${DEFAULT_REDIRECT_ROUTE}`));
}

/** Drop the pending address so a different one can be used. */
export async function restartOtp(formData: FormData) {
  const { locale, redirectTo } = read(formData);
  const jar = await cookies();
  jar.delete(PENDING_EMAIL);
  redirect(loginUrl(locale, redirectTo ? { redirect: redirectTo } : {}));
}

export async function signOut(formData: FormData) {
  const { locale } = read(formData);
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect(`/${locale}`);
}

/** Save or unsave a situation. Called from the situation page. */
export async function toggleSave(formData: FormData) {
  const { locale } = read(formData);
  const slug = String(formData.get("slug") ?? "");
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) {
    redirect(
      `/${locale}${DEFAULT_LOGIN_ROUTE}?redirect=${encodeURIComponent(`/${locale}/${slug}`)}`,
    );
  }

  const { data: situation } = await supabase
    .from("situations")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  // Nothing to attach a save to. While content is sample data this is every situation,
  // which is why saving appears to do nothing rather than fail.
  if (!situation) return;

  // RLS restricts both statements to this user's own rows.
  const { data: existing } = await supabase
    .from("saved_situations")
    .select("situation_id")
    .eq("situation_id", situation.id)
    .maybeSingle();

  if (existing) {
    await supabase.from("saved_situations").delete().eq("situation_id", situation.id);
  } else {
    await supabase
      .from("saved_situations")
      .insert({ user_id: userId, situation_id: situation.id });
  }

  revalidatePath(`/${locale}${DEFAULT_REDIRECT_ROUTE}`);
}
