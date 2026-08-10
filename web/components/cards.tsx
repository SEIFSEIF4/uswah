import Link from "next/link";
import type { Situation } from "@/lib/content";
import { topicName } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const minutesLabel = (n: number, locale: Locale) =>
  locale === "ar" ? `${n} دقائق قراءة` : `${n} min read`;

/** Category · read time. The one structural device repeated across every card. */
export function Meta({ s, locale }: { s: Situation; locale: Locale }) {
  return (
    <div className="meta">
      <span className="topic">{topicName(s.topic, locale)}</span>
      <span aria-hidden="true">·</span>
      <span>{minutesLabel(s.minutes, locale)}</span>
    </div>
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

/** Circular thumbnail variant, for the secondary rail. */
export function RoundCard({ s, locale }: { s: Situation; locale: Locale }) {
  return (
    <Link href={`/${locale}/${s.slug}`} className="card round">
      <img src={s.image.url} alt={s[locale].imageAlt} loading="lazy" />
      <Meta s={s} locale={locale} />
      <h3>{s[locale].title}</h3>
    </Link>
  );
}

/** Text-only row, for lists where the artwork would just be noise. */
export function Row({ s, locale }: { s: Situation; locale: Locale }) {
  return (
    <Link href={`/${locale}/${s.slug}`} className="listrow">
      <img src={s.image.url} alt={s[locale].imageAlt} loading="lazy" />
      <div>
        <Meta s={s} locale={locale} />
        <h3>{s[locale].title}</h3>
        <p>{s[locale].summary}</p>
      </div>
    </Link>
  );
}

/** Section heading with a rule running to the edge of the column. */
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}
