import type { Locale } from "@/lib/i18n";
import type { DorarRef } from "@/lib/dorar";

const LABEL: Record<Locale, string> = {
  en: "Text and grading: the Hadith Encyclopedia, Dorar.net",
  ar: "النص والحكم: الموسوعة الحديثية، الدرر السنية",
  tr: "Metin ve derece: Hadis Ansiklopedisi, Dorar.net",
};

/**
 * The dorar.net apparatus for a cited hadith, laid out the way dorar lays it out:
 * the verdict on its own highlighted strip, then the labelled fields (الراوي،
 * المحدث، التخريج) with the values carrying the colour, then the topical chips,
 * then the credit linking to their permalink. المصدر and الرقم are not repeated
 * here because the ref pill above the apparatus already carries them. RTL in
 * every locale: the metadata is Arabic by nature. Shared by the saying and
 * situation pages so the two source blocks cannot drift apart.
 */
export function DorarSource({ dorar, locale }: { dorar: DorarRef; locale: Locale }) {
  /* One chip per top-level theme (the part before the dash): dorar lists several
     subtopics under the same theme, and the repeats were the noise. */
  const seen = new Set<string>();
  const cats = dorar.categories.filter((c) => {
    const theme = c.name.split(" - ")[0];
    if (seen.has(theme)) return false;
    seen.add(theme);
    return true;
  });

  return (
    <>
      <p className="dorar-verdict" dir="rtl">
        خلاصة حكم المحدث : <strong>{dorar.grade}</strong>
      </p>
      <p className="source-dorar" dir="rtl">
        {dorar.rawi !== "-" && (
          <span>
            الراوي : <strong>{dorar.rawi}</strong>
          </span>
        )}
        <span>
          المحدث : <strong>{dorar.mohdith}</strong>
        </span>
        {dorar.takhrij && (
          <span>
            التخريج : <strong>{dorar.takhrij}</strong>
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
