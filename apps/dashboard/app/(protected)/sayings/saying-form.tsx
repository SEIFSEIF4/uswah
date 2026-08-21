"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  GRADES,
  LOCALES,
  PUBLISHABLE_GRADES,
  type Grade,
  type Locale,
  type SayingDoc,
} from "@/lib/content-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveSayingAction } from "../actions";

type Tr = NonNullable<SayingDoc["translations"][Locale]>;

const LOCALE_NAMES: Record<Locale, string> = { en: "English", ar: "العربية", tr: "Türkçe" };
const dirFor = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

const blankDoc = (): SayingDoc => ({
  slug: "",
  published: false,
  saying: "",
  grade: "sahih",
  translations: {
    en: { angle: "", closeness: "", source_label: "" },
    ar: { angle: "", closeness: "", source_label: "" },
    tr: { angle: "", closeness: "", source_label: "" },
  },
});

const label = "grid gap-1 text-xs font-medium text-muted-foreground";
const select =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";
const card = "rounded-xl border p-4";

export function SayingForm({
  initial,
  mode,
  situations,
}: {
  initial?: SayingDoc;
  mode: "create" | "edit";
  situations: string[];
}) {
  const [doc, setDoc] = useState<SayingDoc>(initial ?? blankDoc);
  const [errors, setErrors] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();
  const router = useRouter();

  const locales = Object.keys(doc.translations) as Locale[];

  const patch = (p: Partial<SayingDoc>) => {
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
          [loc]: { angle: "", closeness: "", source_label: "" },
        },
      });
    }
  };

  const submit = () =>
    start(async () => {
      const res = await saveSayingAction({
        ...doc,
        slug: doc.slug.trim(),
        situation_slug: doc.situation_slug?.trim() ? doc.situation_slug.trim() : undefined,
        source_original: doc.source_original?.trim() ? doc.source_original : undefined,
      });
      if (res.errors) {
        setErrors(res.errors);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (mode === "create") {
        router.push("/sayings");
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
        <div className="grid gap-3 sm:grid-cols-2">
          <label className={label}>
            Slug
            <Input
              value={doc.slug}
              onChange={(e) => patch({ slug: e.target.value })}
              disabled={mode === "edit"}
              placeholder="teach-a-man-to-fish"
            />
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
          The saying — the quote as it circulates, in its own language
          <Textarea
            value={doc.saying}
            onChange={(e) => patch({ saying: e.target.value })}
            placeholder="Don't give me a fish. Teach me how to fish."
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className={label}>
            Grade of the Islamic treatment
            <select
              className={select}
              value={doc.grade}
              onChange={(e) => patch({ grade: e.target.value as Grade })}
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                  {PUBLISHABLE_GRADES.includes(g) ? "" : " (draft only until a reviewer joins)"}
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            Situation it belongs with (optional)
            <Input
              list="situation-slugs"
              value={doc.situation_slug ?? ""}
              onChange={(e) => patch({ situation_slug: e.target.value || undefined })}
              placeholder="asked-for-money-again"
            />
            <datalist id="situation-slugs">
              {situations.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </label>
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
          Published — visible to readers once saved
        </label>
      </section>

      {locales.map((loc) => (
        <section key={loc} className={`${card} grid gap-3`} dir={dirFor(loc)} lang={loc}>
          <h2 className="text-sm font-semibold">{LOCALE_NAMES[loc]}</h2>
          <label className={label}>
            Angle — what the Islamic source actually says
            <Textarea
              value={doc.translations[loc]?.angle ?? ""}
              onChange={(e) => patchTr(loc, { angle: e.target.value })}
            />
          </label>
          <label className={label}>
            Closeness — an honest note on how close the two are
            <Textarea
              value={doc.translations[loc]?.closeness ?? ""}
              onChange={(e) => patchTr(loc, { closeness: e.target.value })}
            />
          </label>
          <label className={label}>
            Source label
            <Input
              value={doc.translations[loc]?.source_label ?? ""}
              onChange={(e) => patchTr(loc, { source_label: e.target.value })}
              placeholder={loc === "en" ? "Sahih al-Bukhari 1471" : ""}
            />
          </label>
        </section>
      ))}

      <div className="flex items-center gap-3">
        <Button onClick={submit} disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Create saying" : "Save changes"}
        </Button>
        {saved && <span className="text-sm text-muted-foreground">Saved.</span>}
      </div>
    </div>
  );
}
