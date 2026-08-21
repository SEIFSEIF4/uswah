import type { Locale } from "@/lib/i18n";
import type { DorarRef } from "@/lib/dorar";

const LABEL: Record<Locale, string> = {
  en: "Text and grading: the Hadith Encyclopedia, Dorar.net",
  ar: "النص والحكم: الموسوعة الحديثية، الدرر السنية",
  tr: "Metin ve derece: Hadis Ansiklopedisi, Dorar.net",
};

/**
 * Narrator, grading and takhrij for a cited hadith, then dorar.net's own topical
 * classification as chips, with the credit linking to their permalink. RTL in every
 * locale because the metadata is Arabic by nature. Shared by the saying and situation
 * pages so the two source blocks cannot drift apart.
 */
export function DorarSource({ dorar, locale }: { dorar: DorarRef; locale: Locale }) {
  return (
    <>
      <p className="source-dorar" dir="rtl">
        {dorar.rawi !== "-" && <span>الراوي: {dorar.rawi}</span>}
        <span>
          {dorar.mohdith}: {dorar.grade}
        </span>
        {dorar.takhrij && <span>التخريج: {dorar.takhrij}</span>}
        <a href={`https://dorar.net/h/${dorar.id}`} target="_blank" rel="noreferrer">
          {LABEL[locale]}
        </a>
      </p>
      <p className="source-cats" dir="rtl">
        {dorar.categories.map((c) => (
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
    </>
  );
}
