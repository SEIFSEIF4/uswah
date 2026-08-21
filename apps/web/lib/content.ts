/**
 * The only module that knows where content comes from.
 *
 * Today it reads lib/mock/situations.ts so the interface can be judged before the
 * dashboard exists. When the dashboard lands, these five functions start reading
 * Supabase and nothing else in the app changes — that is the entire point of the file.
 */

import { SITUATIONS, TOPICS, type Situation, type TopicSlug } from "./mock/situations";
import { LOCALES, type Locale } from "./i18n";

export const USING_SAMPLE_DATA = true;

export type { Situation, TopicSlug };
export { TOPICS };

export const topicName = (slug: TopicSlug, locale: Locale) =>
  TOPICS.find((t) => t.slug === slug)![locale];

export function allSituations(): Situation[] {
  return SITUATIONS;
}

export function situationBySlug(slug: string): Situation | undefined {
  return SITUATIONS.find((s) => s.slug === slug);
}

/**
 * Stand-in artwork for a topic: the first situation filed under it.
 *
 * Topics carry no image of their own yet. When they do, this becomes a field read and
 * the tiles stop borrowing from their contents.
 */
export function topicImage(topic: TopicSlug) {
  return SITUATIONS.find((s) => s.topic === topic)?.image;
}

/** Name and weight per topic, for the header menu. Keeps SITUATIONS out of the client. */
export function topicMenu(locale: Locale) {
  return TOPICS.map((t) => ({
    slug: t.slug,
    name: topicName(t.slug, locale),
    count: situationsByTopic(t.slug).length,
  }));
}

export function situationsByTopic(topic: TopicSlug): Situation[] {
  return SITUATIONS.filter((s) => s.topic === topic);
}

/** The one marked as the hero, or the first if none is. */
export function heroSituation(): Situation {
  return SITUATIONS.find((s) => s.feature === "hero") ?? SITUATIONS[0];
}

/** The mid-page full-bleed feature. */
export function bandSituation(): Situation | undefined {
  return SITUATIONS.find((s) => s.feature === "band");
}

/**
 * One index over everything a reader can look for.
 *
 * Search used to cover situations only, so two of the three content types could not be
 * found at all — typing "money" matched المال in a situation and missed a saying about
 * the same idea. It is also the only browsing tool that does not degrade as the content
 * grows, which is the reason to spend the index on all of it rather than paginate later.
 *
 * `match` carries every language, because the readers are trilingual and type whichever
 * word arrives first; `title` and `summary` are the reading locale's.
 */
export type SearchKind = "situation" | "saying" | "intention";

export type SearchHit = {
  kind: SearchKind;
  slug: string;
  href: string;
  title: string;
  summary: string;
  match: string;
};

export const KIND_LABELS: Record<SearchKind, Record<Locale, string>> = {
  situation: { en: "Situation", ar: "موقف", tr: "Durum" },
  saying: { en: "Saying", ar: "مقولة", tr: "Söz" },
  intention: { en: "Intention", ar: "نيّة", tr: "Niyet" },
};

const across = (parts: string[]) => parts.join(" ").toLowerCase();

export function searchIndex(locale: Locale): SearchHit[] {
  return [
    ...SITUATIONS.map((s) => ({
      kind: "situation" as const,
      slug: s.slug,
      href: `/${locale}/${s.slug}`,
      title: s[locale].title,
      summary: s[locale].summary,
      match: across(LOCALES.map((l) => `${s[l].title} ${s[l].summary}`)),
    })),
    ...QUOTES.map((q) => ({
      kind: "saying" as const,
      slug: q.slug,
      href: `/${locale}/quotes/${q.slug}`,
      title: q.saying,
      summary: q[locale].closeness,
      // The saying itself circulates in one language, so it is indexed once.
      match: across([q.saying, ...LOCALES.map((l) => `${q[l].angle} ${q[l].closeness}`)]),
    })),
    ...INTENTIONS.map((i) => ({
      kind: "intention" as const,
      slug: i.slug,
      // Intentions have no page of their own, so the hit lands on the index at its anchor.
      href: `/${locale}/intentions#${i.slug}`,
      title: i.act[locale],
      summary: i[locale].intention,
      match: across(LOCALES.map((l) => `${i.act[l]} ${i[l].intention} ${i[l].note}`)),
    })),
  ];
}

/**
 * Naive contains-match. The real one is the search_situations RPC, which normalises
 * Arabic; this exists only so the search page has something to render while data is local.
 */
export function searchAll(query: string, locale: Locale): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex(locale).filter((hit) => hit.match.includes(q));
}

/** Other situations sharing a topic, then anything else, never the one you are reading. */
export function relatedSituations(slug: string, limit = 3): Situation[] {
  const current = situationBySlug(slug);
  if (!current) return [];
  const sameTopic = SITUATIONS.filter((s) => s.slug !== slug && s.topic === current.topic);
  const rest = SITUATIONS.filter((s) => s.slug !== slug && s.topic !== current.topic);
  return [...sameTopic, ...rest].slice(0, limit);
}

// ── quote comparisons ───────────────────────────────────────────────────────
export { GRADES } from "./mock/quotes";
export type { Quote, Grade } from "./mock/quotes";
import { QUOTES } from "./mock/quotes";

export function allQuotes() {
  return QUOTES;
}

export { PATHS } from "./mock/paths";
export type { Path } from "./mock/paths";

/** Strongest evidence first, so a directory opens on its best case. */
const GRADE_ORDER: Record<string, number> = {
  quran: 0,
  sahih: 1,
  hasan: 2,
  historical: 3,
  disputed: 4,
};

export function quotesSorted() {
  return [...QUOTES].sort((a, b) => GRADE_ORDER[a.grade] - GRADE_ORDER[b.grade]);
}

export function quoteBySlug(slug: string) {
  return QUOTES.find((q) => q.slug === slug);
}

/** Other sayings, never the one being read. */
export function relatedQuotes(slug: string, limit = 3) {
  return quotesSorted()
    .filter((q) => q.slug !== slug)
    .slice(0, limit);
}

// ── intentions (Nawiya) ─────────────────────────────────────────────────────
export { ACT_GROUPS } from "./mock/intentions";
export type { Intention, ActGroup } from "./mock/intentions";
import { INTENTIONS, ACT_GROUPS as GROUPS } from "./mock/intentions";

/** A few for the home page, where the point is that the surface exists, not to list it. */
export function featuredIntentions(limit = 4) {
  return INTENTIONS.slice(0, limit);
}

/** Grouped for display, in taxonomy order, skipping groups with nothing in them. */
export function intentionsByGroup() {
  return GROUPS.map((g) => ({
    group: g,
    items: INTENTIONS.filter((i) => i.group === g.slug),
  })).filter((g) => g.items.length > 0);
}
