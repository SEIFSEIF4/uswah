"use client";

import { useEffect, useRef, useState } from "react";
import { Row } from "./cards";
import type { Situation } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const PAGE = 6;

const copy = {
  en: { more: "Load more", end: "That is all of them." },
  ar: { more: "المزيد", end: "هذا كل ما في هذا الموضوع." },
} as const;

/**
 * Loads more on scroll for topic and category listings.
 *
 * The button is real and does the work; the observer only clicks it when it comes into
 * view. That way keyboard users and anyone with JavaScript disabled still reach the whole
 * list, and there is a genuine end state rather than a feed that swallows the footer.
 */
export function LoadMore({ all, locale }: { all: Situation[]; locale: Locale }) {
  const [shown, setShown] = useState(Math.min(PAGE, all.length));
  const sentinel = useRef<HTMLDivElement>(null);
  const done = shown >= all.length;
  const t = copy[locale];

  useEffect(() => {
    if (done || !sentinel.current) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShown((n) => Math.min(n + PAGE, all.length)),
      { rootMargin: "400px" },
    );
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [done, all.length]);

  return (
    <>
      <div className="rows">
        {all.slice(0, shown).map((s) => (
          <Row key={s.slug} s={s} locale={locale} />
        ))}
      </div>

      <div ref={sentinel} className="load-more">
        {done ? (
          <p>{t.end}</p>
        ) : (
          <button type="button" onClick={() => setShown((n) => Math.min(n + PAGE, all.length))}>
            {t.more}
          </button>
        )}
      </div>
    </>
  );
}
