import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";
import {
  allQuotes,
  GRADES,
  quoteBySlug,
  relatedQuotes,
  situationBySlug,
} from "@/lib/content";
import { Share } from "@/components/article-parts";
import { ShareCard } from "@/components/share-card";
import { DorarSource } from "@/components/dorar-source";
import { SayingSaveButton } from "@/components/saying-save-button";
import { createClient } from "@/lib/supabase/server";
import { toggleSaveSaying } from "../actions";

const copy = {
  en: {
    parallel: "The parallel",
    closeness: "How close it is",
    read: "Read the situation",
    pending: "Awaiting a reviewer",
    pendingWhy:
      "Below the current publishing threshold. Until a scholarly reviewer joins the project, only the Quran and the two Sahih collections are published, so this comparison is shown but not relied on.",
    next: "More sayings",
    translated: "Translated by",
    save: "Save",
    saved: "Saved",
    saving: "Saving…",
  },
  ar: {
    parallel: "الزاوية",
    closeness: "مدى القرب",
    read: "اقرأ الموقف",
    pending: "بانتظار المراجعة",
    pendingWhy:
      "دون عتبة النشر الحالية. وإلى أن ينضم مراجع شرعي إلى المشروع، لا يُنشر إلا القرآن والصحيحان، فهذه المقارنة معروضة لا معتمدة.",
    next: "مقولات أخرى",
    translated: "ترجمة",
    save: "احفظ",
    saved: "محفوظ",
    saving: "جارٍ الحفظ…",
  },
  tr: {
    parallel: "Karşılığı",
    closeness: "Ne kadar yakın",
    read: "Durumu oku",
    pending: "Gözden geçirilmeyi bekliyor",
    pendingWhy:
      "Şu anki yayın eşiğinin altında. Projeye ilim ehli bir denetçi katılana kadar yalnızca Kur'an ve iki Sahih yayımlanıyor; bu karşılaştırma gösteriliyor ama dayanak alınmıyor.",
    next: "Başka sözler",
    translated: "Çeviren",
    save: "Kaydet",
    saved: "Kaydedildi",
    saving: "Kaydediliyor…",
  },
} as const;

export async function generateStaticParams() {
  return (await allQuotes()).flatMap((q) => LOCALES.map((locale) => ({ locale, slug: q.slug })));
}

/* Social previews show ~125 characters and cut mid-word past that; trimming at a
   word boundary here keeps the card's sentence whole. */
const social = (s: string) =>
  s.length <= 120 ? s : `${s.slice(0, 119).replace(/\s+\S*$/, "")}…`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const q = await quoteBySlug(slug);
  if (!q) return {};

  const publishable = GRADES[q.grade].storable;

  return {
    title: `${q[locale].saying ?? q.saying} · Uswah`,
    description: social(q[locale].closeness),
    alternates: {
      canonical: `/${locale}/quotes/${slug}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/quotes/${slug}`])),
    },
    // Shown to anyone who follows a link, kept out of search until a reviewer has seen it.
    // Publishing an unreviewed comparison is honest; letting it become a top search result
    // for the phrase is a different risk. Flip this once the reviewer exists.
    robots: publishable ? undefined : { index: false, follow: true },
  };
}

export default async function Saying({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const q = await quoteBySlug(slug);
  if (!q) notFound();

  const t = copy[locale];
  const grade = GRADES[q.grade];
  const situation = q.situation ? await situationBySlug(q.situation) : undefined;
  const more = await relatedQuotes(slug);
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  let saved = false;
  if (claims?.claims?.sub) {
    const { data: saying, error: sayingError } = await supabase
      .from("sayings")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (sayingError) throw sayingError;
    if (saying) {
      const { data: savedRow, error: savedError } = await supabase
        .from("saved_sayings")
        .select("saying_id")
        .eq("saying_id", saying.id)
        .maybeSingle();
      if (savedError) throw savedError;
      saved = Boolean(savedRow);
    }
  }

  return (
    <article className="saying-page">
      {/* No back link: the masthead's Sayings link is lit on this page and is the way back. */}
      {/* The saying is the smallest thing here on purpose: it is what the reader already
          has. The source it is measured against gets the weight. Each locale shows the
          native equivalent it actually knows, falling back to the canonical form;
          dir="auto" lets the text set its own direction either way. */}
      <p className="saying-line" dir="auto">
        {q[locale].saying ?? q.saying}
      </p>

      {/* The reference lives inside the source block, under the text it references,
          the same way the situation pages carry theirs. Floating it on the page
          ground made the Quran pages look unlike the hadith ones. */}
      <section className="source">
        {q.source.original && <p className="source-text">{q.source.original}</p>}
        {/* No translation on the Arabic page: the original is the text. Same rule
            and same markup as the situation pages. */}
        {locale !== "ar" && q.source.translation?.[locale] && (
          <p className="source-translation">
            “{q.source.translation[locale]!.text}”
            <span>
              {t.translated} {q.source.translation[locale]!.translator}
            </span>
          </p>
        )}
        <p className="source-ref">{q.source.label[locale]}</p>
        {q.source.dorar && (
          <DorarSource
            dorar={q.source.dorar}
            locale={locale}
            /* Sayings have no structured collection column; the English label's
               prefix names it when it is one whose book record we hold. */
            book={
              q.source.label.en.startsWith("Sahih al-Bukhari")
                ? "bukhari"
                : q.source.label.en.startsWith("Sahih Muslim")
                  ? "muslim"
                  : undefined
            }
          />
        )}
      </section>

      <section className="saying-block">
        <h2>{t.parallel}</h2>
        <p>{q[locale].angle}</p>
      </section>

      {/* The focal moment: the only place the product speaks rather than quotes. */}
      <p className="verdict">
        <span>{t.closeness}</span>
        {q[locale].closeness}
      </p>

      {!grade.storable && (
        <aside className="pending-note">
          <strong>{t.pending}</strong>
          <p>{t.pendingWhy}</p>
        </aside>
      )}

      {situation && (
        <Link href={`/${locale}/${situation.slug}`} className="saying-cta">
          <span>{t.read}</span>
          <strong>{situation[locale].title}</strong>
        </Link>
      )}

      {/* Share the link at the reading start, the card at the far end, the same row the
          situation page uses, so the two pages end the same way. */}
      <div className="share-row">
        <Share title={q[locale].saying ?? q.saying} locale={locale} />
        <div className="quote-actions">
          <ShareCard
            slug={slug}
            locale={locale}
            saying={q[locale].saying ?? q.saying}
            original={q.source.original ?? null}
            /* Same rule as the source block above: on the Arabic page the original is
               the text, so there is no translation to offer the card either. */
            translation={locale === "ar" ? null : (q.source.translation?.[locale] ?? null)}
            grade={GRADES[q.grade][locale]}
            source={q.source.label[locale]}
          />
          <form action={toggleSaveSaying}>
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="slug" value={slug} />
            <SayingSaveButton
              label={t.save}
              savedLabel={t.saved}
              pendingLabel={t.saving}
              saved={saved}
            />
          </form>
        </div>
      </div>

      <h2 className="section-title">{t.next}</h2>
      <ol className="quote-index">
        {more.map((r) => (
          <li key={r.slug}>
            <Link href={`/${locale}/quotes/${r.slug}`}>
              <span className="saying-q" dir="auto">{r[locale].saying ?? r.saying}</span>
              <span className="quote-index-meta">
                <span className={`grade grade-${r.grade}`}>{GRADES[r.grade][locale]}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </article>
  );
}
