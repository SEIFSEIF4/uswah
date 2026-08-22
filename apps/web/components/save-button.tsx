"use client";

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

export function SaveButton({
  label,
  savedLabel,
  pendingLabel,
  saved,
}: {
  label: string;
  savedLabel: string;
  pendingLabel: string;
  saved: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={saved ? "is-saved" : undefined}
      aria-pressed={saved}
      aria-busy={pending}
      disabled={pending}
    >
      <Bookmark saved={saved} />
      {pending ? pendingLabel : saved ? savedLabel : label}
    </button>
  );
}
