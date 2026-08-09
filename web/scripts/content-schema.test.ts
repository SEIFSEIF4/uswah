// pnpm content:test — fails if the validator stops catching the things that matter.
import assert from "node:assert/strict";
import { validate } from "./content-schema";

const ok = {
  slug: "asked-for-money-again",
  published: true,
  translations: {
    en: { title: "T", summary: "S" },
    ar: { title: "ت", summary: "س" },
  },
  entries: [
    {
      source: { kind: "hadith", collection: "bukhari", ref: "1471", text_original: "نص" },
      translations: { en: { body: "b", takeaway: "t" }, ar: { body: "ب", takeaway: "ت" } },
      reviewed_by: "seif",
      reviewed_at: "2026-08-11",
    },
  ],
};

const clone = () => JSON.parse(JSON.stringify(ok));
const fails = (mutate: (d: any) => void, needle: string) => {
  const d = clone();
  mutate(d);
  const errs = validate(d, "f.yaml");
  assert.ok(
    errs.some((e) => e.includes(needle)),
    `expected an error containing "${needle}", got: ${JSON.stringify(errs)}`,
  );
};

assert.deepEqual(validate(ok, "f.yaml"), [], "the valid document must pass");

fails((d) => delete d.entries[0].reviewed_by, "missing reviewed_by");
fails((d) => delete d.entries[0].reviewed_at, "missing reviewed_at");
fails((d) => (d.entries[0].reviewed_at = "soon"), "is not a date");
fails((d) => (d.entries[0].source.collection = "tirmidhi"), "not allowed");
fails((d) => (d.entries[0].source.kind = "quran"), "cannot have a collection");
fails((d) => delete d.entries[0].source.text_original, "no original Arabic");
fails((d) => (d.entries = []), "no entries");
fails((d) => (d.slug = "search"), "shadow");
fails((d) => (d.slug = "Asked_For_Money"), "lowercase words");
// declared a locale, then left it half-written, and marked it live
fails((d) => delete d.entries[0].translations.ar.body, "ar is incomplete");
fails((d) => (d.translations.fr = { title: "x", summary: "y" }), "unknown locale");

console.log("--- CONTENT SCHEMA TESTS PASSED ---");
