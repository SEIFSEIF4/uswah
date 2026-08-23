"use client";

import type { Locale } from "@/lib/i18n";
import { BOOK_RECORDS, type BookKey } from "@/lib/dorar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CLOSE: Record<Locale, string> = { en: "Close", ar: "إغلاق", tr: "Kapat" };

const CARD_TITLE: Record<Locale, string> = {
  en: "The Hadith Encyclopedia · Hadith Sources",
  ar: "الموسوعة الحديثية - مصادر الأحاديث",
  tr: "Hadis Ansiklopedisi · Hadis Kaynakları",
};

const FIELD_LABELS: Record<Locale, string[]> = {
  en: ["Author / supervisor", "Editor / translator", "Publisher", "Edition", "Publication year"],
  ar: ["المؤلف / المشرف", "المحقق / المترجم", "الناشر", "الطبعة", "سنة الطبع"],
  tr: ["Müellif / sorumlu", "Tahkik eden / çevirmen", "Yayınevi", "Baskı", "Yayın yılı"],
};

/**
 * The المصدر value as a trigger: clicking the book's name opens its
 * bibliographic record, the same card dorar's own المصدر field opens,
 * quoted verbatim from their مصادر الأحاديث library.
 */
export function SourceBook({ book, locale }: { book: BookKey; locale: Locale }) {
  const b = BOOK_RECORDS[book];
  const fields = [b.author, b.editor, b.publisher, b.edition, b.year];
  return (
    <Dialog>
      <DialogTrigger className="book-trigger">{b.name[locale]}</DialogTrigger>
      <DialogContent
        closeLabel={CLOSE[locale]}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="book-card gap-5"
      >
        <DialogHeader>
          <DialogTitle className="text-muted-foreground text-[.8rem] font-normal">
            {CARD_TITLE[locale]}
          </DialogTitle>
        </DialogHeader>
        <p className="book-card-title" dir={locale === "ar" ? "rtl" : "ltr"}>
          <span className="book-card-number">{b.no}</span>
          <span>{b.title[locale]}</span>
        </p>
        <dl className="book-card-fields" dir={locale === "ar" ? "rtl" : "ltr"}>
          {fields.map((value, index) => (
            <div className="book-card-field" key={FIELD_LABELS[locale][index]}>
              <dt>{FIELD_LABELS[locale][index]}</dt>
              <dd>{value[locale]}</dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  );
}
