export const LOCALES = ["en", "ar", "tr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const isLocale = (v: string): v is Locale =>
  (LOCALES as readonly string[]).includes(v);

/**
 * Writing direction. This used to be a `dir` column on a `locales` table, which meant a
 * database round trip to answer a question with three hard-coded answers. It lives here
 * now, next to the list it belongs to.
 */
const RTL: ReadonlySet<string> = new Set(["ar"]);
export const dirFor = (locale: Locale): "rtl" | "ltr" => (RTL.has(locale) ? "rtl" : "ltr");

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

/** Picks a locale from an Accept-Language header. First tag wins; no q-value ranking. */
export const localeFromHeader = (header: string | null): Locale =>
  (header ?? "")
    .split(",")
    .map((tag) => tag.trim().slice(0, 2).toLowerCase())
    .find(isLocale) ?? DEFAULT_LOCALE;

/** Slugs that would shadow a route. Enforced by the content pipeline too. */
export const RESERVED_SLUGS = new Set(["search", "about", "login", "saved", "topics", "quotes", "intentions", "new"]);
