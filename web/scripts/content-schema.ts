// Validation for authored content. Kept pure and separate so it can be tested and so
// failures surface locally instead of as a constraint violation after a round trip.
//
// These rules mirror the database exactly. If you change one, change the other:
// supabase/migrations/20260810000000_init.sql

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const COLLECTIONS = ["bukhari", "muslim"] as const;
export const RESERVED_SLUGS = ["search", "about", "login", "saved", "topics", "quotes"];

export const IMAGE_LICENCES = ["public-domain", "cc0", "cc-by-4.0", "cc-by-sa-4.0", "cc-by-2.0"];

export type SituationDoc = {
  slug: string;
  published: boolean;
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

/** Returns a list of human-readable problems. Empty means the document may be pushed. */
export function validate(doc: unknown, file: string): string[] {
  const e: string[] = [];
  const at = (msg: string) => e.push(`${file}: ${msg}`);
  const d = doc as SituationDoc;

  if (!d || typeof d !== "object") return [`${file}: not a YAML mapping`];

  if (!isFilled(d.slug)) at("missing slug");
  else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(d.slug))
    at(`slug "${d.slug}" must be lowercase words joined by single hyphens`);
  else if (RESERVED_SLUGS.includes(d.slug))
    at(`slug "${d.slug}" would shadow the /${d.slug} route`);

  if (typeof d.published !== "boolean") at("published must be true or false");

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
    if (!isFilled(i.credit)) at("image: missing credit — what it is, where and when");
    if (!isFilled(i.source_url)) at("image: missing source_url, so nobody can check it");
    if (!IMAGE_LICENCES.includes(i.license))
      at(`image: licence "${i.license ?? "none"}" not in ${IMAGE_LICENCES.join(", ")}`);
    // The clearance gate. Mirrors reviewed_by on entries, for the same reason: the
    // rule that must never be broken is the one that cannot be skipped.
    if (!isFilled(i.cleared_by))
      at("image: missing cleared_by — name who confirmed it depicts neither the Prophet ﷺ, another prophet, nor a companion");
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
    if (!isFilled(entry.reviewed_by)) at(`${where}: missing reviewed_by`);
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
          `${where}: collection "${s.collection ?? "none"}" is not allowed — ` +
            `only ${COLLECTIONS.join(" and ")} until a reviewer joins the project`,
        );
    } else {
      at(`${where}: kind must be quran or hadith`);
    }

    for (const loc of declared) {
      const t = entry.translations?.[loc];
      if (!isFilled(t?.body)) at(`${where} ${loc}: missing body`);
      if (!isFilled(t?.takeaway)) at(`${where} ${loc}: missing takeaway`);
      // A translated source quote must name who translated it.
      const st = s.translations?.[loc];
      if (st && !isFilled(st.translator))
        at(`${where} ${loc}: source translation has no translator`);
      if (st && !isFilled(st.text))
        at(`${where} ${loc}: source translation is empty`);
    }
  });

  // A half-translated page must never go live.
  if (d.published && declared.length > 0) {
    for (const loc of declared) {
      const missing = (d.entries ?? []).some(
        (en) => !isFilled(en.translations?.[loc]?.body),
      );
      if (missing)
        at(`published, but ${loc} is incomplete — finish it or set published: false`);
    }
  }

  return e;
}
