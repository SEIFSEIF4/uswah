import { Fragment } from "react";
import { dirFor, type Locale } from "@/lib/i18n";
import type { DorarRef } from "@/lib/dorar";

const LABEL: Record<Locale, string> = {
  en: "Text and grading: the Hadith Encyclopedia, Dorar.net",
  ar: "النص والحكم: الموسوعة الحديثية، الدرر السنية",
  tr: "Metin ve derece: Hadis Ansiklopedisi, Dorar.net",
};

const CAT_NOTE: Record<Locale, string> = {
  en: "One of dorar.net's topical classifications of this hadith.",
  ar: "من التصنيف الموضوعي لهذا الحديث في الدرر السنية.",
  tr: "Bu hadisin Dorar.net'teki konu tasniflerinden biri.",
};

const CAT_LINK: Record<Locale, string> = {
  en: "Open the category on dorar.net",
  ar: "افتح التصنيف في الدرر السنية",
  tr: "Kategoriyi dorar.net'te aç",
};

/**
 * Narrator, grading and takhrij for a cited hadith, then dorar.net's own topical
 * classification as chips, with the credit linking to their permalink. RTL in every
 * locale because the metadata is Arabic by nature. Shared by the saying and situation
 * pages so the two source blocks cannot drift apart.
 *
 * A chip opens a native popover instead of leaving the site: the classification is
 * context, and yanking the reader to dorar.net mid-read overweights it. The external
 * link waits inside the card for whoever actually wants it.
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
      {/* A div, not a p: the popover divs would end a p at parse time and spill the
          chips after the first one out of the container. */}
      <div className="source-cats" dir="rtl">
        {dorar.categories.map((c) => (
          <Fragment key={c.id}>
            <button type="button" popoverTarget={`cat-${c.id}`}>
              {c.name}
            </button>
            {/* dir is restated because the card sits inside the RTL chip row and would
                inherit it; only the category name is Arabic by nature. */}
            <div popover="auto" id={`cat-${c.id}`} className="cat-pop" dir={dirFor(locale)}>
              <strong dir="rtl">{c.name}</strong>
              <p>{CAT_NOTE[locale]}</p>
              <a
                href={`https://dorar.net/hadith-category/cat/${c.id}`}
                target="_blank"
                rel="noreferrer"
              >
                {CAT_LINK[locale]}
              </a>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
