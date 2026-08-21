import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";
import { situationsByTopic, topicName, TOPICS } from "@/lib/content";

const copy = {
  en: {
    title: "All topics",
    lede: "Every subject the collection covers, and what sits behind each one.",
    empty: "Nothing here yet.",
  },
  ar: {
    title: "كل المواضيع",
    lede: "كل موضوع تغطيه المجموعة، وما وراء كل واحد منها.",
    empty: "لا شيء هنا بعد.",
  },
  tr: {
    title: "Tüm konular",
    lede: "Derlemenin kapsadığı her konu ve her birinin arkasında ne olduğu.",
    empty: "Burada henüz bir şey yok.",
  },
} as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Topics({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = copy[locale];

  return (
    <>
      <h1 className="page-title">
        {t.title}
        <span className="count">{TOPICS.length}</span>
      </h1>
      <p className="lede">{t.lede}</p>

      {/* A directory, built like the sayings index because it is the same object: a list
          of ways in, not the content. No artwork — a topic has none of its own, and
          borrowing a painting from one situation inside it puts a caravanserai in front
          of "money" as though that were what the subject looks like. */}
      <ol className="topic-index">
        {TOPICS.map((topic) => {
          const items = situationsByTopic(topic.slug);
          return (
            <li key={topic.slug}>
              <Link href={`/${locale}/topics/${topic.slug}`}>
                <h2>
                  {topicName(topic.slug, locale)}
                  <span className="count">{items.length}</span>
                </h2>
                {/* The titles are the argument for opening it. A number alone says how
                    much, never what. */}
                <p>
                  {items.length === 0
                    ? t.empty
                    : items.map((s) => s[locale].title).join(" · ")}
                </p>
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}
