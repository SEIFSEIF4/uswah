import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";
import { allQuotes, GRADES, situationBySlug, type Grade } from "@/lib/content";

const copy = {
  en: {
    title: "Sayings you already know",
    lede: "A phrase in wide circulation, and how the sources treat the same idea. Every one carries the grade of what it is compared against, because a comparison without that is just a claim.",
    angle: "The parallel",
    closeness: "How close it is",
    key: "Grading",
    read: "Read the situation",
    unstorable: "Below the current publishing threshold",
  },
  ar: {
    title: "مقولات تعرفها بالفعل",
    lede: "عبارة منتشرة، وكيف تتناول المصادر المعنى نفسه. ولكل واحدة درجةُ ما قورنت به، لأن مقارنة بلا درجة مجرد دعوى.",
    angle: "الزاوية",
    closeness: "مدى القرب",
    key: "الدرجة",
    read: "اقرأ الموقف",
    unstorable: "دون عتبة النشر الحالية",
  },
} as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

function GradeChip({ grade, locale }: { grade: Grade; locale: "en" | "ar" }) {
  const g = GRADES[grade];
  return (
    <span className={`grade grade-${grade}`} title={g.storable ? undefined : copy[locale].unstorable}>
      {g[locale]}
      {!g.storable && <span aria-hidden="true"> ·</span>}
    </span>
  );
}

export default async function Quotes({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = copy[locale];

  return (
    <>
      <h1 className="page-title">{t.title}</h1>
      <p className="lede">{t.lede}</p>

      {/* The key is on the page, not in a tooltip. It is the point of the section. */}
      <div className="grade-key">
        <span className="grade-key-label">{t.key}</span>
        {(Object.keys(GRADES) as Grade[]).map((g) => (
          <GradeChip key={g} grade={g} locale={locale} />
        ))}
      </div>

      <div className="quotes">
        {allQuotes().map((q) => {
          const situation = q.situation ? situationBySlug(q.situation) : undefined;
          return (
            <article key={q.slug} className="quote">
              <blockquote>{q.saying}</blockquote>

              <div className="quote-body">
                <div>
                  <h2>{t.angle}</h2>
                  <p>{q[locale].angle}</p>
                  {q.source.original && <p className="source-text small">{q.source.original}</p>}
                  <p className="source-ref">
                    {q.source.label[locale]} <GradeChip grade={q.grade} locale={locale} />
                  </p>
                </div>

                <div>
                  <h2>{t.closeness}</h2>
                  <p>{q[locale].closeness}</p>
                  {situation && (
                    <Link href={`/${locale}/${situation.slug}`} className="quote-link">
                      {t.read} →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
