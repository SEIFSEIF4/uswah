import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/supabase/public";
import { isLocale } from "@/lib/i18n";

export const revalidate = 3600;

const copy = {
  en: {
    lede: "You are in a situation. Here is what the sources actually say about it.",
    empty: "No situations published yet.",
  },
  ar: {
    lede: "أنت أمام موقف. وهذا ما تقوله المصادر فيه.",
    empty: "لا توجد مواقف منشورة بعد.",
  },
} as const;

export default async function Index({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // RLS already hides unpublished rows; the inner join drops situations with no
  // translation in this locale, so a half-translated locale never shows a broken page.
  const { data } = await db
    .from("situations")
    .select("slug, situation_translations!inner(title, summary, locale)")
    .eq("situation_translations.locale", locale)
    .order("created_at", { ascending: false });

  const situations = data ?? [];
  const t = copy[locale];

  return (
    <>
      <p className="mb-10 text-lg text-muted">{t.lede}</p>
      {situations.length === 0 ? (
        <p className="text-muted">{t.empty}</p>
      ) : (
        <ul className="flex flex-col">
          {situations.map((s) => (
            <li key={s.slug} className="border-b border-rule py-5 first:border-t">
              <Link href={`/${locale}/${s.slug}`} className="group block">
                <h2 className="text-xl font-medium group-hover:underline">
                  {s.situation_translations[0].title}
                </h2>
                <p className="mt-1 text-muted">{s.situation_translations[0].summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
