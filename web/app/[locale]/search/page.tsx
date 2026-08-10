import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { searchSituations } from "@/lib/content";
import { Row } from "@/components/cards";

const copy = {
  en: { label: "Search", placeholder: "What happened?", none: "Nothing found." },
  ar: { label: "بحث", placeholder: "ما الذي حدث؟", none: "لا توجد نتائج." },
} as const;

export default async function Search({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  if (!isLocale(locale)) notFound();

  const t = copy[locale];
  // Local match while the data is local. The Arabic-normalising RPC comes back with the
  // database — see searchSituations in lib/content.ts.
  const results = q ? searchSituations(q, locale) : [];

  return (
    <>
      <form className="search-form">
        <label htmlFor="q" className="sr-only">
          {t.label}
        </label>
        <input id="q" name="q" defaultValue={q ?? ""} placeholder={t.placeholder} />
        <button type="submit">{t.label}</button>
      </form>

      {q &&
        (results.length > 0 ? (
          <div className="rows">
            {results.map((s) => (
              <Row key={s.slug} s={s} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="muted">{t.none}</p>
        ))}
    </>
  );
}
