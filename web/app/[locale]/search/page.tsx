import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/supabase/public";
import { isLocale } from "@/lib/i18n";

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
  // The RPC is the only search implementation, shared with the Flutter client. Arabic
  // only matches because query and index both pass through ar_norm() inside it.
  const { data } = q
    ? await db.rpc("search_situations", { q, loc: locale })
    : { data: [] };

  return (
    <>
      <form className="flex gap-2">
        <label htmlFor="q" className="sr-only">
          {t.label}
        </label>
        <input
          id="q"
          name="q"
          defaultValue={q ?? ""}
          placeholder={t.placeholder}
          className="min-w-0 flex-1 border-b border-rule bg-transparent py-2 text-lg outline-none focus:border-foreground"
        />
        <button type="submit" className="text-sm font-medium underline underline-offset-4">
          {t.label}
        </button>
      </form>

      {q &&
        (data && data.length > 0 ? (
          <ul className="mt-8 flex flex-col">
            {data.map((r) => (
              <li key={r.slug} className="border-b border-rule py-5 first:border-t">
                <Link href={`/${locale}/${r.slug}`} className="group block">
                  <h2 className="text-xl font-medium group-hover:underline">{r.title}</h2>
                  <p className="mt-1 text-muted">{r.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-muted">{t.none}</p>
        ))}
    </>
  );
}
