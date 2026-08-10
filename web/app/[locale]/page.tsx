import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import {
  allSituations,
  bandSituation,
  GRADES,
  heroSituation,
  PATHS,
  quotesSorted,
  topicName,
  TOPICS,
} from "@/lib/content";
import { Card, Meta, RoundCard, SectionTitle } from "@/components/cards";
import { Shelf } from "@/components/shelf";

const copy = {
  en: {
    latest: "Latest",
    topics: "Where you are",
    more: "More situations",
    paths: "Read in order",
    sayings: "Sayings you already know",
    allSayings: "All sayings",
    browse: "Browse everything",
  },
  ar: {
    latest: "الأحدث",
    topics: "أين أنت الآن",
    more: "مواقف أخرى",
    paths: "اقرأ بالترتيب",
    sayings: "مقولات تعرفها بالفعل",
    allSayings: "كل المقولات",
    browse: "تصفّح كل شيء",
  },
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
      {/* 1. The front. Artwork at full width, one situation, nothing competing. */}
      <Link href={`/${locale}/${hero.slug}`} className="hero">
        <img src={hero.image.url} alt={hero[locale].imageAlt} />
        <div className="hero-text">
          <h1>{hero[locale].title}</h1>
          <p>{hero[locale].summary}</p>
          <Meta s={hero} locale={locale} />
        </div>
      </Link>

      {/* 2. Latest, on the page ground. The default rhythm everything else departs from. */}
      <SectionTitle>{t.latest}</SectionTitle>
      <div className="three-up">
        {rest.slice(0, 3).map((s) => (
          <Card key={s.slug} s={s} locale={locale} />
        ))}
      </div>

      {/* 3. Topics, on warm paper. A navigation break rather than more reading. */}
      <section className="band-section tone-warm">
        <SectionTitle>{t.topics}</SectionTitle>
        <nav className="topic-strip">
          {TOPICS.map((topic) => (
            <Link key={topic.slug} href={`/${locale}/topics/${topic.slug}`}>
              {topicName(topic.slug, locale)}
            </Link>
          ))}
        </nav>
      </section>

      {/* 4. One feature, breaking the grid. */}
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

      {/* 5. Sayings, in type alone. No artwork, because the section is about words. */}
      <section className="band-section tone-paper">
        <SectionTitle>{t.sayings}</SectionTitle>
        {(() => {
          // Best-graded first: the section leads on its strongest evidence rather than
          // presenting three comparisons as if they carried equal weight.
          const [lead, ...others] = quotesSorted().slice(0, 3);
          return (
            <div className="sayings-lead-layout">
              <Link href={`/${locale}/quotes/${lead.slug}`} className="saying saying-lead">
                <span className="saying-q">{lead.saying}</span>
                <p className="saying-verdict">{lead[locale].closeness}</p>
                <span className="saying-meta">
                  <span className={`grade grade-${lead.grade}`}>{GRADES[lead.grade][locale]}</span>
                  {lead.source.label[locale]}
                </span>
              </Link>
              <ul className="saying-rest">
                {others.map((q) => (
                  <li key={q.slug}>
                    <Link href={`/${locale}/quotes/${q.slug}`}>
                      <span className="saying-q">{q.saying}</span>
                      <span className={`grade grade-${q.grade}`}>{GRADES[q.grade][locale]}</span>
                    </Link>
                  </li>
                ))}
                <li className="saying-rest-all">
                  <Link href={`/${locale}/quotes`}>{t.allSayings}</Link>
                </li>
              </ul>
            </div>
          );
        })()}
      </section>

      {/* 6. Paths, on ink. A commitment, so it looks unlike the browsing above it. */}
      <section className="band-section tone-ink">
        <SectionTitle>{t.paths}</SectionTitle>
        <ol className="path-rows">
          {PATHS.map((p, i) => (
            <li key={p.slug}>
              <span className="path-n">{String(i + 1).padStart(2, "0")}</span>
              <div className="path-row-main">
                <h3>{p[locale].title}</h3>
                <p>{p[locale].blurb}</p>
              </div>
              <dl className="path-row-facts">
                {p[locale].facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
      </section>

      {/* 7. The long tail, as a shelf you push through rather than a grid you scan. */}
      <Shelf title={t.more} locale={locale}>
        {rest.slice(3, 9).map((s) => (
          <div key={s.slug} className="shelf-item">
            <Card s={s} locale={locale} />
          </div>
        ))}
      </Shelf>

      {/* 8. A closing rail, circular, so the page ends on a different shape. */}
      <section className="band-section tone-warm">
        <SectionTitle>{t.browse}</SectionTitle>
        <div className="three-up round-row">
          {rest.slice(9).map((s) => (
            <RoundCard key={s.slug} s={s} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
