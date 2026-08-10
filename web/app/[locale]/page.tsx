import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import {
  allSituations,
  bandSituation,
  heroSituation,
  PATHS,
  topicName,
  TOPICS,
} from "@/lib/content";
import { Card, Meta, RoundCard, SectionTitle } from "@/components/cards";
import { Shelf } from "@/components/shelf";

const copy = {
  en: { latest: "Latest", topics: "Where you are", more: "More situations", paths: "Read in order" },
  ar: { latest: "الأحدث", topics: "أين أنت الآن", more: "مواقف أخرى", paths: "اقرأ بالترتيب" },
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

      {/* Paths: a sequence you commit to, with the commitment stated up front. */}
      <SectionTitle>{t.paths}</SectionTitle>
      <div className="paths">
        {PATHS.map((p) => (
          <article key={p.slug} className={`path path-${p.tone}`}>
            <div className="path-art">
              <img src={p.image} alt="" />
              <div className="path-intro">
                <h3>{p[locale].title}</h3>
                <p>{p[locale].blurb}</p>
              </div>
            </div>
            <dl className="path-facts">
              {p[locale].facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <Shelf title={t.more} locale={locale}>
        {rest.slice(3, 9).map((s) => (
          <div key={s.slug} className="shelf-item">
            <Card s={s} locale={locale} />
          </div>
        ))}
      </Shelf>

      <div className="three-up round-row">
        {rest.slice(9).map((s) => (
          <RoundCard key={s.slug} s={s} locale={locale} />
        ))}
      </div>
    </>
  );
}
