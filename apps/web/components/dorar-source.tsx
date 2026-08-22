import type { Locale } from "@/lib/i18n";
import type { DorarRef } from "@/lib/dorar";

const LABEL: Record<Locale, string> = {
  en: "Text and grading: the Hadith Encyclopedia, Dorar.net",
  ar: "النص والحكم: الموسوعة الحديثية، الدرر السنية",
  tr: "Metin ve derece: Hadis Ansiklopedisi, Dorar.net",
};

/**
 * Narrator, grading and takhrij for a cited hadith, with the credit linking to
 * dorar.net's permalink. RTL in every locale because the metadata is Arabic by
 * nature. Shared by the saying and situation pages so the two source blocks
 * cannot drift apart.
 *
 * The grader-and-grade pair is dropped when the grading IS the collection: dorar
 * brackets those ([صحيح] under البخاري or مسلم), and the ref line above already
 * says Sahih al-Bukhari, so the pair would say it twice. An outside grading
 * (الألباني: حسن) is the only place that verdict lives, so it stays.
 */
export function DorarSource({ dorar, locale }: { dorar: DorarRef; locale: Locale }) {
  const gradedByCollection =
    (dorar.mohdith === "البخاري" || dorar.mohdith === "مسلم") && dorar.grade === "[صحيح]";

  return (
    <p className="source-dorar" dir="rtl">
      {dorar.rawi !== "-" && <span>الراوي: {dorar.rawi}</span>}
      {!gradedByCollection && (
        <span>
          {dorar.mohdith}: {dorar.grade}
        </span>
      )}
      {dorar.takhrij && <span>التخريج: {dorar.takhrij}</span>}
      <a href={`https://dorar.net/h/${dorar.id}`} target="_blank" rel="noreferrer">
        {LABEL[locale]}
      </a>
    </p>
  );
}
