"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/auth";
import { isLocale } from "@/lib/supabase";

function read(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  return {
    locale: isLocale(locale) ? locale : "en",
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    next: String(formData.get("next") ?? ""),
  };
}

export async function login(formData: FormData) {
  const { locale, email, password, next } = read(formData);
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/${locale}/login?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/", "layout");
  redirect(next || `/${locale}/saved`);
}

export async function signup(formData: FormData) {
  const { locale, email, password } = read(formData);
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) redirect(`/${locale}/login?error=${encodeURIComponent(error.message)}`);

  redirect(`/${locale}/login?check=1`);
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
  const locale = String(formData.get("locale") ?? "en");
  const slug = String(formData.get("slug") ?? "");
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) {
    redirect(`/${locale}/login?next=${encodeURIComponent(`/${locale}/${slug}`)}`);
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

  revalidatePath(`/${locale}/saved`);
}
