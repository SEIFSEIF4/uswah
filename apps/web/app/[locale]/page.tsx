import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import {
  allSituations,
  featuredIntentions,
  GRADES,
  quotesSorted,
  topicName,
  TOPICS,
} from "@/lib/content";
import { Card, Meta, SectionTitle } from "@/components/cards";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Shelf } from "@/components/shelf";

const copy = {
  en: {
    latest: "Latest",
    what: "Practical guidance for real situations, answered from the Quran and Sahih hadith, with the source shown.",
    intentions: "The same day, differently",
    allIntentions: "All intentions",
    more: "More situations",
    sayings: "Sayings you already know",
    allSayings: "All sayings",
    browse: "Browse everything",
  },
  ar: {
    latest: "الأحدث",
    what: "إرشاد عملي لمواقف حقيقية، من القرآن والحديث الصحيح، والمصدر ظاهر.",
    intentions: "اليوم نفسه، بنيّة أخرى",
    allIntentions: "كل النيّات",
    more: "مواقف أخرى",
    sayings: "مقولات تعرفها بالفعل",
    allSayings: "كل المقولات",
    browse: "تصفّح كل شيء",
  },
  tr: {
    latest: "En yeni",
    what: "Gerçek durumlar için pratik rehberlik: Kur'an ve sahih hadisten, kaynağı görünür.",
    intentions: "Aynı gün, başka türlü",
    allIntentions: "Bütün niyetler",
    more: "Başka durumlar",
    sayings: "Zaten bildiğin sözler",
    allSayings: "Bütün sözler",
    browse: "Hepsine göz at",
  },
} as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = copy[locale];
  const all = await allSituations();
  const hero = all.find((s) => s.feature === "hero") ?? all[0];
  if (!hero) notFound(); // an empty database has no front page
  const rest = all.filter((s) => s.slug !== hero.slug);

  return (
    <>
      {/* 0. What this is. The premise was stated in the metadata and nowhere a reader
             could see it, so the front door asked visitors to infer the organising idea
             from a grid of paintings. One sentence, and it is the page's h1: the home
             page should announce the site, not whichever situation is featured today. */}
      <h1 className="intro">{t.what}</h1>

      {/* 1. The front. Artwork at full width, one situation, nothing competing. */}
      <Link href={`/${locale}/${hero.slug}`} className="hero">
        <img src={hero.image.url} alt={hero[locale].imageAlt} />
        <div className="hero-text">
          <h2>{hero[locale].title}</h2>
          <p>{hero[locale].summary}</p>
          <Meta s={hero} locale={locale} topic={false} />
        </div>
      </Link>

      {/* 2. Latest, on the page ground. The default rhythm everything else departs from. */}
      <SectionTitle>{t.latest}</SectionTitle>
      <div className="three-up">
        {rest.slice(0, 3).map((s) => (
          <Card key={s.slug} s={s} locale={locale} />
        ))}
      </div>

      {/* 4. Intentions. The header links to Nawiya and the home page never mentioned it,
             so the surface existed with no way in from the front. Four acts, the turn, and
             the intention — enough to show what the section is, not to be it. */}
      <SectionTitle>{t.intentions}</SectionTitle>
      <ul className="intent-list">
        {(await featuredIntentions()).map((i) => (
          <li key={i.slug}>
            <span className="intent-act">{i.act[locale]}</span>
            <span className="intent-turn" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d={locale === "ar" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="intent-main">
              <p className="intent-line">{i[locale].intention}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="quote-index-all">
        <Button variant="arrow" render={<Link href={`/${locale}/intentions`} />}>
          <span>{t.allIntentions}</span>
          <ButtonArrow />
        </Button>
      </p>

      {/* 5. Sayings, in type alone. No artwork, because the section is about words.

             Three equal rows rather than one lead beside a stub list. The old split gave
             the first saying a paragraph and the other two a bare line, which read as a
             ranking the grades do not support, and left a trench of white space down the
             middle. Rows also match the sayings index they lead to, so arriving there is
             not a change of subject. */}
      <section className="band-section">
        <SectionTitle>{t.sayings}</SectionTitle>
        <ol className="quote-index">
          {(await quotesSorted())
            .slice(0, 3)
            .map((q) => (
              <li key={q.slug}>
                <Link href={`/${locale}/quotes/${q.slug}`}>
                  <div className="quote-index-text">
                    <span className="saying-q" dir="auto">{q[locale].saying ?? q.saying}</span>
                    <p>{q[locale].closeness}</p>
                  </div>
                  <span className="quote-index-meta">
                    <span className={`grade grade-${q.grade}`}>{GRADES[q.grade][locale]}</span>
                    {q.source.label[locale]}
                  </span>
                </Link>
              </li>
            ))}
        </ol>
        <p className="quote-index-all">
          <Button variant="arrow" render={<Link href={`/${locale}/quotes`} />}>
            <span>{t.allSayings}</span>
            <ButtonArrow />
          </Button>
        </p>
      </section>

      {/* 7. The long tail, as a shelf you push through rather than a grid you scan. */}
      <Shelf title={t.more} locale={locale}>
        {rest.slice(3, 9).map((s) => (
          <div key={s.slug} className="shelf-item">
            <Card s={s} locale={locale} />
          </div>
        ))}
      </Shelf>

      {/* 8. The closing rail, the Thmanyah shape: six category tiles beside two reads.
             The tiles are artwork and a label only — a category is a door, and a door
             does not need a summary. Three reads: four ran the column past the tiles,
             and the two heights will never match exactly anyway, since a read's height
             follows how far its summary wraps. It ends the page on navigation
             rather than on more of the same list, which is what a curated front does.

             It mirrors, like everything else. The categories sit at the reading end and
             the reads at the reading start, which puts the tiles right in English and
             left in Arabic. Pinning them to a physical side got English right by
             accident and Arabic wrong. */}
      <section className="band-section tone-warm">
        <SectionTitle>{t.browse}</SectionTitle>
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
          <ul className="flex list-none flex-col gap-6 p-0">
            {rest.slice(-3).map((s) => (
              <li key={s.slug}>
                {/* Thumbnail first, so it sits at the reading edge and the copy runs
                    away from it in both directions. Pinning it right suited Arabic only,
                    where right is where reading starts; in English the same position is
                    the end, and the ragged edge left the image stranded. */}
                <Link href={`/${locale}/${s.slug}`} className="group flex gap-4">
                  <img
                    src={s.image.url}
                    alt={s[locale].imageAlt}
                    loading="lazy"
                    className="size-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg leading-snug group-hover:underline group-hover:underline-offset-4">
                      {s[locale].title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {s[locale].summary}
                    </p>
                    <Meta s={s} locale={locale} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3">
            {TOPICS.map((topic) => {
              // Stand-in artwork: the topic borrows from its newest situation.
              const art = all.find((s) => s.topic === topic.slug)?.image;
              return (
                <li key={topic.slug}>
                  <Link href={`/${locale}/topics/${topic.slug}`} className="group block">
                    {/* Decorative: the label underneath already names the category. */}
                    <img
                      src={art?.url}
                      alt=""
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-xl object-cover"
                    />
                    <span className="mt-2 block text-sm text-muted-foreground group-hover:text-foreground">
                      {topicName(topic.slug, locale)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

        </div>
      </section>
    </>
  );
}
