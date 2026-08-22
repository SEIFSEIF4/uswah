import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isLocale } from "@/lib/i18n";
import { signOut } from "../login/actions";
import { DEFAULT_LOGIN_ROUTE, DEFAULT_REDIRECT_ROUTE } from "@/routes";

const copy = {
  en: {
    title: "Saved",
    situations: "Situations",
    sayings: "Sayings",
    empty: "Nothing saved yet.",
    signOut: "Sign out",
  },
  ar: {
    title: "المحفوظات",
    situations: "المواقف",
    sayings: "المقولات",
    empty: "لم تحفظ شيئًا بعد.",
    signOut: "خروج",
  },
  tr: {
    title: "Kaydedilenler",
    situations: "Durumlar",
    sayings: "Sözler",
    empty: "Henüz bir şey kaydetmedin.",
    signOut: "Çıkış yap",
  },
} as const;

export default async function Saved({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Defense in depth: the proxy already bounces unauthed visitors off /saved.
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims?.sub) {
    redirect(`/${locale}${DEFAULT_LOGIN_ROUTE}?redirect=/${locale}${DEFAULT_REDIRECT_ROUTE}`);
  }

  // RLS returns only this user's saves; the joins are restricted to published rows.
  const { data: situationData, error: situationError } = await supabase
    .from("saved_situations")
    .select(
      "situations!inner(slug, situation_translations!inner(title, summary, locale))",
    )
    .eq("situations.situation_translations.locale", locale)
    .order("created_at", { ascending: false });
  if (situationError) throw situationError;

  const { data: sayingData, error: sayingError } = await supabase
    .from("saved_sayings")
    .select("sayings!inner(slug, saying, saying_translations(saying, locale))")
    .eq("sayings.saying_translations.locale", locale)
    .order("created_at", { ascending: false });
  if (sayingError) throw sayingError;

  const savedSituations = situationData ?? [];
  const savedSayings = sayingData ?? [];
  const t = copy[locale];

  return (
    <>
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-semibold">{t.title}</h1>
        <form action={signOut}>
          <input type="hidden" name="locale" value={locale} />
          <button className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            {t.signOut}
          </button>
        </form>
      </div>
      {savedSituations.length === 0 && savedSayings.length === 0 ? (
        <p className="text-muted-foreground">{t.empty}</p>
      ) : (
        <>
          {savedSituations.length > 0 && (
            <section>
              <h2 className="section-title">{t.situations}</h2>
              <ul className="flex flex-col">
                {savedSituations.map(({ situations: s }) => (
                  <li key={s.slug} className="border-b border-rule py-5 first:border-t">
                    <Link href={`/${locale}/${s.slug}`} className="group block">
                      <h3 className="text-xl font-medium group-hover:underline">
                        {s.situation_translations[0].title}
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        {s.situation_translations[0].summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {savedSayings.length > 0 && (
            <section>
              <h2 className="section-title">{t.sayings}</h2>
              <ul className="flex flex-col">
                {savedSayings.map(({ sayings: s }) => (
                  <li key={s.slug} className="border-b border-rule py-5 first:border-t">
                    <Link href={`/${locale}/quotes/${s.slug}`} className="group block">
                      <p dir="auto" className="text-xl font-medium group-hover:underline">
                        {s.saying_translations[0]?.saying ?? s.saying}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </>
  );
}
