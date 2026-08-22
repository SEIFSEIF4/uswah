"use client";

/**
 * Create and edit are the same form over the same shape the YAML pipeline uses:
 * a SituationDoc, validated by lib/content-schema and written by lib/save-situation.
 * Whatever this form can save, `pnpm content:push` could have pushed, and vice versa.
 */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  COLLECTIONS,
  FEATURES,
  IMAGE_LICENCES,
  LOCALES,
  TOPICS,
  type Locale,
  type SituationDoc,
} from "@/lib/content-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveSituationAction } from "./actions";

type Entry = SituationDoc["entries"][number];
type Tr = NonNullable<SituationDoc["translations"][Locale]>;
type Img = NonNullable<SituationDoc["image"]>;

const LOCALE_NAMES: Record<Locale, string> = { en: "English", ar: "العربية", tr: "Türkçe" };
const dirFor = (l: Locale) => (l === "ar" ? "rtl" : "ltr");
const today = () => new Date().toISOString().slice(0, 10);

const blankImage: Img = {
  url: "",
  credit: "",
  source_url: "",
  license: "public-domain",
  cleared_by: "",
  cleared_at: "",
};

const blankEntry = (locales: Locale[]): Entry => ({
  source: { kind: "hadith", collection: "bukhari", ref: "", text_original: "" },
  translations: Object.fromEntries(locales.map((l) => [l, { body: "", takeaway: "" }])),
  reviewed_by: "UNVERIFIED",
  reviewed_at: today(),
});

const blankDoc = (): SituationDoc => ({
  slug: "",
  published: false,
  translations: { en: { title: "", summary: "" }, ar: { title: "", summary: "" } },
  entries: [blankEntry(["en", "ar"])],
});

/** Drop what the editor left empty, so optional things stay optional. */
function clean(doc: SituationDoc): SituationDoc {
  const locales = Object.keys(doc.translations) as Locale[];
  return {
    ...doc,
    slug: doc.slug.trim(),
    image: doc.image && doc.image.url.trim() ? doc.image : undefined,
    translations: Object.fromEntries(
      locales.map((l) => {
        const t = doc.translations[l]!;
        return [l, { ...t, image_alt: t.image_alt?.trim() ? t.image_alt : undefined }];
      }),
    ),
    entries: doc.entries.map((e) => {
      const kept = Object.entries(e.source.translations ?? {}).filter(
        ([, v]) => v && (v.text.trim() || v.translator.trim()),
      );
      return {
        ...e,
        source: {
          ...e.source,
          collection: e.source.kind === "quran" ? undefined : e.source.collection,
          translations: kept.length ? Object.fromEntries(kept) : undefined,
        },
      };
    }),
  };
}

const label = "grid gap-1 text-xs font-medium text-muted-foreground";
const select =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";
const card = "rounded-xl border p-4";

export function SituationForm({
  initial,
  mode,
  reviewer,
}: {
  initial?: SituationDoc;
  mode: "create" | "edit";
  reviewer: string;
}) {
  const [doc, setDoc] = useState<SituationDoc>(initial ?? blankDoc);
  const [errors, setErrors] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();
  const router = useRouter();

  const locales = Object.keys(doc.translations) as Locale[];

  const patch = (p: Partial<SituationDoc>) => {
    setSaved(false);
    setDoc((d) => ({ ...d, ...p }));
  };
  const patchTr = (loc: Locale, p: Partial<Tr>) =>
    patch({ translations: { ...doc.translations, [loc]: { ...doc.translations[loc]!, ...p } } });
  const patchImage = (p: Partial<Img>) => patch({ image: { ...(doc.image ?? blankImage), ...p } });
  const patchEntry = (i: number, fn: (e: Entry) => Entry) =>
    patch({ entries: doc.entries.map((e, j) => (j === i ? fn(e) : e)) });
  const patchSource = (i: number, p: Partial<Entry["source"]>) =>
    patchEntry(i, (en) => ({ ...en, source: { ...en.source, ...p } }));
  const patchSourceTr = (i: number, loc: Locale, p: Partial<{ text: string; translator: string }>) =>
    patchEntry(i, (en) => ({
      ...en,
      source: {
        ...en.source,
        translations: {
          ...en.source.translations,
          [loc]: { text: "", translator: "", ...en.source.translations?.[loc], ...p },
        },
      },
    }));
  const patchEntryTr = (i: number, loc: Locale, p: Partial<{ body: string; takeaway: string }>) =>
    patchEntry(i, (en) => ({
      ...en,
      translations: {
        ...en.translations,
        [loc]: { body: "", takeaway: "", ...en.translations[loc], ...p },
      },
    }));

  const toggleLocale = (loc: Locale) => {
    if (locales.includes(loc)) {
      if (locales.length === 1) return; // a situation with no language is nothing
      const translations = { ...doc.translations };
      delete translations[loc];
      patch({
        translations,
        entries: doc.entries.map((e) => {
          const body = { ...e.translations };
          delete body[loc];
          const src = e.source.translations ? { ...e.source.translations } : undefined;
          if (src) delete src[loc];
          return { ...e, translations: body, source: { ...e.source, translations: src } };
        }),
      });
    } else {
      patch({
        translations: { ...doc.translations, [loc]: { title: "", summary: "" } },
        entries: doc.entries.map((e) => ({
          ...e,
          translations: { ...e.translations, [loc]: { body: "", takeaway: "" } },
        })),
      });
    }
  };

  const submit = () =>
    start(async () => {
      const res = await saveSituationAction(clean(doc));
      if (res.errors) {
        setErrors(res.errors);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (mode === "create") {
        router.push("/");
      } else {
        setErrors([]);
        setSaved(true);
        router.refresh();
      }
    });

  return (
    <div className="grid gap-4">
      {errors.length > 0 && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          <p className="mb-1 font-medium">Not saved:</p>
          <ul className="list-inside list-disc">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ── basics ── */}
      <section className={`${card} grid gap-3`}>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className={label}>
            Slug
            <Input
              value={doc.slug}
              onChange={(e) => patch({ slug: e.target.value })}
              disabled={mode === "edit"}
              placeholder="someone-keeps-asking-me-for-money"
            />
            {mode === "edit" && (
              <span className="font-normal">Stable — deep links from social depend on it.</span>
            )}
          </label>
          <div className={label}>
            Languages
            <div className="flex h-8 items-center gap-4">
              {LOCALES.map((l) => (
                <label key={l} className="flex items-center gap-1.5 text-sm font-normal text-foreground">
                  <input
                    type="checkbox"
                    checked={locales.includes(l)}
                    onChange={() => toggleLocale(l)}
                  />
                  {LOCALE_NAMES[l]}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className={label}>
            Topic
            <select
              className={select}
              value={doc.topic ?? ""}
              onChange={(e) =>
                patch({ topic: (e.target.value || undefined) as SituationDoc["topic"] })
              }
            >
              <option value="">—</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            Minutes — the reading estimate on every card
            <Input
              type="number"
              min={1}
              value={doc.minutes ?? ""}
              onChange={(e) =>
                patch({ minutes: e.target.value ? Number(e.target.value) : undefined })
              }
            />
          </label>
          <label className={label}>
            Home-page slot — one hero and one band, site-wide
            <select
              className={select}
              value={doc.feature ?? ""}
              onChange={(e) =>
                patch({ feature: (e.target.value || undefined) as SituationDoc["feature"] })
              }
            >
              <option value="">none</option>
              {FEATURES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="flex items-center gap-1.5 text-sm">
          <input
            type="checkbox"
            checked={doc.published}
            onChange={(e) => patch({ published: e.target.checked })}
          />
          Published — visible to readers once saved
        </label>
      </section>

      {/* ── per-language title and summary ── */}
      {locales.map((loc) => (
        <section key={loc} className={`${card} grid gap-3`} dir={dirFor(loc)} lang={loc}>
          <h2 className="text-sm font-semibold">{LOCALE_NAMES[loc]}</h2>
          <label className={label}>
            Title — the reader&apos;s own words, not a topic label
            <Input
              value={doc.translations[loc]?.title ?? ""}
              onChange={(e) => patchTr(loc, { title: e.target.value })}
            />
          </label>
          <label className={label}>
            Summary
            <Textarea
              value={doc.translations[loc]?.summary ?? ""}
              onChange={(e) => patchTr(loc, { summary: e.target.value })}
            />
          </label>
          {doc.image && (
            <label className={label}>
              Image alt text
              <Input
                value={doc.translations[loc]?.image_alt ?? ""}
                onChange={(e) => patchTr(loc, { image_alt: e.target.value })}
              />
            </label>
          )}
        </section>
      ))}

      {/* ── artwork ── */}
      <section className={`${card} grid gap-3`}>
        <label className="flex items-center gap-1.5 text-sm font-semibold">
          <input
            type="checkbox"
            checked={doc.image !== undefined}
            onChange={(e) => patch({ image: e.target.checked ? blankImage : undefined })}
          />
          Artwork
        </label>
        {doc.image && (
          <>
            <p className="text-xs text-muted-foreground">
              Public-domain archives only. It must depict neither the Prophet ﷺ, another
              prophet, nor a companion — naming who cleared it is what the database requires.
            </p>
            <label className={label}>
              URL
              <Input value={doc.image.url} onChange={(e) => patchImage({ url: e.target.value })} />
            </label>
            {doc.image.url && (
              // eslint-disable-next-line @next/next/no-img-element -- external, admin-only preview
              <img
                src={doc.image.url}
                alt="Preview"
                className="max-h-48 w-fit rounded-lg border object-contain"
              />
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <label className={label}>
                Credit — what it is, where and when
                <Input
                  value={doc.image.credit}
                  onChange={(e) => patchImage({ credit: e.target.value })}
                  placeholder="Folio from a Shahnama, Iran, 1341"
                />
              </label>
              <label className={label}>
                Source URL
                <Input
                  value={doc.image.source_url}
                  onChange={(e) => patchImage({ source_url: e.target.value })}
                />
              </label>
              <label className={label}>
                Licence
                <select
                  className={select}
                  value={doc.image.license}
                  onChange={(e) => patchImage({ license: e.target.value })}
                >
                  {IMAGE_LICENCES.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={label}>
                  Cleared by
                  <Input
                    value={doc.image.cleared_by}
                    onChange={(e) => patchImage({ cleared_by: e.target.value })}
                  />
                </label>
                <label className={label}>
                  Cleared at
                  <Input
                    type="date"
                    value={doc.image.cleared_at}
                    onChange={(e) => patchImage({ cleared_at: e.target.value })}
                  />
                </label>
              </div>
            </div>
          </>
        )}
      </section>

      {/* ── entries ── */}
      {doc.entries.map((entry, i) => (
        <section key={i} className={`${card} grid gap-3`}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Entry {i + 1}</h2>
            {doc.entries.length > 1 && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => patch({ entries: doc.entries.filter((_, j) => j !== i) })}
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className={label}>
              Source
              <select
                className={select}
                value={entry.source.kind}
                onChange={(e) =>
                  patchSource(i, {
                    kind: e.target.value as "quran" | "hadith",
                    collection:
                      e.target.value === "quran" ? undefined : (entry.source.collection ?? "bukhari"),
                  })
                }
              >
                <option value="hadith">Hadith</option>
                <option value="quran">Quran</option>
              </select>
            </label>
            {entry.source.kind === "hadith" && (
              <label className={label}>
                Collection
                <select
                  className={select}
                  value={entry.source.collection ?? "bukhari"}
                  onChange={(e) => patchSource(i, { collection: e.target.value })}
                >
                  {COLLECTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className={label}>
              {entry.source.kind === "quran" ? "Ref — surah:ayah" : "Ref — hadith number"}
              <Input
                value={entry.source.ref}
                onChange={(e) => patchSource(i, { ref: e.target.value })}
              />
            </label>
          </div>

          <label className={label}>
            Original Arabic — transcribed from the collection, never from memory
            <Textarea
              dir="rtl"
              lang="ar"
              className="min-h-24 text-base leading-relaxed"
              value={entry.source.text_original}
              onChange={(e) => patchSource(i, { text_original: e.target.value })}
            />
          </label>

          {locales
            .filter((l) => l !== "ar")
            .map((loc) => (
              <div key={loc} className="grid gap-3 sm:grid-cols-[1fr_12rem]">
                <label className={label}>
                  Source translation ({LOCALE_NAMES[loc]})
                  <Textarea
                    value={entry.source.translations?.[loc]?.text ?? ""}
                    onChange={(e) => patchSourceTr(i, loc, { text: e.target.value })}
                  />
                </label>
                <label className={label}>
                  Translator
                  <Input
                    value={entry.source.translations?.[loc]?.translator ?? ""}
                    onChange={(e) => patchSourceTr(i, loc, { translator: e.target.value })}
                  />
                </label>
              </div>
            ))}

          {locales.map((loc) => (
            <div key={loc} className="grid gap-3" dir={dirFor(loc)} lang={loc}>
              <label className={label}>
                Body ({LOCALE_NAMES[loc]}) — one to three minutes, plain words
                <Textarea
                  className="min-h-24"
                  value={entry.translations[loc]?.body ?? ""}
                  onChange={(e) => patchEntryTr(i, loc, { body: e.target.value })}
                />
              </label>
              <label className={label}>
                Takeaway ({LOCALE_NAMES[loc]}) — one concrete action
                <Textarea
                  value={entry.translations[loc]?.takeaway ?? ""}
                  onChange={(e) => patchEntryTr(i, loc, { takeaway: e.target.value })}
                />
              </label>
            </div>
          ))}

          <div className="flex flex-wrap items-end gap-3 rounded-lg bg-muted/50 p-3">
            <label className={label}>
              Reviewed by
              <Input
                value={entry.reviewed_by}
                onChange={(e) => patchEntry(i, (en) => ({ ...en, reviewed_by: e.target.value }))}
              />
            </label>
            <label className={label}>
              Reviewed at
              <Input
                type="date"
                value={entry.reviewed_at}
                onChange={(e) => patchEntry(i, (en) => ({ ...en, reviewed_at: e.target.value }))}
              />
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                patchEntry(i, (en) => ({ ...en, reviewed_by: reviewer, reviewed_at: today() }))
              }
            >
              Checked against the collection — sign as {reviewer}
            </Button>
            {entry.reviewed_by === "UNVERIFIED" && (
              <span className="text-xs text-destructive">
                Unverified: open the printed collection and confirm wording, number, translator.
              </span>
            )}
          </div>
        </section>
      ))}

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => patch({ entries: [...doc.entries, blankEntry(locales)] })}>
          Add entry
        </Button>
        <Button onClick={submit} disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Create situation" : "Save changes"}
        </Button>
        {saved && <span className="text-sm text-muted-foreground">Saved.</span>}
      </div>
    </div>
  );
}
