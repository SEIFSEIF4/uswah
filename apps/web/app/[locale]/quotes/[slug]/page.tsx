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

const copy = {
  en: {
    parallel: "The parallel",
    closeness: "How close it is",
    read: "Read the situation",
    pending: "Awaiting a reviewer",
    pendingWhy:
      "Below the current publishing threshold. Until a scholarly reviewer joins the project, only the Quran and the two Sahih collections are published, so this comparison is shown but not relied on.",
    next: "More sayings",
    back: "All sayings",
  },
  ar: {
    parallel: "الزاوية",
    closeness: "مدى القرب",
    read: "اقرأ الموقف",
    pending: "بانتظار المراجعة",
    pendingWhy:
      "دون عتبة النشر الحالية. وإلى أن ينضم مراجع شرعي إلى المشروع، لا يُنشر إلا القرآن والصحيحان، فهذه المقارنة معروضة لا معتمدة.",
    next: "مقولات أخرى",
    back: "كل المقولات",
  },
  tr: {
    parallel: "Karşılığı",
    closeness: "Ne kadar yakın",
    read: "Durumu oku",
    pending: "Gözden geçirilmeyi bekliyor",
    pendingWhy:
      "Şu anki yayın eşiğinin altında. Projeye ilim ehli bir denetçi katılana kadar yalnızca Kur'an ve iki Sahih yayımlanıyor; bu karşılaştırma gösteriliyor ama dayanak alınmıyor.",
    next: "Başka sözler",
    back: "Bütün sözler",
  },
} as const;

export async function generateStaticParams() {
  return (await allQuotes()).flatMap((q) => LOCALES.map((locale) => ({ locale, slug: q.slug })));
}

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
    title: `${q.saying} · Uswah`,
    description: q[locale].closeness,
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

  return (
    <article className="saying-page">
      <Link href={`/${locale}/quotes`} className="saying-back">
        {t.back}
      </Link>

      {/* The saying is the smallest thing here on purpose: it is what the reader already
          has. The source it is measured against gets the weight. It also keeps LTR in
          Arabic, because it circulates in English and mirroring it would misdescribe it. */}
      <p className="saying-line" dir="ltr">
        {q.saying}
      </p>

      <div className="saying-grade">
        <span className={`grade grade-${q.grade}`}>{grade[locale]}</span>
        <span className="saying-ref">{q.source.label[locale]}</span>
      </div>

      {q.source.original && (
        <section className="source">
          <p className="source-text">{q.source.original}</p>
          {q.source.dorar && <DorarSource dorar={q.source.dorar} locale={locale} />}
        </section>
      )}

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

      {/* Share the link at the reading start, the card at the far end — the same row the
          situation page uses, so the two pages end the same way. */}
      <div className="share-row">
        <Share title={q.saying} locale={locale} />
        <ShareCard
          slug={slug}
          locale={locale}
          saying={q.saying}
          original={q.source.original ?? null}
          grade={GRADES[q.grade][locale]}
          source={q.source.label[locale]}
        />
      </div>

      <h2 className="section-title">{t.next}</h2>
      <ol className="quote-index">
        {more.map((r) => (
          <li key={r.slug}>
            <Link href={`/${locale}/quotes/${r.slug}`}>
              <span className="saying-q">{r.saying}</span>
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
