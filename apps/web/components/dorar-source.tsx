import type { Locale } from "@/lib/i18n";
import { dirFor } from "@/lib/i18n";
import {
  APPARATUS_GRADES,
  APPARATUS_NAMES,
  type BookKey,
  type DorarRef,
} from "@/lib/dorar";
import { SourceBook } from "@/components/source-book";

const LABEL: Record<Locale, string> = {
  en: "Text and grading: the Hadith Encyclopedia, Dorar.net",
  ar: "النص والحكم: الموسوعة الحديثية، الدرر السنية",
  tr: "Metin ve derece: Hadis Ansiklopedisi, Dorar.net",
};

/* The field labels, in the reader's language: they are ours, not dorar's. */
const FIELDS: Record<Locale, { rawi: string; mohdith: string; source: string; number: string; grade: string }> = {
  en: { rawi: "Narrator", mohdith: "Graded by", source: "Source", number: "Page or number", grade: "Ruling" },
  ar: { rawi: "الراوي", mohdith: "المحدث", source: "المصدر", number: "الصفحة أو الرقم", grade: "خلاصة الحكم" },
  tr: { rawi: "Râvi", mohdith: "Muhaddis", source: "Kaynak", number: "Sayfa veya numara", grade: "Hüküm" },
};

/**
 * The dorar.net apparatus for a cited hadith, laid out the way dorar lays it out:
 * labelled fields, then the topical chips, then the credit linking to their
 * permalink. The hadith text above stays Arabic because it is the source; the
 * apparatus does not, so English and Turkish pages get translated labels and
 * transliterated names (Arabic fallback for a name outside the map). The chips
 * are dorar's Arabic taxonomy with no translation, so only the Arabic page
 * carries them. التخريج stays in the data but off the page. Shared by the
 * saying and situation pages so the two source blocks cannot drift apart.
 */
export function DorarSource({
  dorar,
  locale,
  number,
  book,
}: {
  dorar: DorarRef;
  locale: Locale;
  /** The cited row's page-or-number, dorar's الصفحة أو الرقم. */
  number?: string;
  /** The collection, when it is one whose record we hold; opens the book card. */
  book?: BookKey;
}) {
  const t = FIELDS[locale];
  const dir = dirFor(locale);
  const name = (ar: string) => (locale === "ar" ? ar : (APPARATUS_NAMES[ar]?.[locale] ?? ar));
  const grade = locale === "ar" ? dorar.grade : (APPARATUS_GRADES[dorar.grade]?.[locale] ?? dorar.grade);

  /* One chip per top-level theme (the part before the dash): dorar lists several
     subtopics under the same theme, and the repeats were the noise. */
  const seen = new Set<string>();
  const cats = dorar.categories.filter((c) => {
    const theme = c.name.split(" - ")[0];
    if (seen.has(theme)) return false;
    seen.add(theme);
    return true;
  });

  /* A bracketed [صحيح] under البخاري or مسلم is dorar marking the grading as the
     collection's own; the ref pill above already says Sahih al-Bukhari, so only an
     outside verdict (الألباني : حسن) earns its own field. */
  const gradedByCollection =
    (dorar.mohdith === "البخاري" || dorar.mohdith === "مسلم") && dorar.grade === "[صحيح]";

  return (
    <>
      <p className="source-dorar" dir={dir}>
        {dorar.rawi !== "-" && (
          <span>
            {t.rawi} : <strong dir="auto">{name(dorar.rawi)}</strong>
          </span>
        )}
        <span>
          {t.mohdith} : <strong dir="auto">{name(dorar.mohdith)}</strong>
        </span>
        {book && (
          <span>
            {t.source} : <SourceBook book={book} locale={locale} />
          </span>
        )}
        {/* What has a distinct destination is interactive: المصدر opens the book's
            record, each chip its dorar category. The number stays plain text; its
            only destination would be the permalink the credit line already links,
            and the same trip twice is clutter. */}
        {number && (
          <span>
            {t.number} : <strong>{number}</strong>
          </span>
        )}
        {!gradedByCollection && (
          <span>
            {t.grade} : <strong dir="auto">{grade}</strong>
          </span>
        )}
      </p>
      {locale === "ar" && cats.length > 0 && (
        <p className="source-cats" dir="rtl">
          {cats.map((c) => (
            <a
              key={c.id}
              href={`https://dorar.net/hadith-category/cat/${c.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {c.name}
            </a>
          ))}
        </p>
      )}
      <p className="source-credit" dir={dir}>
        <a href={`https://dorar.net/h/${dorar.id}`} target="_blank" rel="noreferrer">
          {LABEL[locale]}
        </a>
      </p>
    </>
  );
}
