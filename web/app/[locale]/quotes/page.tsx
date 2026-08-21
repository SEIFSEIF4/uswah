import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";
import { GRADES, quotesSorted } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

const copy = {
  en: {
    title: "Sayings you already know",
    lede: "A phrase in wide circulation, and how the sources treat the same idea. Each carries the grade of what it is compared against.",
    pending: "Awaiting a reviewer",
    credit: "Hadith texts and gradings are quoted verbatim from the Hadith Encyclopedia at",
  },
  ar: {
    title: "مقولات تعرفها بالفعل",
    lede: "عبارة منتشرة، وكيف تتناول المصادر المعنى نفسه. ولكل واحدة درجةُ ما قورنت به، لأن مقارنة بلا درجة مجرد دعوى.",
    pending: "بانتظار المراجعة",
    credit: "نصوص الأحاديث وأحكامها منقولة حرفيًا من الموسوعة الحديثية في",
  },
  tr: {
    title: "Zaten bildiğin sözler",
    lede: "Yaygın dolaşan bir söz ve kaynakların aynı fikri nasıl ele aldığı. Her biri karşılaştırıldığı kaynağın derecesini taşır.",
    pending: "Gözden geçirilmeyi bekliyor",
    credit: "Hadis metinleri ve dereceleri, olduğu gibi şu kaynaktan alınmıştır:",
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

      {/* A directory, not the content. Strongest evidence first. */}
      <ol className="quote-index">
        {quotesSorted().map((q) => (
          <li key={q.slug}>
            <Link href={`/${locale}/quotes/${q.slug}`}>
              <div className="quote-index-text">
                <span className="saying-q">{q.saying}</span>
                <p>{q[locale].closeness}</p>
              </div>
              <span className="quote-index-meta">
                <Badge variant="outline" className={`grade grade-${q.grade}`}>
                  {GRADES[q.grade][locale]}
                </Badge>
                {!GRADES[q.grade].storable && <span className="pending">{t.pending}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* The debt is named where it is owed: every grading on this surface is theirs. */}
      <p className="dorar-note">
        {t.credit}{" "}
        <a href="https://dorar.net" target="_blank" rel="noreferrer">
          Dorar.net · الدرر السنية
        </a>
      </p>
    </>
  );
}
