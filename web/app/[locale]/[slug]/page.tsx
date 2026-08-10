import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, RESERVED_SLUGS, type Locale } from "@/lib/i18n";
import { allSituations, relatedSituations, situationBySlug } from "@/lib/content";
import { Card, Meta, SectionTitle } from "@/components/cards";
import { toggleSave } from "../login/actions";

const copy = {
  en: { takeaway: "What to do", translated: "Translated by", save: "Save this", related: "Next" },
  ar: { takeaway: "ماذا تفعل", translated: "ترجمة", save: "احفظ", related: "التالي" },
} as const;

export function generateStaticParams() {
  return allSituations().flatMap((s) => LOCALES.map((locale) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const s = situationBySlug(slug);
  if (!s) return {};
  return {
    title: `${s[locale].title} · Uswah`,
    description: s[locale].summary,
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

  const s = situationBySlug(slug);
  if (!s) notFound();

  const t = copy[locale];
  const text = s[locale as Locale];
  const related = relatedSituations(slug);

  return (
    <article className="situation">
      <figure className="art">
        <img src={s.image.url} alt={text.imageAlt} />
        {/* Credit sits with the artwork, always. It is a condition of using it. */}
        <figcaption>
          <a href={s.image.sourceUrl} rel="noreferrer noopener" target="_blank">
            {s.image.credit}
          </a>
          <span className="licence">{s.image.license}</span>
        </figcaption>
      </figure>

      <header className="situation-head">
        <Meta s={s} locale={locale} />
        <h1>{text.title}</h1>
        <p className="standfirst">{text.summary}</p>
      </header>

      <section className={`source${s.source.placeholder ? " is-placeholder" : ""}`}>
        <p className="source-text">{s.source.original}</p>
        {/* No translation on the Arabic page: the original is the text, and an English
            block inside an RTL container flips its own quotation marks. */}
        {locale !== "ar" && s.source.translation && (
          <p className="source-translation">
            “{s.source.translation.text}”
            <span>
              {t.translated} {s.source.translation.translator}
            </span>
          </p>
        )}
        <p className="source-ref">{s.source.label[locale]}</p>
      </section>

      <div className="prose">
        <p>{text.body}</p>
      </div>

      <p className="takeaway">
        <span>{t.takeaway}</span>
        {text.takeaway}
      </p>

      <form action={toggleSave} className="save">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="slug" value={slug} />
        <button>{t.save}</button>
      </form>

      {related.length > 0 && (
        <>
          <SectionTitle>{t.related}</SectionTitle>
          <div className="three-up">
            {related.map((r) => (
              <Card key={r.slug} s={r} locale={locale} />
            ))}
          </div>
        </>
      )}
    </article>
  );
}
