import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/supabase/public";
import { isLocale, LOCALES, RESERVED_SLUGS, type Locale } from "@/lib/i18n";
import { toggleSave } from "../login/actions";

export const revalidate = 3600;

const copy = {
  en: { takeaway: "What to do", source: "Source", translated: "Translated by", save: "Save this" },
  ar: { takeaway: "ماذا تفعل", source: "المصدر", translated: "ترجمة", save: "احفظ" },
} as const;

const collectionName = {
  en: { bukhari: "Sahih al-Bukhari", muslim: "Sahih Muslim" },
  ar: { bukhari: "صحيح البخاري", muslim: "صحيح مسلم" },
} as const;

async function getSituation(slug: string, locale: Locale) {
  const { data } = await db
    .from("situations")
    .select(
      `slug,
       situation_translations!inner(title, summary, locale),
       entries(
         position,
         sources!inner(kind, collection, ref, text_original,
                       source_translations(text, translator, locale)),
         entry_translations!inner(body, takeaway, locale)
       )`,
    )
    .eq("slug", slug)
    .eq("situation_translations.locale", locale)
    .eq("entries.entry_translations.locale", locale)
    .maybeSingle();
  return data;
}

export async function generateStaticParams() {
  const { data } = await db.from("situations").select("slug");
  return (data ?? []).flatMap((s) =>
    LOCALES.map((locale) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const s = await getSituation(slug, locale);
  if (!s) return {};
  const t = s.situation_translations[0];
  return {
    title: `${t.title} — Uswah`,
    description: t.summary,
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/${slug}`])),
    },
  };
}

export default async function Situation({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || RESERVED_SLUGS.has(slug)) notFound();

  const situation = await getSituation(slug, locale);
  if (!situation) notFound();

  const t = copy[locale];
  const head = situation.situation_translations[0];
  const entries = [...situation.entries].sort((a, b) => a.position - b.position);

  return (
    <article>
      <h1 className="text-3xl font-semibold text-balance">{head.title}</h1>
      <p className="mt-3 text-lg text-muted">{head.summary}</p>

      {entries.map((entry) => {
        const source = entry.sources;
        const translated = source.source_translations.find((x) => x.locale === locale);
        const body = entry.entry_translations[0];
        const label =
          source.kind === "quran"
            ? `${t.source} — ${source.ref}`
            : `${collectionName[locale][source.collection as "bukhari" | "muslim"]} ${source.ref}`;

        return (
          <section key={entry.position} className="mt-10 border-t border-rule pt-8">
            <p className="source-text">{source.text_original}</p>

            {translated && (
              <p className="mt-4 text-lg">
                “{translated.text}”
                <span className="mt-1 block text-sm text-muted">
                  {t.translated} {translated.translator}
                </span>
              </p>
            )}

            <p className="mt-2 text-sm text-muted">{label}</p>

            <p className="mt-6">{body.body}</p>

            <p className="mt-6 border-s-2 border-foreground ps-4">
              <span className="block text-xs font-semibold tracking-widest uppercase text-muted">
                {t.takeaway}
              </span>
              {body.takeaway}
            </p>
          </section>
        );
      })}

      {/* ponytail: no saved/unsaved state shown — reading it needs cookies, which would
          make this page dynamic and lose static generation. Toggles server-side; add
          an optimistic island if the ambiguity ever bothers anyone. */}
      <form action={toggleSave} className="mt-12 border-t border-rule pt-6">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="slug" value={slug} />
        <button className="border border-rule px-4 py-2 text-sm hover:border-foreground">
          {t.save}
        </button>
      </form>
    </article>
  );
}
