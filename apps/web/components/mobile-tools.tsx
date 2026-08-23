"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { useDismiss } from "@/lib/use-dismiss";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: { open: "Menu", close: "Close menu" },
  ar: { open: "القائمة", close: "إغلاق القائمة" },
  tr: { open: "Menü", close: "Menüyü kapat" },
} as const;

/**
 * On a phone the language row, search, saved link and theme toggle crowd the same line
 * as the topics pill; folding them behind a toggle gives every control its tap target
 * back. It opens as a side sheet rather than a dropdown: SiteSearch's own results panel
 * is width: 78vw and anchored to its own icon, which only works when that icon has a
 * whole toolbar to itself. Desktop never sees the button: .mobile-tools-panel reverts to
 * display: contents above the breakpoint, so the wrapped controls sit inline exactly as
 * before, in CSS alone.
 */
export function MobileTools({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, box, close);

  return (
    <div className="mobile-tools" ref={box}>
      <button
        type="button"
        className="mobile-tools-open"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" aria-hidden="true">
          <path d="M0 1h19M0 7h19M0 13h19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="sr-only">{copy[locale].open}</span>
      </button>
      {open && (
        <button
          type="button"
          className="mobile-tools-scrim"
          aria-label={copy[locale].close}
          onClick={close}
        />
      )}
      <div className={`mobile-tools-panel${open ? " open" : ""}`}>{children}</div>
    </div>
  );
}
