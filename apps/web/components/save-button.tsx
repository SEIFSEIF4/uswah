"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

/** Drawn rather than an icon dependency, at the same 1.7 stroke as the clock and glass. */
function Bookmark({ saved }: { saved: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} aria-hidden="true">
      <path
        d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.6L6 21V4.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Lives inside the save form so useFormStatus can see it. The pop fires when the action
 * comes back, not when the click lands — a mark that answers before the server does is
 * just an animation, and this one is meant to mean something arrived.
 *
 * ponytail: it does not say "saved", because nothing here knows whether it is. The page
 * never asks, and toggleSave is a toggle, so the same press adds or removes. Give it the
 * saved state and this becomes a filled bookmark that stays filled.
 */
export function SaveButton({ label, saved }: { label: string; saved: boolean }) {
  const { pending } = useFormStatus();
  const [isSaved, setIsSaved] = useState(saved);
  const [pop, setPop] = useState(false);
  const was = useRef(false);

  useEffect(() => setIsSaved(saved), [saved]);

  useEffect(() => {
    const landed = was.current && !pending;
    was.current = pending;
    if (!landed) return;
    setIsSaved((value) => !value);
    setPop(true);
    const id = setTimeout(() => setPop(false), 420);
    return () => clearTimeout(id);
  }, [pending]);

  return (
    <button
      className={[isSaved ? "is-saved" : "", pop ? "is-pop" : ""].filter(Boolean).join(" ") || undefined}
      aria-pressed={isSaved}
      disabled={pending}
    >
      <Bookmark saved={isSaved} />
      {label}
    </button>
  );
}
