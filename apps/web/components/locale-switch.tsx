"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

const label = { en: "EN", ar: "AR", tr: "TR" } as const;

/**
 * Switches language without losing your place: /en/asked-for-money-again becomes
 * /ar/asked-for-money-again. Slugs are language-neutral, so the same URL exists in
 * both. Client-side only because the layout cannot see the current path.
 *
 * Both languages are shown with the current one marked, rather than only the one you
 * are not in: a reader should be able to see what they are reading, not just infer it.
 */
export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  const [, first, ...rest] = pathname.split("/");
  const tail = (LOCALES as readonly string[]).includes(first)
    ? rest.join("/")
    : "";

  return (
    <div className="locale-switch">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={`/${l}${tail ? `/${tail}` : ""}`}
          lang={l}
          aria-current={l === locale ? "true" : undefined}
        >
          {label[l]}
        </Link>
      ))}
    </div>
  );
}
