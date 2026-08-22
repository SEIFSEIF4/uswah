"use client";

import { Fragment } from "react";
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

/**
 * The المصدر value as a trigger: clicking the book's name opens its
 * bibliographic record, the same card dorar's own المصدر field opens,
 * quoted verbatim from their مصادر الأحاديث library.
 */
export function SourceBook({ book, locale }: { book: BookKey; locale: Locale }) {
  const b = BOOK_RECORDS[book];
  return (
    <Dialog>
      <DialogTrigger className="book-trigger">{b.name}</DialogTrigger>
      <DialogContent closeLabel={CLOSE[locale]} dir="rtl" className="book-card gap-3">
        <DialogHeader>
          <DialogTitle className="text-muted-foreground text-[.8rem] font-normal">
            الموسوعة الحديثية - مصادر الأحاديث
          </DialogTitle>
        </DialogHeader>
        <p className="m-0 border-b border-border pb-3 text-[.98rem] leading-7 font-medium">
          {b.no} - {b.title}
        </p>
        {/* A two-column record: labels down one edge, values aligned beside them,
            the way a library card reads. */}
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[.85rem] leading-6">
          {(
            [
              ["المؤلف / المشرف", b.author],
              ["المحقق / المترجم", b.editor],
              ["الناشر", b.publisher],
              ["الطبعة", b.edition],
              ["سنة الطبع", b.year],
            ] as const
          ).map(([label, value]) => (
            <Fragment key={label}>
              <dt className="text-muted-foreground whitespace-nowrap">{label}</dt>
              <dd className="m-0 font-medium">{value}</dd>
            </Fragment>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  );
}
