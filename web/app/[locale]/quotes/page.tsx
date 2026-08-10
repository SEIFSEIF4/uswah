import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";
import { GRADES, quotesSorted, type Grade } from "@/lib/content";

const copy = {
  en: {
    title: "Sayings you already know",
    lede: "A phrase in wide circulation, and how the sources treat the same idea. Every one carries the grade of what it is compared against, because a comparison without that is only a claim.",
    key: "Grading",
    pending: "Awaiting a reviewer",
  },
  ar: {
    title: "مقولات تعرفها بالفعل",
    lede: "عبارة منتشرة، وكيف تتناول المصادر المعنى نفسه. ولكل واحدة درجةُ ما قورنت به، لأن مقارنة بلا درجة مجرد دعوى.",
    key: "الدرجة",
    pending: "بانتظار المراجعة",
  },
} as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Quotes({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = copy[locale];

  return (
    <>
      <h1 className="page-title">{t.title}</h1>
      <p className="lede">{t.lede}</p>

      {/* The key is displayed, not tucked into a tooltip. It is the point of the section. */}
      <div className="grade-key">
        <span className="grade-key-label">{t.key}</span>
        {(Object.keys(GRADES) as Grade[]).map((g) => (
          <span key={g} className={`grade grade-${g}`}>
            {GRADES[g][locale]}
          </span>
        ))}
      </div>

      {/* A directory, not the content. Strongest evidence first. */}
      <ol className="quote-index">
        {quotesSorted().map((q) => (
          <li key={q.slug}>
            <Link href={`/${locale}/quotes/${q.slug}`}>
              <span className="saying-q">{q.saying}</span>
              <p>{q[locale].closeness}</p>
              <span className="quote-index-meta">
                <span className={`grade grade-${q.grade}`}>{GRADES[q.grade][locale]}</span>
                {!GRADES[q.grade].storable && <span className="pending">{t.pending}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
