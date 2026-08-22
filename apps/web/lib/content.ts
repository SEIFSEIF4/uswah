/**
 * The only module that knows where content comes from.
 *
 * Everything reads Supabase: the dashboard owns the content, and RLS shows
 * this anon client published rows only, so a draft can not leak by
 * construction. Reads are cached and tagged; the dashboard flushes them
 * through POST /api/revalidate on every save, publish and delete.
 */

import { unstable_cache } from "next/cache";
import { db } from "./supabase/public";
import type { DorarRef } from "./dorar";
import { LOCALES, type Locale } from "./i18n";

// ── situations ──────────────────────────────────────────────────────────────

export type TopicSlug = "money" | "work" | "family" | "self" | "friendship" | "hardship";

/* Each topic carries its own tile emblem; see docs/ART.md for the series. */
export const TOPICS: { slug: TopicSlug; en: string; ar: string; tr: string; image: string }[] = [
  { slug: "money", en: "Money", ar: "المال", tr: "Para", image: "/art/topics/money-v1.jpg" },
  { slug: "work", en: "Work", ar: "العمل", tr: "İş", image: "/art/topics/work-v1.jpg" },
  { slug: "family", en: "Family", ar: "الأهل", tr: "Aile", image: "/art/topics/family-v1.jpg" },
  { slug: "self", en: "Yourself", ar: "النفس", tr: "Kendin", image: "/art/topics/self-v1.jpg" },
  { slug: "friendship", en: "People", ar: "الناس", tr: "İnsanlar", image: "/art/topics/friendship-v1.jpg" },
  { slug: "hardship", en: "Hardship", ar: "الشدّة", tr: "Zorluk", image: "/art/topics/hardship-v1.jpg" },
];

export const topicName = (slug: TopicSlug, locale: Locale) =>
  TOPICS.find((t) => t.slug === slug)![locale];

export type LocaleText = {
  title: string;
  summary: string;
  imageAlt: string;
  body: string;
  takeaway: string;
};

export type Situation = {
  slug: string;
  topic: TopicSlug;
  minutes: number;
  publishedAt: string;
  reviewedBy: string;
  reviewedAt: string;
  feature?: "hero" | "band";
  image: { url: string; credit: string; sourceUrl: string; license: string };
  source: {
    label: { en: string; ar: string; tr: string };
    /** The bare page-or-number within the collection, e.g. "1471". */
    ref: string;
    original: string;
    translation?: Partial<Record<Locale, { text: string; translator: string }>>;
    dorar?: DorarRef;
  };
  en: LocaleText;
  ar: LocaleText;
  tr: LocaleText;
};

/* The database stores collection + ref; the label the reader sees is
   presentation, so it is derived here rather than stored three times. */
const BOOKS: Record<string, { en: string; ar: string; tr: string }> = {
  bukhari: { en: "Sahih al-Bukhari", ar: "صحيح البخاري", tr: "Sahîh-i Buhârî" },
  muslim: { en: "Sahih Muslim", ar: "صحيح مسلم", tr: "Sahîh-i Müslim" },
};

const arDigits = (s: string) => s.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

function sourceLabel(kind: string, collection: string | null, ref: string) {
  if (kind === "quran")
    return { en: `Quran ${ref}`, ar: `القرآن ${arDigits(ref)}`, tr: `Kur'an ${ref}` };
  // The DB constraint admits only bukhari or muslim here, so the lookup always hits.
  const b = BOOKS[collection!];
  return { en: `${b.en} ${ref}`, ar: `${b.ar} ${arDigits(ref)}`, tr: `${b.tr} ${ref}` };
}

type SituationTr = { locale: string; title: string; summary: string; image_alt: string | null };
type EntryTr = { locale: string; body: string; takeaway: string };

/**
 * One query for the rows — translations, entry and source nested — and one for
 * the dorar citations, joined here by slug. A situation missing a locale row,
 * its topic or its entry is skipped rather than half-rendered, same rule as
 * the sayings below. The pages render one entry per situation; if one ever
 * grows more, the first is shown and the page layout is what needs revisiting.
 */
const loadSituations = unstable_cache(
  async (): Promise<Situation[]> => {
    const [rows, dorar] = await Promise.all([
      db
        .from("situations")
        .select(
          `slug, topic, minutes, feature, published_at,
           image_url, image_credit, image_source_url, image_license,
           situation_translations(locale, title, summary, image_alt),
           entries(position, reviewed_by, reviewed_at,
             entry_translations(locale, body, takeaway),
             source:sources(kind, collection, ref, text_original,
               source_translations(locale, text, translator)))`,
        )
        .order("published_at", { ascending: false }),
      db.from("dorar_hadith").select("slug,cited"),
    ]);
    if (rows.error || dorar.error) {
      console.error("[content] situations load failed:", rows.error?.message ?? dorar.error?.message);
      return [];
    }
    const cited = new Map(dorar.data.map((d) => [d.slug, d.cited as DorarRef | null]));
    const situations: Situation[] = [];
    for (const r of rows.data) {
      const entry = [...r.entries].sort((a, b) => a.position - b.position)[0];
      if (!entry || !r.topic || !r.minutes || !r.image_url || !r.published_at) continue;
      const tr = Object.fromEntries(
        r.situation_translations.map((t) => [t.locale, t]),
      ) as Record<Locale, SituationTr>;
      const et = Object.fromEntries(
        entry.entry_translations.map((t) => [t.locale, t]),
      ) as Record<Locale, EntryTr>;
      if (!tr.en || !tr.ar || !tr.tr || !et.en || !et.ar || !et.tr) continue;
      const text = (l: Locale): LocaleText => ({
        title: tr[l].title,
        summary: tr[l].summary,
        imageAlt: tr[l].image_alt ?? "",
        body: et[l].body,
        takeaway: et[l].takeaway,
      });
      const translation = Object.fromEntries(
        entry.source.source_translations.map((t) => [t.locale, { text: t.text, translator: t.translator }]),
      );
      situations.push({
        slug: r.slug,
        topic: r.topic as TopicSlug,
        minutes: r.minutes,
        publishedAt: r.published_at,
        reviewedBy: entry.reviewed_by,
        reviewedAt: entry.reviewed_at,
        feature: (r.feature ?? undefined) as Situation["feature"],
        image: {
          url: r.image_url,
          credit: r.image_credit ?? "",
          sourceUrl: r.image_source_url ?? "",
          license: r.image_license ?? "",
        },
        source: {
          label: sourceLabel(entry.source.kind, entry.source.collection, entry.source.ref),
          ref: entry.source.ref,
          original: entry.source.text_original,
          translation: Object.keys(translation).length ? translation : undefined,
          dorar: cited.get(r.slug) ?? undefined,
        },
        en: text("en"),
        ar: text("ar"),
        tr: text("tr"),
      });
    }
    return situations;
  },
  ["content-situations"],
  { tags: ["content:situations"], revalidate: 3600 },
);

/** Newest first, the order published_at gives. */
export function allSituations() {
  return loadSituations();
}

export async function situationBySlug(slug: string) {
  return (await loadSituations()).find((s) => s.slug === slug);
}

/** Name and weight per topic, for the header menu. */
export async function topicMenu(locale: Locale) {
  const all = await loadSituations();
  return TOPICS.map((t) => ({
    slug: t.slug,
    name: topicName(t.slug, locale),
    count: all.filter((s) => s.topic === t.slug).length,
  }));
}

/** Other situations sharing a topic, then anything else, never the one you are reading. */
export async function relatedSituations(slug: string, limit = 3): Promise<Situation[]> {
  const all = await loadSituations();
  const current = all.find((s) => s.slug === slug);
  if (!current) return [];
  const sameTopic = all.filter((s) => s.slug !== slug && s.topic === current.topic);
  const rest = all.filter((s) => s.slug !== slug && s.topic !== current.topic);
  return [...sameTopic, ...rest].slice(0, limit);
}

// ── quote comparisons (sayings) ─────────────────────────────────────────────

export type Grade = "quran" | "sahih" | "hasan" | "disputed" | "historical";

export const GRADES: Record<Grade, { en: string; ar: string; tr: string; storable: boolean }> = {
  quran: { en: "Quran", ar: "قرآن", tr: "Kur'an", storable: true },
  sahih: { en: "Sahih", ar: "صحيح", tr: "Sahih", storable: true },
  hasan: { en: "Hasan", ar: "حسن", tr: "Hasen", storable: false },
  disputed: { en: "Disputed, verify", ar: "محل خلاف، يحتاج تحققًا", tr: "İhtilaflı, doğrulanmalı", storable: false },
  historical: { en: "Historical account", ar: "واقعة تاريخية", tr: "Tarihî olay", storable: false },
};

export type Quote = {
  slug: string;
  /** The saying people already know. Kept in the language it circulates in. */
  saying: string;
  grade: Grade;
  /** Which situation this belongs with, when one exists. */
  situation?: string;
  /** Per-locale `saying` is the native equivalent aphorism, not a translation;
      absent means the canonical form is what that locale knows too. */
  en: { saying?: string; angle: string; closeness: string };
  ar: { saying?: string; angle: string; closeness: string };
  tr: { saying?: string; angle: string; closeness: string };
  source: {
    label: { en: string; ar: string; tr: string };
    original?: string;
    dorar?: DorarRef;
  };
};

type SayingTr = { locale: string; saying: string | null; angle: string; closeness: string; source_label: string };

/**
 * One query for the rows, one for the dorar citations, joined here by slug.
 * A saying missing a locale row is skipped rather than half-rendered — the
 * dashboard's validator writes all three, so a skip means hand-edited data.
 */
const loadQuotes = unstable_cache(
  async (): Promise<Quote[]> => {
    const [sayings, dorar] = await Promise.all([
      db
        .from("sayings")
        .select(
          "slug,saying,grade,situation_slug,source_original,created_at,saying_translations(locale,saying,angle,closeness,source_label)",
        )
        .order("created_at"),
      db.from("dorar_hadith").select("slug,cited"),
    ]);
    if (sayings.error || dorar.error) {
      console.error("[content] sayings load failed:", sayings.error?.message ?? dorar.error?.message);
      return [];
    }
    const cited = new Map(dorar.data.map((d) => [d.slug, d.cited as DorarRef | null]));
    const quotes: Quote[] = [];
    for (const r of sayings.data) {
      const tr = Object.fromEntries(
        (r.saying_translations as SayingTr[]).map((t) => [t.locale, t]),
      ) as Record<Locale, SayingTr>;
      if (!tr.en || !tr.ar || !tr.tr) continue;
      quotes.push({
        slug: r.slug,
        saying: r.saying,
        grade: r.grade as Grade,
        situation: r.situation_slug ?? undefined,
        en: { saying: tr.en.saying ?? undefined, angle: tr.en.angle, closeness: tr.en.closeness },
        ar: { saying: tr.ar.saying ?? undefined, angle: tr.ar.angle, closeness: tr.ar.closeness },
        tr: { saying: tr.tr.saying ?? undefined, angle: tr.tr.angle, closeness: tr.tr.closeness },
        source: {
          label: { en: tr.en.source_label, ar: tr.ar.source_label, tr: tr.tr.source_label },
          original: r.source_original ?? undefined,
          dorar: cited.get(r.slug) ?? undefined,
        },
      });
    }
    return quotes;
  },
  ["content-sayings"],
  { tags: ["content:sayings"], revalidate: 3600 },
);

export function allQuotes() {
  return loadQuotes();
}

/* Diacritic-insensitive, so Turkish "Sahîh-i Buhârî" still matches the grade "Sahih". */
const stripMarks = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/** True when the source label already opens with the grade word ("Sahih" before
    "Sahih al-Bukhari 1471"), so showing the badge next to it would double it. */
export function gradeInLabel(q: Quote, locale: Locale) {
  return stripMarks(q.source.label[locale]).startsWith(stripMarks(GRADES[q.grade][locale]));
}

/** Strongest evidence first, so a directory opens on its best case. */
const GRADE_ORDER: Record<string, number> = {
  quran: 0,
  sahih: 1,
  hasan: 2,
  historical: 3,
  disputed: 4,
};

export async function quotesSorted() {
  return [...(await loadQuotes())].sort((a, b) => GRADE_ORDER[a.grade] - GRADE_ORDER[b.grade]);
}

export async function quoteBySlug(slug: string) {
  return (await loadQuotes()).find((q) => q.slug === slug);
}

/** Other sayings, never the one being read. */
export async function relatedQuotes(slug: string, limit = 3) {
  return (await quotesSorted()).filter((q) => q.slug !== slug).slice(0, limit);
}

// ── intentions (Nawiya) ─────────────────────────────────────────────────────

export type ActGroup =
  | "worship"
  | "body"
  | "daily"
  | "order"
  | "travel"
  | "occasions"
  | "people"
  | "service"
  | "self"
  | "learning"
  | "knowledge"
  | "craft"
  | "stewardship";

export const ACT_GROUPS: { slug: ActGroup; en: string; ar: string; tr: string }[] = [
  { slug: "worship", en: "Worship", ar: "العبادات", tr: "İbadetler" },
  { slug: "body", en: "Health", ar: "الصحة", tr: "Sağlık" },
  { slug: "daily", en: "Daily life", ar: "الحياة اليومية", tr: "Gündelik hayat" },
  { slug: "order", en: "Time and order", ar: "التنظيم والوقت", tr: "Düzen ve zaman" },
  { slug: "travel", en: "Travel", ar: "السفر", tr: "Yolculuk" },
  { slug: "occasions", en: "Occasions", ar: "المناسبات", tr: "Özel günler" },
  { slug: "people", en: "People", ar: "العلاقات", tr: "İlişkiler" },
  { slug: "service", en: "Service", ar: "العمل الخيري والتطوع", tr: "Hayır ve hizmet" },
  { slug: "self", en: "Yourself", ar: "تزكية النفس", tr: "Nefis terbiyesi" },
  { slug: "learning", en: "Learning", ar: "طلب العلم", tr: "İlim talebi" },
  { slug: "knowledge", en: "Teaching", ar: "الدعوة والتعليم", tr: "Tebliğ ve öğretim" },
  { slug: "craft", en: "Making things", ar: "الإبداع والصنعة", tr: "Sanat ve zanaat" },
  { slug: "stewardship", en: "Land and animals", ar: "البيئة والحيوان", tr: "Tabiat ve hayvanlar" },
];

export type Intention = {
  slug: string;
  group: ActGroup;
  /** The ordinary act, before any reframing. */
  act: { en: string; ar: string; tr: string };
  source: {
    label: { en: string; ar: string; tr: string };
    original?: string;
    dorar?: DorarRef;
  };
  en: { intention: string; note: string };
  ar: { intention: string; note: string };
  tr: { intention: string; note: string };
};

type IntentionTr = { locale: string; act: string; intention: string; note: string; source_label: string };

const loadIntentions = unstable_cache(
  async (): Promise<Intention[]> => {
    const [rows, dorar] = await Promise.all([
      db
        .from("intentions")
        .select(
          "slug,act_group,source_original,created_at,intention_translations(locale,act,intention,note,source_label)",
        )
        .order("created_at"),
      db.from("dorar_hadith").select("slug,cited"),
    ]);
    if (rows.error || dorar.error) {
      console.error("[content] intentions load failed:", rows.error?.message ?? dorar.error?.message);
      return [];
    }
    const cited = new Map(dorar.data.map((d) => [d.slug, d.cited as DorarRef | null]));
    const intentions: Intention[] = [];
    for (const r of rows.data) {
      const tr = Object.fromEntries(
        (r.intention_translations as IntentionTr[]).map((t) => [t.locale, t]),
      ) as Record<Locale, IntentionTr>;
      if (!tr.en || !tr.ar || !tr.tr) continue;
      intentions.push({
        slug: r.slug,
        group: r.act_group as ActGroup,
        act: { en: tr.en.act, ar: tr.ar.act, tr: tr.tr.act },
        source: {
          label: { en: tr.en.source_label, ar: tr.ar.source_label, tr: tr.tr.source_label },
          original: r.source_original ?? undefined,
          dorar: cited.get(r.slug) ?? undefined,
        },
        en: { intention: tr.en.intention, note: tr.en.note },
        ar: { intention: tr.ar.intention, note: tr.ar.note },
        tr: { intention: tr.tr.intention, note: tr.tr.note },
      });
    }
    return intentions;
  },
  ["content-intentions"],
  { tags: ["content:intentions"], revalidate: 3600 },
);

/** A few for the home page, where the point is that the surface exists, not to list it. */
export async function featuredIntentions(limit = 4) {
  return (await loadIntentions()).slice(0, limit);
}

/** Grouped for display, in taxonomy order, skipping groups with nothing in them. */
export async function intentionsByGroup() {
  const intentions = await loadIntentions();
  return ACT_GROUPS.map((g) => ({
    group: g,
    items: intentions.filter((i) => i.group === g.slug),
  })).filter((g) => g.items.length > 0);
}

// ── search ──────────────────────────────────────────────────────────────────

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

export async function searchIndex(locale: Locale): Promise<SearchHit[]> {
  const [situations, quotes, intentions] = await Promise.all([
    loadSituations(),
    loadQuotes(),
    loadIntentions(),
  ]);
  return [
    ...situations.map((s) => ({
      kind: "situation" as const,
      slug: s.slug,
      href: `/${locale}/${s.slug}`,
      title: s[locale].title,
      summary: s[locale].summary,
      match: across(LOCALES.map((l) => `${s[l].title} ${s[l].summary}`)),
    })),
    ...quotes.map((q) => ({
      kind: "saying" as const,
      slug: q.slug,
      href: `/${locale}/quotes/${q.slug}`,
      title: q[locale].saying ?? q.saying,
      summary: q[locale].closeness,
      match: across([q.saying, ...LOCALES.map((l) => `${q[l].saying ?? ""} ${q[l].angle} ${q[l].closeness}`)]),
    })),
    ...intentions.map((i) => ({
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
 * Naive contains-match over the cached index. The search_situations RPC
 * normalises Arabic but covers situations only; this stays until sayings and
 * intentions get the same treatment in the database.
 */
export async function searchAll(query: string, locale: Locale): Promise<SearchHit[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return (await searchIndex(locale)).filter((hit) => hit.match.includes(q));
}
