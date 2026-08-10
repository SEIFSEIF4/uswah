import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";
import { situationsByTopic, topicName, TOPICS, type TopicSlug } from "@/lib/content";
import { LoadMore } from "@/components/load-more";
import { TopicBar } from "@/components/topic-bar";

const copy = {
  en: { empty: "Nothing here yet." },
  ar: { empty: "لا شيء هنا بعد." },
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

  const items = situationsByTopic(topic as TopicSlug);

  return (
    <>
      <TopicBar locale={locale} />
      <h1 className="page-title">{topicName(topic as TopicSlug, locale)}</h1>
      {items.length === 0 ? (
        <p className="muted">{copy[locale].empty}</p>
      ) : (
        <LoadMore all={items} locale={locale} />
      )}
    </>
  );
}
