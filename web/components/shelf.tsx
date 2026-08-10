"use client";

import { useRef } from "react";

/**
 * Horizontally scrolling shelf, the Thmanyah browsing pattern.
 *
 * Native scroll with snap does the work; the arrows are an affordance on top of it, not
 * the mechanism. They hide on touch, where the gesture is already obvious.
 */
export function Shelf({
  title,
  children,
  locale,
}: {
  title: string;
  children: React.ReactNode;
  locale: "en" | "ar";
}) {
  const track = useRef<HTMLDivElement>(null);
  const rtl = locale === "ar";

  const nudge = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // In RTL the scroll axis runs the other way, so the sign flips with the direction.
    el.scrollBy({ left: direction * (rtl ? -1 : 1) * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="shelf">
      <div className="shelf-head">
        <h2 className="section-title shelf-title">{title}</h2>
        <div className="shelf-nav">
          <button type="button" onClick={() => nudge(-1)} aria-label={rtl ? "التالي" : "Previous"}>
            <Chevron direction={rtl ? "end" : "start"} />
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label={rtl ? "السابق" : "Next"}>
            <Chevron direction={rtl ? "start" : "end"} />
          </button>
        </div>
      </div>
      <div className="shelf-track" ref={track}>
        {children}
      </div>
    </section>
  );
}

function Chevron({ direction }: { direction: "start" | "end" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "end" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
