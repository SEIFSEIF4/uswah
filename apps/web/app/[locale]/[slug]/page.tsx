import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, RESERVED_SLUGS, type Locale } from "@/lib/i18n";
import { allSituations, relatedSituations, situationBySlug } from "@/lib/content";
import { Byline, Card, Meta, SectionTitle } from "@/components/cards";
import { toggleSave } from "../login/actions";
import { Share } from "@/components/article-parts";
import { SaveButton } from "@/components/save-button";
import { DorarSource } from "@/components/dorar-source";
import { createClient } from "@/lib/supabase/server";

const copy = {
  en: {
    kicker: "All situations",
    takeaway: "What to do",
    translated: "Translated by",
    save: "Save this",
    saved: "Saved",
    saving: "Saving…",
    related: "Next",
  },
  ar: {
    kicker: "كل المواقف",
    takeaway: "ماذا تفعل",
    translated: "ترجمة",
    save: "احفظ",
    saved: "محفوظ",
    saving: "جارٍ الحفظ…",
    related: "التالي",
  },
  tr: {
    kicker: "Bütün durumlar",
    takeaway: "Ne yapmalı",
    translated: "Çeviren",
    save: "Bunu kaydet",
    saved: "Kaydedildi",
    saving: "Kaydediliyor…",
    related: "Sonraki",
  },
} as const;

export async function generateStaticParams() {
  return (await allSituations()).flatMap((s) =>
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
  const s = await situationBySlug(slug);
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

  const s = await situationBySlug(slug);
  if (!s) notFound();

  const t = copy[locale];
  const text = s[locale as Locale];
  const related = await relatedSituations(slug);
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  let saved = false;
  if (claims?.claims?.sub) {
    const { data: situation } = await supabase
      .from("situations")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (situation) {
      const { data: savedRow } = await supabase
        .from("saved_situations")
        .select("situation_id")
        .eq("situation_id", situation.id)
        .maybeSingle();
      saved = Boolean(savedRow);
    }
  }

  return (
    <article className="situation">
      <figure className="art">
        <img src={s.image.url} alt={text.imageAlt} />
        {/* Credit sits with borrowed artwork, always: it is a condition of using it.
            The house's own paintings carry no caption, the way a magazine does not
            credit itself under every illustration. */}
        {!s.image.credit.startsWith("Uswah studio") && (
        <figcaption>
          <a href={s.image.sourceUrl} rel="noreferrer noopener" target="_blank">
            {s.image.credit}
          </a>
          {/* lang="en": text-transform is language-sensitive, and a Turkish uppercase of
              "public-domain" dots the i, PUBLİC-DOMAIN. The token is not Turkish. */}
          <span className="licence" lang="en">
            {s.image.license}
          </span>
        </figcaption>
        )}
      </figure>

      {/* No contents panel: a two-minute read with three sections needs no index.
          The ids on the sections stay, so deep links keep working. */}
      <header className="situation-head">
        {/* A first-time reader who lands here straight from a shared link has no other
            cue that this is one of many, or how to see the rest. */}
        <Link href={`/${locale}/situations`} className="situation-kicker">
          {t.kicker}
        </Link>
        <Meta s={s} locale={locale} />
        <h1>{text.title}</h1>
        <p className="standfirst">{text.summary}</p>
        <Byline s={s} locale={locale} />
      </header>

      <section id="source" className="source">
        <p className="source-text">{s.source.original}</p>
        {/* No translation on the Arabic page: the original is the text, and an English
            block inside an RTL container flips its own quotation marks. */}
        {locale !== "ar" && s.source.translation?.[locale] && (
          <p className="source-translation">
            “{s.source.translation[locale]!.text}”
            <span>
              {t.translated} {s.source.translation[locale]!.translator}
            </span>
          </p>
        )}
        <p className="source-ref">{s.source.label[locale]}</p>
        {s.source.dorar && (
          <DorarSource dorar={s.source.dorar} locale={locale} book={s.source.collection} />
        )}
      </section>

      <div className="prose" id="why">
        <p>{text.body}</p>
      </div>

      <p className="takeaway" id="do">
        <span>{t.takeaway}</span>
        {text.takeaway}
      </p>

      {/* Share and save on one line, save at the far end. They are the two things you
          can do with a situation once you have read it, so they belong on the same rule
          rather than stacked as if one followed the other. */}
      <div className="share-row">
        <Share title={text.title} locale={locale} />

        <form action={toggleSave} className="save">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="slug" value={slug} />
          <SaveButton
            label={t.save}
            savedLabel={t.saved}
            pendingLabel={t.saving}
            saved={saved}
          />
        </form>
      </div>

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
