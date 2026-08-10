import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";
import { situationsByTopic, topicName, TOPICS, type TopicSlug } from "@/lib/content";
import { Row } from "@/components/cards";

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
      <h1 className="page-title">{topicName(topic as TopicSlug, locale)}</h1>
      {items.length === 0 ? (
        <p className="muted">{copy[locale].empty}</p>
      ) : (
        <div className="rows">
          {items.map((s) => (
            <Row key={s.slug} s={s} locale={locale} />
          ))}
        </div>
      )}
    </>
  );
}
