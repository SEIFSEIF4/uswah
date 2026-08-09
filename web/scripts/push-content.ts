// Reads authored situations from ../content/situations/*.yaml and writes them to Supabase.
//
//   pnpm content:push            validate + print what would change, write nothing
//   pnpm content:push --apply    write it
//
// Requires SUPABASE_SERVICE_ROLE_KEY in web/.env.local. That key bypasses RLS and never
// belongs in a client bundle or in git.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../lib/supabase/database.types";
import { validate, type Locale, type SituationDoc } from "./content-schema";

const DIR = join(import.meta.dirname, "..", "..", "content", "situations");
const apply = process.argv.includes("--apply");

function load(): { file: string; doc: SituationDoc }[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".yaml"))
    .map((file) => ({ file, doc: parse(readFileSync(join(DIR, file), "utf8")) }));
}

async function push(docs: { file: string; doc: SituationDoc }[]) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in web/.env.local");
    process.exit(1);
  }
  const db = createClient<Database>(url, key, { auth: { persistSession: false } });

  // ponytail: idempotent upserts rather than one transaction — supabase-js has no
  // multi-statement transaction. A failed run leaves a partial situation; re-running
  // converges. Move to a single plpgsql RPC if partial states ever reach readers.
  for (const { file, doc } of docs) {
    const locales = Object.keys(doc.translations) as Locale[];

    const { data: situation, error: sErr } = await db
      .from("situations")
      .upsert(
        { slug: doc.slug, published_at: doc.published ? new Date().toISOString() : null },
        { onConflict: "slug" },
      )
      .select("id")
      .single();
    if (sErr || !situation) throw new Error(`${file}: ${sErr?.message}`);

    await must(
      db.from("situation_translations").upsert(
        locales.map((locale) => ({
          situation_id: situation.id,
          locale,
          title: doc.translations[locale]!.title,
          summary: doc.translations[locale]!.summary,
        })),
        { onConflict: "situation_id,locale" },
      ),
      file,
    );

    for (const [i, entry] of doc.entries.entries()) {
      const { data: source, error: srcErr } = await db
        .from("sources")
        .upsert(
          {
            kind: entry.source.kind,
            grade: entry.source.kind === "quran" ? "quran" : "sahih",
            collection: entry.source.collection ?? null,
            ref: entry.source.ref,
            text_original: entry.source.text_original,
          },
          { onConflict: "kind,collection,ref" },
        )
        .select("id")
        .single();
      if (srcErr || !source) throw new Error(`${file} entry ${i + 1}: ${srcErr?.message}`);

      const srcTranslations = locales
        .filter((l) => entry.source.translations?.[l])
        .map((locale) => ({
          source_id: source.id,
          locale,
          text: entry.source.translations![locale]!.text,
          translator: entry.source.translations![locale]!.translator,
        }));
      if (srcTranslations.length)
        await must(
          db.from("source_translations").upsert(srcTranslations, { onConflict: "source_id,locale" }),
          file,
        );

      const { data: row, error: eErr } = await db
        .from("entries")
        .upsert(
          {
            situation_id: situation.id,
            position: i + 1,
            source_id: source.id,
            reviewed_by: entry.reviewed_by,
            reviewed_at: new Date(entry.reviewed_at).toISOString(),
          },
          { onConflict: "situation_id,position" },
        )
        .select("id")
        .single();
      if (eErr || !row) throw new Error(`${file} entry ${i + 1}: ${eErr?.message}`);

      await must(
        db.from("entry_translations").upsert(
          locales.map((locale) => ({
            entry_id: row.id,
            locale,
            body: entry.translations[locale]!.body,
            takeaway: entry.translations[locale]!.takeaway,
          })),
          { onConflict: "entry_id,locale" },
        ),
        file,
      );
    }
    console.log(`  pushed ${doc.slug}`);
  }
}

async function must(p: PromiseLike<{ error: { message: string } | null }>, file: string) {
  const { error } = await p;
  if (error) throw new Error(`${file}: ${error.message}`);
}

const docs = load();
const errors = docs.flatMap(({ file, doc }) => validate(doc, file));

if (errors.length) {
  console.error(`${errors.length} problem(s):\n` + errors.map((e) => `  ${e}`).join("\n"));
  process.exit(1);
}

for (const { doc } of docs) {
  const locales = Object.keys(doc.translations).join(", ");
  console.log(
    `${doc.published ? "live " : "draft"}  ${doc.slug}  ` +
      `${doc.entries.length} entr${doc.entries.length === 1 ? "y" : "ies"}  [${locales}]`,
  );
}

if (!apply) {
  console.log(`\n${docs.length} file(s) valid. Nothing written — pass --apply to push.`);
} else {
  push(docs)
    .then(() => console.log(`\nPushed ${docs.length} situation(s).`))
    .catch((err) => {
      console.error(String(err));
      process.exit(1);
    });
}
