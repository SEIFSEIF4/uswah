import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: { label: "Saved" },
  ar: { label: "المحفوظات" },
  tr: { label: "Kaydedilenler" },
} as const;

/** Drawn at the same 1.7 stroke as the header's other icons, matching SaveButton's mark. */
export function SavedLink({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}/saved`} className="saved-link">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.6L6 21V4.8Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">{copy[locale].label}</span>
    </Link>
  );
}
