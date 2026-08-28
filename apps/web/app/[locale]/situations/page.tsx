import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";
import { allSituations } from "@/lib/content";
import { LoadMore } from "@/components/load-more";
import { TopicBar } from "@/components/topic-bar";

const copy = {
  en: {
    title: "Situations",
    lede: "Every situation the collection covers, answered from the Quran and Sahih hadith, with the source shown.",
  },
  ar: {
    title: "المواقف",
    lede: "كل موقف تغطيه المجموعة، مجابًا من القرآن والحديث الصحيح، مع المصدر.",
  },
  tr: {
    title: "Durumlar",
    lede: "Derlemenin kapsadığı her durum, Kur'an ve sahih hadisten yanıtlanmış, kaynağı görünür.",
  },
} as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Situations({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = copy[locale];
  const all = await allSituations();

  return (
    <>
      {/* The topic filter, demoted from a masthead item to a filter on this list.
          Topics is a lens on situations now, not a second way in from the front. */}
      <TopicBar locale={locale} />
      <h1 className="page-title" aria-label={`${t.title}, ${all.length}`}>
        {t.title}
        <span className="count" aria-hidden="true">{all.length}</span>
      </h1>
      <p className="lede">{t.lede}</p>

      {/* No section heading between this h1 and the list's own headings, so the rows
          take h2 to avoid skipping a level. */}
      <LoadMore all={all} locale={locale} heading="h2" />
    </>
  );
}
