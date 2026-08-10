import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import {
  allSituations,
  bandSituation,
  heroSituation,
  topicName,
  TOPICS,
} from "@/lib/content";
import { Card, Meta, RoundCard, SectionTitle } from "@/components/cards";

const copy = {
  en: { latest: "Latest", topics: "Where you are", more: "More situations", all: "All in" },
  ar: { latest: "الأحدث", topics: "أين أنت الآن", more: "مواقف أخرى", all: "كل ما في" },
} as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = copy[locale];
  const hero = heroSituation();
  const band = bandSituation();
  const rest = allSituations().filter((s) => s.slug !== hero.slug && s.slug !== band?.slug);

  return (
    <>
      <Link href={`/${locale}/${hero.slug}`} className="hero">
        <img src={hero.image.url} alt={hero[locale].imageAlt} />
        <div className="hero-text">
          <h1>{hero[locale].title}</h1>
          <p>{hero[locale].summary}</p>
          <Meta s={hero} locale={locale} />
        </div>
      </Link>

      <SectionTitle>{t.latest}</SectionTitle>
      <div className="three-up">
        {rest.slice(0, 3).map((s) => (
          <Card key={s.slug} s={s} locale={locale} />
        ))}
      </div>

      <SectionTitle>{t.topics}</SectionTitle>
      <nav className="topic-strip">
        {TOPICS.map((topic) => (
          <Link key={topic.slug} href={`/${locale}/topics/${topic.slug}`}>
            {topicName(topic.slug, locale)}
          </Link>
        ))}
      </nav>

      {band && (
        <Link href={`/${locale}/${band.slug}`} className="band">
          <img src={band.image.url} alt={band[locale].imageAlt} />
          <div className="band-text">
            <h2>{band[locale].title}</h2>
            <p>{band[locale].summary}</p>
            <Meta s={band} locale={locale} />
          </div>
        </Link>
      )}

      <SectionTitle>{t.more}</SectionTitle>
      <div className="three-up round-row">
        {rest.slice(3, 6).map((s) => (
          <RoundCard key={s.slug} s={s} locale={locale} />
        ))}
      </div>

      <div className="three-up">
        {rest.slice(6).map((s) => (
          <Card key={s.slug} s={s} locale={locale} />
        ))}
      </div>
    </>
  );
}
