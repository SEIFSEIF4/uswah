"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_LOGIN_ROUTE, DEFAULT_REDIRECT_ROUTE } from "@/routes";

export async function toggleSaveSaying(formData: FormData): Promise<void> {
  const localeValue = String(formData.get("locale") ?? DEFAULT_LOCALE);
  const locale = isLocale(localeValue) ? localeValue : DEFAULT_LOCALE;
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) return;

  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) {
    const returnTo = `/${locale}/quotes/${slug}`;
    redirect(`/${locale}${DEFAULT_LOGIN_ROUTE}?redirect=${encodeURIComponent(returnTo)}`);
  }

  const { data: saying, error: sayingError } = await supabase
    .from("sayings")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (sayingError) throw sayingError;
  if (!saying) return;

  const { data: existing, error: readError } = await supabase
    .from("saved_sayings")
    .select("saying_id")
    .eq("saying_id", saying.id)
    .maybeSingle();
  if (readError) throw readError;

  if (existing) {
    const { error } = await supabase.from("saved_sayings").delete().eq("saying_id", saying.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("saved_sayings").insert({ user_id: userId, saying_id: saying.id });
    if (error) throw error;
  }

  revalidatePath(`/${locale}/quotes/${slug}`);
  revalidatePath(`/${locale}${DEFAULT_REDIRECT_ROUTE}`);
}
