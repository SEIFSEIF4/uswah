"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ACT_GROUPS,
  LOCALES,
  type ActGroup,
  type IntentionDoc,
  type Locale,
} from "@/lib/content-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveIntentionAction } from "../actions";

type Tr = NonNullable<IntentionDoc["translations"][Locale]>;

const LOCALE_NAMES: Record<Locale, string> = { en: "English", ar: "العربية", tr: "Türkçe" };
const dirFor = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

/** English labels for the select; the taxonomy itself lives in content-schema. */
const GROUP_NAMES: Record<ActGroup, string> = {
  worship: "Worship",
  body: "Health",
  daily: "Daily life",
  order: "Time and order",
  travel: "Travel",
  occasions: "Occasions",
  people: "People",
  service: "Service",
  self: "Yourself",
  learning: "Learning",
  knowledge: "Teaching",
  craft: "Making things",
  stewardship: "Land and animals",
};

const blankDoc = (): IntentionDoc => ({
  slug: "",
  published: false,
  act_group: "daily",
  translations: {
    en: { act: "", intention: "", note: "", source_label: "" },
    ar: { act: "", intention: "", note: "", source_label: "" },
    tr: { act: "", intention: "", note: "", source_label: "" },
  },
});

const label = "grid gap-1 text-xs font-medium text-muted-foreground";
const select =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";
const card = "rounded-xl border p-4";

export function IntentionForm({ initial, mode }: { initial?: IntentionDoc; mode: "create" | "edit" }) {
  const [doc, setDoc] = useState<IntentionDoc>(initial ?? blankDoc);
  const [errors, setErrors] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();
  const router = useRouter();

  const locales = Object.keys(doc.translations) as Locale[];

  const patch = (p: Partial<IntentionDoc>) => {
    setSaved(false);
    setDoc((d) => ({ ...d, ...p }));
  };
  const patchTr = (loc: Locale, p: Partial<Tr>) =>
    patch({ translations: { ...doc.translations, [loc]: { ...doc.translations[loc]!, ...p } } });

  const toggleLocale = (loc: Locale) => {
    if (locales.includes(loc)) {
      if (locales.length === 1) return;
      const translations = { ...doc.translations };
      delete translations[loc];
      patch({ translations });
    } else {
      patch({
        translations: {
          ...doc.translations,
          [loc]: { act: "", intention: "", note: "", source_label: "" },
        },
      });
    }
  };

  const submit = () =>
    start(async () => {
      const res = await saveIntentionAction({
        ...doc,
        slug: doc.slug.trim(),
        source_original: doc.source_original?.trim() ? doc.source_original : undefined,
      });
      if (res.errors) {
        setErrors(res.errors);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (mode === "create") {
        router.push("/intentions");
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

      <section className={`${card} grid gap-3`}>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className={label}>
            Slug
            <Input
              value={doc.slug}
              onChange={(e) => patch({ slug: e.target.value })}
              disabled={mode === "edit"}
              placeholder="eating"
            />
          </label>
          <label className={label}>
            Group
            <select
              className={select}
              value={doc.act_group}
              onChange={(e) => patch({ act_group: e.target.value as ActGroup })}
            >
              {ACT_GROUPS.map((g) => (
                <option key={g} value={g}>
                  {GROUP_NAMES[g]}
                </option>
              ))}
            </select>
          </label>
          <div className={label}>
            Languages
            <div className="flex h-8 items-center gap-4">
              {LOCALES.map((l) => (
                <label key={l} className="flex items-center gap-1.5 text-sm font-normal text-foreground">
                  <input type="checkbox" checked={locales.includes(l)} onChange={() => toggleLocale(l)} />
                  {LOCALE_NAMES[l]}
                </label>
              ))}
            </div>
          </div>
        </div>

        <label className={label}>
          Original Arabic of the source (optional)
          <Textarea
            dir="rtl"
            lang="ar"
            className="min-h-20 text-base leading-relaxed"
            value={doc.source_original ?? ""}
            onChange={(e) => patch({ source_original: e.target.value || undefined })}
          />
        </label>

        <label className="flex items-center gap-1.5 text-sm">
          <input
            type="checkbox"
            checked={doc.published}
            onChange={(e) => patch({ published: e.target.checked })}
          />
          Published - visible to readers once saved
        </label>
      </section>

      {locales.map((loc) => (
        <section key={loc} className={`${card} grid gap-3`} dir={dirFor(loc)} lang={loc}>
          <h2 className="text-sm font-semibold">{LOCALE_NAMES[loc]}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className={label}>
              Act - the ordinary act, before any reframing
              <Input
                value={doc.translations[loc]?.act ?? ""}
                onChange={(e) => patchTr(loc, { act: e.target.value })}
              />
            </label>
            <label className={label}>
              Source label
              <Input
                value={doc.translations[loc]?.source_label ?? ""}
                onChange={(e) => patchTr(loc, { source_label: e.target.value })}
                placeholder={loc === "en" ? "Sahih Muslim 2734" : ""}
              />
            </label>
          </div>
          <label className={label}>
            Intention - what the act becomes once the intention is corrected
            <Textarea
              value={doc.translations[loc]?.intention ?? ""}
              onChange={(e) => patchTr(loc, { intention: e.target.value })}
            />
          </label>
          <label className={label}>
            Note
            <Textarea
              value={doc.translations[loc]?.note ?? ""}
              onChange={(e) => patchTr(loc, { note: e.target.value })}
            />
          </label>
        </section>
      ))}

      <div className="flex items-center gap-3">
        <Button onClick={submit} disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Create intention" : "Save changes"}
        </Button>
        {saved && <span className="text-sm text-muted-foreground">Saved.</span>}
      </div>
    </div>
  );
}
