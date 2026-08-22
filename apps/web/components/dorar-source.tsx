import type { Locale } from "@/lib/i18n";
import type { DorarRef } from "@/lib/dorar";

const LABEL: Record<Locale, string> = {
  en: "Text and grading: the Hadith Encyclopedia, Dorar.net",
  ar: "النص والحكم: الموسوعة الحديثية، الدرر السنية",
  tr: "Metin ve derece: Hadis Ansiklopedisi, Dorar.net",
};

/**
 * The dorar.net apparatus for a cited hadith, laid out the way dorar lays it out:
 * labelled fields (الراوي، المحدث، الصفحة أو الرقم), then the topical chips, then
 * the credit linking to their permalink. التخريج stays in the data but off the
 * page: the long cross-reference run was the noisiest field for the least read.
 * RTL in every locale: the metadata is Arabic by nature. Shared by the saying
 * and situation pages so the two source blocks cannot drift apart.
 */
export function DorarSource({
  dorar,
  locale,
  number,
}: {
  dorar: DorarRef;
  locale: Locale;
  /** The cited row's page-or-number, dorar's الصفحة أو الرقم. */
  number?: string;
}) {
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
      <p className="source-dorar" dir="rtl">
        {dorar.rawi !== "-" && (
          <span>
            الراوي : <strong>{dorar.rawi}</strong>
          </span>
        )}
        <span>
          المحدث : <strong>{dorar.mohdith}</strong>
        </span>
        {number && (
          <span>
            الصفحة أو الرقم : <strong>{number}</strong>
          </span>
        )}
        {!gradedByCollection && (
          <span>
            خلاصة الحكم : <strong>{dorar.grade}</strong>
          </span>
        )}
      </p>
      {cats.length > 0 && (
        <p className="source-cats" dir="rtl">
          {cats.map((c) => (
            <span key={c.id}>{c.name}</span>
          ))}
        </p>
      )}
      <p className="source-credit" dir="rtl">
        <a href={`https://dorar.net/h/${dorar.id}`} target="_blank" rel="noreferrer">
          {LABEL[locale]}
        </a>
      </p>
    </>
  );
}
