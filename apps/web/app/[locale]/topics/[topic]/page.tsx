import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";
import { allSituations, topicName, TOPICS, type TopicSlug } from "@/lib/content";
import { LoadMore } from "@/components/load-more";
import { TopicBar } from "@/components/topic-bar";

const copy = {
  en: { empty: "Nothing here yet." },
  ar: { empty: "لا شيء هنا بعد." },
  tr: { empty: "Burada henüz bir şey yok." },
} as const;

export function generateStaticParams() {
  return TOPICS.flatMap((t) => LOCALES.map((locale) => ({ locale, topic: t.slug })));
}

export default async function Topic({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  if (!isLocale(locale)) notFound();
  if (!TOPICS.some((t) => t.slug === topic)) notFound();

  const items = (await allSituations()).filter((s) => s.topic === topic);

  return (
    <>
      <TopicBar locale={locale} />
      <h1 className="page-title" aria-label={`${topicName(topic as TopicSlug, locale)}, ${items.length}`}>
        {topicName(topic as TopicSlug, locale)}
        {/* The count is the first thing a filter should answer: how much is behind it. */}
        <span className="count" aria-hidden="true">{items.length}</span>
      </h1>
      {items.length === 0 ? (
        <p className="muted">{copy[locale].empty}</p>
      ) : (
        // No section heading between this h1 and the list's own headings, so the rows
        // take h2 to avoid skipping a level.
        <LoadMore all={items} locale={locale} heading="h2" />
      )}
    </>
  );
}
