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
} as const;

export function generateStaticParams() {
  return allQuotes().flatMap((q) => LOCALES.map((locale) => ({ locale, slug: q.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const q = quoteBySlug(slug);
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

  const q = quoteBySlug(slug);
  if (!q) notFound();

  const t = copy[locale];
  const grade = GRADES[q.grade];
  const situation = q.situation ? situationBySlug(q.situation) : undefined;
  const more = relatedQuotes(slug);

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

      <Share title={q.saying} locale={locale} />

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
