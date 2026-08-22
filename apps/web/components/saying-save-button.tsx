"use client";

import { useFormStatus } from "react-dom";

function Heart({ saved }: { saved: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} aria-hidden="true">
      <path
        d="M20.8 8.7c0 5.4-8.8 10.3-8.8 10.3S3.2 14.1 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
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
      <Heart saved={saved} />
      {pending ? pendingLabel : saved ? savedLabel : label}
    </button>
  );
}
