// These rules mirror the database exactly. If you change one, change the other:
// supabase/migrations/20260810000000_init.sql

export const LOCALES = ["en", "ar", "tr"] as const;
export type Locale = (typeof LOCALES)[number];

/** Draft placeholder for an unreviewed entry. Never a value validate() accepts. */
export const UNVERIFIED_SENTINEL = "UNVERIFIED";

export const COLLECTIONS = ["bukhari", "muslim"] as const;
export const RESERVED_SLUGS = ["search", "about", "login", "saved", "topics", "quotes", "sayings", "intentions", "new"];

export const IMAGE_LICENCES = ["public-domain", "cc0", "cc-by-4.0", "cc-by-sa-4.0", "cc-by-2.0"];

export const TOPICS = ["money", "work", "family", "self", "friendship", "hardship"] as const;
export type Topic = (typeof TOPICS)[number];
export const FEATURES = ["hero", "band"] as const;

export type SituationDoc = {
  slug: string;
  published: boolean;
  topic?: Topic;
  minutes?: number;
  /** One of each feature, site-wide. */
  feature?: (typeof FEATURES)[number];
  image?: {
    url: string;
    credit: string;
    source_url: string;
    license: string;
    /** Who confirmed the image depicts nothing it must not. Not optional. */
    cleared_by: string;
    cleared_at: string;
  };
  translations: Partial<Record<Locale, { title: string; summary: string; image_alt?: string }>>;
  entries: {
    source: {
      kind: "quran" | "hadith";
      collection?: string;
      ref: string;
      text_original: string;
      translations?: Partial<Record<Locale, { text: string; translator: string }>>;
    };
    translations: Partial<Record<Locale, { body: string; takeaway: string }>>;
    reviewed_by: string;
    reviewed_at: string;
  }[];
};

const isFilled = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

const slugProblem = (slug: unknown): string | null => {
  if (!isFilled(slug)) return "missing slug";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
    return `slug "${slug}" must be lowercase words joined by single hyphens`;
  if (RESERVED_SLUGS.includes(slug)) return `slug "${slug}" would shadow the /${slug} route`;
  return null;
};

// ── sayings ───────────────────────────────────────────────────────────────────
export const GRADES = ["quran", "sahih", "hasan", "disputed", "historical"] as const;
export type Grade = (typeof GRADES)[number];
/** Mirrors weak_grades_stay_drafts. */
export const PUBLISHABLE_GRADES: readonly Grade[] = ["quran", "sahih"];

export type SayingDoc = {
  slug: string;
  published: boolean;
  saying: string;
  grade: Grade;
  situation_slug?: string;
  source_original?: string;
  /** Per-locale `saying` is the native equivalent aphorism, optional; the reader
      site falls back to the canonical `saying` above when a locale has none.
      `source_text`/`source_translator` are the source's translation and its
      credit, shown together or not at all. */
  translations: Partial<
    Record<
      Locale,
      { saying?: string; angle: string; closeness: string; source_label: string; source_text?: string; source_translator?: string }
    >
  >;
};

export function validateSaying(doc: SayingDoc): string[] {
  const e: string[] = [];
  const bad = slugProblem(doc.slug);
  if (bad) e.push(bad);
  if (!isFilled(doc.saying)) e.push("missing the saying itself");
  if (!GRADES.includes(doc.grade)) e.push(`unknown grade "${doc.grade}"`);

  const declared = Object.keys(doc.translations ?? {}) as Locale[];
  if (declared.length === 0) e.push("no translations");
  for (const loc of declared) {
    if (!LOCALES.includes(loc)) e.push(`unknown locale "${loc}"`);
    const t = doc.translations[loc];
    if (!isFilled(t?.angle)) e.push(`${loc}: missing angle`);
    if (!isFilled(t?.closeness)) e.push(`${loc}: missing closeness`);
    if (!isFilled(t?.source_label)) e.push(`${loc}: missing source label`);
  }

  if (doc.published && !PUBLISHABLE_GRADES.includes(doc.grade))
    e.push(`grade "${doc.grade}" cannot be published until a scholarly reviewer joins - keep it a draft`);
  return e;
}

// ── intentions ────────────────────────────────────────────────────────────────
export const ACT_GROUPS = [
  "worship", "body", "daily", "order", "travel", "occasions", "people",
  "service", "self", "learning", "knowledge", "craft", "stewardship",
] as const;
export type ActGroup = (typeof ACT_GROUPS)[number];

export type IntentionDoc = {
  slug: string;
  published: boolean;
  act_group: ActGroup;
  source_original?: string;
  translations: Partial<Record<Locale, { act: string; intention: string; note: string; source_label: string }>>;
};

export function validateIntention(doc: IntentionDoc): string[] {
  const e: string[] = [];
  const bad = slugProblem(doc.slug);
  if (bad) e.push(bad);
  if (!ACT_GROUPS.includes(doc.act_group)) e.push(`unknown group "${doc.act_group}"`);

  const declared = Object.keys(doc.translations ?? {}) as Locale[];
  if (declared.length === 0) e.push("no translations");
  for (const loc of declared) {
    if (!LOCALES.includes(loc)) e.push(`unknown locale "${loc}"`);
    const t = doc.translations[loc];
    if (!isFilled(t?.act)) e.push(`${loc}: missing act`);
    if (!isFilled(t?.intention)) e.push(`${loc}: missing intention`);
    if (!isFilled(t?.note)) e.push(`${loc}: missing note`);
    if (!isFilled(t?.source_label)) e.push(`${loc}: missing source label`);
  }
  return e;
}

/** Returns a list of human-readable problems. Empty means the document may be pushed. */
export function validate(doc: unknown, file: string): string[] {
  const e: string[] = [];
  const at = (msg: string) => e.push(`${file}: ${msg}`);
  const d = doc as SituationDoc;

  if (!d || typeof d !== "object") return [`${file}: not a YAML mapping`];

  const badSlug = slugProblem(d.slug);
  if (badSlug) at(badSlug);

  if (typeof d.published !== "boolean") at("published must be true or false");

  if (d.topic !== undefined && !TOPICS.includes(d.topic)) at(`unknown topic "${d.topic}"`);
  if (d.minutes !== undefined && (!Number.isInteger(d.minutes) || d.minutes <= 0))
    at("minutes must be a positive whole number");
  if (d.feature !== undefined && !FEATURES.includes(d.feature))
    at(`feature must be ${FEATURES.join(" or ")}`);
  // The reader site files everything under a topic and stamps a read time on
  // every card, so a published situation without them has nowhere to render.
  if (d.published && !d.topic) at("published needs a topic");
  if (d.published && !d.minutes) at("published needs a reading estimate (minutes)");

  const declared = Object.keys(d.translations ?? {}) as Locale[];
  if (declared.length === 0) at("no translations");
  for (const loc of declared) {
    if (!LOCALES.includes(loc)) at(`unknown locale "${loc}"`);
    const t = d.translations[loc];
    if (!isFilled(t?.title)) at(`${loc}: missing title`);
    if (!isFilled(t?.summary)) at(`${loc}: missing summary`);
  }

  if (d.image) {
    const i = d.image;
    if (!isFilled(i.url)) at("image: missing url");
    if (!isFilled(i.credit)) at("image: missing credit - what it is, where and when");
    if (!isFilled(i.source_url)) at("image: missing source_url, so nobody can check it");
    if (!IMAGE_LICENCES.includes(i.license))
      at(`image: licence "${i.license ?? "none"}" not in ${IMAGE_LICENCES.join(", ")}`);
    if (!isFilled(i.cleared_by))
      at("image: missing cleared_by - name who confirmed it depicts neither the Prophet ﷺ, another prophet, nor a companion");
    if (!isFilled(i.cleared_at)) at("image: missing cleared_at");
    else if (Number.isNaN(Date.parse(i.cleared_at))) at(`image: cleared_at "${i.cleared_at}" is not a date`);

    for (const loc of declared) {
      if (!isFilled(d.translations[loc]?.image_alt)) at(`${loc}: image needs image_alt`);
    }
  }

  if (!Array.isArray(d.entries) || d.entries.length === 0) at("no entries");

  (d.entries ?? []).forEach((entry, i) => {
    const where = `entry ${i + 1}`;

    // Reliability is not optional: these three are NOT NULL in the database.
    // The draft placeholder is deliberately not "filled in" - a literal sentinel
    // string satisfying a non-empty check is how an unreviewed entry used to publish.
    if (!isFilled(entry.reviewed_by) || entry.reviewed_by === UNVERIFIED_SENTINEL)
      at(`${where}: missing reviewed_by`);
    if (!isFilled(entry.reviewed_at)) at(`${where}: missing reviewed_at`);
    else if (Number.isNaN(Date.parse(entry.reviewed_at)))
      at(`${where}: reviewed_at "${entry.reviewed_at}" is not a date`);

    const s = entry.source;
    if (!s) return at(`${where}: missing source`);
    if (!isFilled(s.text_original)) at(`${where}: source has no original Arabic`);
    if (!isFilled(s.ref)) at(`${where}: source has no ref`);

    if (s.kind === "quran") {
      if (s.collection) at(`${where}: a Quran source cannot have a collection`);
    } else if (s.kind === "hadith") {
      if (!COLLECTIONS.includes(s.collection as (typeof COLLECTIONS)[number]))
        at(
          `${where}: collection "${s.collection ?? "none"}" is not allowed - ` +
            `only ${COLLECTIONS.join(" and ")} until a reviewer joins the project`,
        );
    } else {
      at(`${where}: kind must be quran or hadith`);
    }

    for (const loc of declared) {
      const t = entry.translations?.[loc];
      if (!isFilled(t?.body)) at(`${where} ${loc}: missing body`);
      if (!isFilled(t?.takeaway)) at(`${where} ${loc}: missing takeaway`);
      const st = s.translations?.[loc];
      if (st && !isFilled(st.translator))
        at(`${where} ${loc}: source translation has no translator`);
      if (st && !isFilled(st.text))
        at(`${where} ${loc}: source translation is empty`);
    }
  });

  if (d.published && declared.length > 0) {
    for (const loc of declared) {
      const missing = (d.entries ?? []).some(
        (en) => !isFilled(en.translations?.[loc]?.body),
      );
      if (missing)
        at(`published, but ${loc} is incomplete - finish it or set published: false`);
    }
  }

  return e;
}
