"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { DEFAULT_LOGIN_ROUTE, DEFAULT_REDIRECT_ROUTE, safeInternalRedirect } from "@/routes";

function read(formData: FormData) {
  const locale = String(formData.get("locale") ?? DEFAULT_LOCALE);
  return {
    locale: isLocale(locale) ? locale : DEFAULT_LOCALE,
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    redirectTo: formData.get("redirect") as string | null,
  };
}

export async function login(formData: FormData) {
  const { locale, email, password, redirectTo } = read(formData);
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/${locale}${DEFAULT_LOGIN_ROUTE}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  // safeInternalRedirect blocks ?redirect=//evil.com getting through the login form.
  redirect(safeInternalRedirect(redirectTo, `/${locale}${DEFAULT_REDIRECT_ROUTE}`));
}

export async function signup(formData: FormData) {
  const { locale, email, password } = read(formData);
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    redirect(`/${locale}${DEFAULT_LOGIN_ROUTE}?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/${locale}${DEFAULT_LOGIN_ROUTE}?check=1`);
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
