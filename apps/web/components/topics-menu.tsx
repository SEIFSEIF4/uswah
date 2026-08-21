"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useDismiss } from "@/lib/use-dismiss";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: { open: "All topics", all: "See all topics" },
  ar: { open: "كل المواضيع", all: "عرض كل المواضيع" },
  tr: { open: "Tüm konular", all: "Tüm konuları gör" },
} as const;

/**
 * The topic filter, as a pill that opens a table of contents. It lives in the header so
 * every page can be left by subject, not only the home page. The pill toggles; the way
 * to the full index is a row at the foot of the panel.
 *
 * Topics are passed in from the server so this component holds no data, the same as
 * SiteSearch — importing the content module here would ship every situation to the
 * browser to render six words and six numbers.
 */
export function TopicsMenu({
  locale,
  topics,
}: {
  locale: Locale;
  topics: { slug: string; name: string; count: number }[];
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, box, close);

  return (
    <div className="topics-menu" ref={box}>
      <button
        type="button"
        className="topics-menu-open"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {copy[locale].open}
        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true">
          <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="topics-menu-panel">
          {topics.map((topic) => (
            <Link key={topic.slug} href={`/${locale}/topics/${topic.slug}`} onClick={close}>
              <span>{topic.name}</span>
              {/* What is behind the word. A menu of six identical labels makes the
                  reader open all six to find out. */}
              <span className="count">{topic.count}</span>
            </Link>
          ))}
          {/* The way to the index page, now that the pill only opens the menu. */}
          <Link href={`/${locale}/topics`} className="topics-menu-all" onClick={close}>
            {copy[locale].all}
          </Link>
        </div>
      )}
    </div>
  );
}
