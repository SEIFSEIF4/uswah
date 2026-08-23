"use client";

import { useFormStatus } from "react-dom";

/** Same mark as the situation save button and the header's Saved link, at this
    button's own size: one save action, one icon, regardless of content type. */
function Bookmark({ saved }: { saved: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} aria-hidden="true">
      <path
        d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.6L6 21V4.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SayingSaveButton({
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
      className={saved ? "saying-save is-saved" : "saying-save"}
      aria-pressed={saved}
      aria-busy={pending}
      disabled={pending}
    >
      <Bookmark saved={saved} />
      {pending ? pendingLabel : saved ? savedLabel : label}
    </button>
  );
}
