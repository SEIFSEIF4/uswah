/**
 * The only module that knows where content comes from.
 *
 * Today it reads lib/mock/situations.ts so the interface can be judged before the
 * dashboard exists. When the dashboard lands, these five functions start reading
 * Supabase and nothing else in the app changes — that is the entire point of the file.
 */

import { SITUATIONS, TOPICS, type Situation, type TopicSlug } from "./mock/situations";
import type { Locale } from "./i18n";

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
 * Naive contains-match over title and summary. The real one is the search_situations
 * RPC, which normalises Arabic; this exists only so the search page has something to
 * render while the data is local.
 */
export function searchSituations(query: string, locale: Locale): Situation[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SITUATIONS.filter((s) =>
    `${s[locale].title} ${s[locale].summary}`.toLowerCase().includes(q),
  );
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

export { PATHS } from "./mock/quotes";
export type { Path } from "./mock/quotes";

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
