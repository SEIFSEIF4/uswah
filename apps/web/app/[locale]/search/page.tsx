import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { KIND_LABELS, searchAll } from "@/lib/content";
import { SearchShell } from "@/components/search-shell";

const copy = {
  en: { label: "Search", placeholder: "What happened?", none: "Nothing found.", searching: "Searching" },
  ar: { label: "بحث", placeholder: "ما الذي حدث؟", none: "لا توجد نتائج.", searching: "جارٍ البحث" },
  tr: { label: "Ara", placeholder: "Ne oldu?", none: "Sonuç bulunamadı.", searching: "Aranıyor" },
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
  // database, see searchAll in lib/content.ts.
  const results = q ? await searchAll(q, locale) : [];

  return (
    <SearchShell
      locale={locale}
      q={q ?? ""}
      placeholder={t.placeholder}
      label={t.label}
      searching={t.searching}
    >
      {results.length > 0 ? (
        <ul className="search-results">
          {results.map((hit) => (
            <li key={`${hit.kind}-${hit.slug}`}>
              <Link href={hit.href}>
                <span className="search-kind">{KIND_LABELS[hit.kind][locale]}</span>
                <strong>{hit.title}</strong>
                <span className="search-summary">{hit.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">{t.none}</p>
      )}
    </SearchShell>
  );
}
