// pnpm content:test — fails if the validator stops catching the things that matter.
import assert from "node:assert/strict";
import { validate } from "../lib/content-schema";

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

// --- images -----------------------------------------------------------------
const withImage = () => {
  const d = clone();
  d.image = {
    url: "https://upload.wikimedia.org/x.jpg",
    credit: "Folio from a Shahnama, Iran, 1341",
    source_url: "https://commons.wikimedia.org/wiki/File:X.jpg",
    license: "public-domain",
    cleared_by: "seif",
    cleared_at: "2026-08-11",
  };
  d.translations.en.image_alt = "A manuscript painting of a market scene";
  d.translations.ar.image_alt = "منمنمة تصور مشهدًا في السوق";
  return d;
};

assert.deepEqual(validate(withImage(), "f.yaml"), [], "a fully attributed image must pass");

const imgFails = (mutate: (d: any) => void, needle: string) => {
  const d = withImage();
  mutate(d);
  const errs = validate(d, "f.yaml");
  assert.ok(
    errs.some((e) => e.includes(needle)),
    `expected "${needle}", got: ${JSON.stringify(errs)}`,
  );
};

// The clearance gate is the thing standing between the project and an unrecoverable
// mistake, so it gets the most tests.
imgFails((d) => delete d.image.cleared_by, "cleared_by");
imgFails((d) => delete d.image.cleared_at, "cleared_at");
imgFails((d) => (d.image.cleared_at = "someday"), "not a date");
imgFails((d) => delete d.image.source_url, "source_url");
imgFails((d) => delete d.image.credit, "credit");
imgFails((d) => (d.image.license = "all rights reserved"), "not in");
imgFails((d) => delete d.translations.ar.image_alt, "ar: image needs image_alt");

console.log("--- CONTENT SCHEMA TESTS PASSED ---");
