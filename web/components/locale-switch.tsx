"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

const label = { en: "English", ar: "العربية" } as const;

/**
 * Switches language without losing your place: /en/asked-for-money-again becomes
 * /ar/asked-for-money-again. Slugs are language-neutral, so the same URL exists in
 * both. Client-side only because the layout cannot see the current path.
 */
export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "ar" : "en";

  const [, first, ...rest] = pathname.split("/");
  const href = (LOCALES as readonly string[]).includes(first)
    ? `/${other}${rest.length ? `/${rest.join("/")}` : ""}`
    : `/${other}`;

  return (
    <Link href={href} lang={other} className="text-muted hover:text-foreground">
      {label[other]}
    </Link>
  );
}
