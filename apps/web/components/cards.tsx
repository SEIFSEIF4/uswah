import Link from "next/link";
import type { Situation } from "@/lib/content";
import { topicName } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/* The reading time is an estimate and says so. Latin marks that with a tilde; Arabic
   has no such convention, so it gets the word. */
const MINUTES = {
  en: (n: number) => `~${n} min read`,
  ar: (n: number) => `نحو ${n} دقائق قراءة`,
  tr: (n: number) => `~${n} dk okuma`,
} as const;

const minutesLabel = (n: number, locale: Locale) => MINUTES[locale](n);

/** Drawn rather than an icon dependency, at the same 1.7 stroke as the search glass. */
function Clock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v5.2l3.3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Category · read time. The one structural device repeated across every card.
 *
 * `topic={false}` over artwork: a small accent word cannot hold its own against
 * photographic detail, and the hero is meant to carry one situation with nothing
 * competing. The category is a click away in the header and repeats on every card.
 */
export function Meta({
  s,
  locale,
  topic = true,
}: {
  s: Situation;
  locale: Locale;
  topic?: boolean;
}) {
  return (
    <div className="meta">
      {topic && (
        <>
          <span className="topic">{topicName(s.topic, locale)}</span>
          <span aria-hidden="true">·</span>
        </>
      )}
      <span className="clock">
        <Clock />
        {minutesLabel(s.minutes, locale)}
      </span>
    </div>
  );
}

const BYLINE = {
  en: { by: "Reviewed by", unverified: "Not verified" },
  ar: { by: "راجعه", unverified: "غير مُتحقَّق منه" },
  tr: { by: "Doğrulayan", unverified: "Doğrulanmadı" },
} as const;

/* Arabic script with Latin digits: an Arabic numbering system would render the date in
   Arabic-Indic numerals, which the rest of the page does not use. */
const formatDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale === "ar" ? "ar-u-nu-latn" : locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));

/**
 * Who checked this against the collection, and when.
 *
 * The whole product rests on a verified source, and until now the reader was asked to
 * take that on trust. An unreviewed entry says so in the same place, loudly, a byline
 * that quietly went missing would read as an oversight rather than as a warning.
 */
export function Byline({ s, locale }: { s: Situation; locale: Locale }) {
  const t = BYLINE[locale];
  const unverified = s.reviewedBy === "UNVERIFIED";

  return (
    <p className={`byline${unverified ? " is-unverified" : ""}`}>
      {unverified ? (
        <span className="byline-flag">{t.unverified}</span>
      ) : (
        <span>
          {t.by} <strong>{s.reviewedBy}</strong>
        </span>
      )}
      <span aria-hidden="true">·</span>
      <time dateTime={s.publishedAt}>{formatDate(s.publishedAt, locale)}</time>
    </p>
  );
}

/** Standard card: image above, then category, title, summary. Used in the three-up rows. */
export function Card({ s, locale }: { s: Situation; locale: Locale }) {
  return (
    <Link href={`/${locale}/${s.slug}`} className="card">
      <img src={s.image.url} alt={s[locale].imageAlt} loading="lazy" />
      <Meta s={s} locale={locale} />
      <h3>{s[locale].title}</h3>
      <p>{s[locale].summary}</p>
    </Link>
  );
}

/**
 * Text-only row, for lists where the artwork would just be noise.
 *
 * `heading` defaults to h3 for the common case (a row nested under a section's own h2).
 * The situations and per-topic listings have no such h2 between their page h1 and the
 * first row, so they pass h2 to avoid skipping a level.
 */
export function Row({
  s,
  locale,
  heading = "h3",
}: {
  s: Situation;
  locale: Locale;
  heading?: "h2" | "h3";
}) {
  const Heading = heading;
  return (
    <Link href={`/${locale}/${s.slug}`} className="listrow">
      <img src={s.image.url} alt={s[locale].imageAlt} loading="lazy" />
      <div>
        <Meta s={s} locale={locale} />
        <Heading>{s[locale].title}</Heading>
        <p>{s[locale].summary}</p>
      </div>
    </Link>
  );
}

/** Section heading with a rule running to the edge of the column. */
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}
