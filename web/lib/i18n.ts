export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const isLocale = (v: string): v is Locale =>
  (LOCALES as readonly string[]).includes(v);

/**
 * Every page lives under /<locale>. Route matching in routes.ts works on the
 * locale-less path, so both /en/saved and /ar/saved hit the same rule.
 * Returns the locale (or the default) and the remaining path, always leading-slashed.
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first)) return { locale: first, path: `/${rest.join("/")}` };
  return { locale: DEFAULT_LOCALE, path: pathname };
}

/** Picks a locale from an Accept-Language header. */
export const localeFromHeader = (header: string | null): Locale =>
  /(^|,)\s*ar\b/i.test(header ?? "") ? "ar" : "en";

/** Slugs that would shadow a route. Enforced by the content pipeline too. */
export const RESERVED_SLUGS = new Set(["search", "about", "login", "saved", "topics", "quotes"]);
