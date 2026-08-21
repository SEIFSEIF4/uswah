"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDismiss } from "@/lib/use-dismiss";
import type { Locale } from "@/lib/i18n";

import { KIND_LABELS, type SearchHit } from "@/lib/content";

const copy = {
  en: { open: "Search", placeholder: "What happened?", none: "Nothing found", all: "See all results" },
  ar: { open: "بحث", placeholder: "ما الذي حدث؟", none: "لا توجد نتائج", all: "كل النتائج" },
  tr: { open: "Ara", placeholder: "Ne oldu?", none: "Sonuç bulunamadı", all: "Bütün sonuçlar" },
} as const;

/**
 * Search that opens a panel under the field, the Thmanyah pattern, including its empty
 * state. Results are passed in from the server so this component holds no data.
 */
export function SiteSearch({ locale, index }: { locale: Locale; index: SearchHit[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const t = copy[locale];

  useEffect(() => {
    if (open) field.current?.focus();
  }, [open]);

  useDismiss(open, box, useCallback(() => setOpen(false), []));

  const term = q.trim().toLowerCase();
  const hits = term
    ? index.filter((h) => h.match.includes(term)).slice(0, 6)
    : [];

  return (
    <div className="site-search" ref={box}>
      <button
        type="button"
        className="site-search-open"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
          <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <span className="sr-only">{t.open}</span>
      </button>

      {open && (
        <div className="site-search-panel">
          <form action={`/${locale}/search`} className="site-search-field">
            <input
              ref={field}
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.placeholder}
              autoComplete="off"
            />
          </form>

          {term &&
            (hits.length > 0 ? (
              <ul className="site-search-hits">
                {hits.map((h) => (
                  <li key={`${h.kind}-${h.slug}`}>
                    {/* The kind is named: a saying and a situation look alike in a list,
                        and the reader is choosing where to land, not just what to read. */}
                    <Link href={h.href} onClick={() => setOpen(false)}>
                      <span className="search-kind">{KIND_LABELS[h.kind][locale]}</span>
                      <strong>{h.title}</strong>
                      <span>{h.summary}</span>
                    </Link>
                  </li>
                ))}
                <li className="site-search-all">
                  <Link href={`/${locale}/search?q=${encodeURIComponent(q)}`} onClick={() => setOpen(false)}>
                    {t.all}
                  </Link>
                </li>
              </ul>
            ) : (
              <p className="site-search-empty">
                <EmptyTray />
                {t.none}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}

/** Drawn rather than an emoji, so it matches the icon weight elsewhere. */
function EmptyTray() {
  return (
    <svg width="46" height="34" viewBox="0 0 46 34" fill="none" aria-hidden="true">
      <path
        d="M3 20h11l3 5h12l3-5h11M3 20l5-16h30l5 16v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
