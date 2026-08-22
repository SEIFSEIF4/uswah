// Writes one validated SituationDoc to Supabase. Shared by the YAML pipeline
// (scripts/push-content.ts) and the admin dashboard's server actions, so both
// converge on identical rows. Callers validate first (lib/content-schema.ts)
// and pass a service-role client — RLS blocks content writes for everyone else.

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./supabase/database.types";
import type { Locale, SituationDoc } from "./content-schema";

type Db = SupabaseClient<Database>;

// ponytail: idempotent upserts rather than one transaction — supabase-js has no
// multi-statement transaction. A failed run leaves a partial situation; re-running
// converges. Move to a single plpgsql RPC if partial states ever reach readers.
export async function saveSituation(db: Db, doc: SituationDoc) {
  const locales = Object.keys(doc.translations) as Locale[];
  const inLocales = `(${locales.join(",")})`;

  // Re-saving a live situation must not bump its publish date.
  const { data: existing } = await db
    .from("situations")
    .select("published_at")
    .eq("slug", doc.slug)
    .maybeSingle();

  const { data: situation, error: sErr } = await db
    .from("situations")
    .upsert(
      {
        slug: doc.slug,
        published_at: doc.published ? (existing?.published_at ?? new Date().toISOString()) : null,
        topic: doc.topic ?? null,
        minutes: doc.minutes ?? null,
        feature: doc.feature ?? null,
        image_url: doc.image?.url ?? null,
        image_credit: doc.image?.credit ?? null,
        image_source_url: doc.image?.source_url ?? null,
        image_license: doc.image?.license ?? null,
        image_cleared_by: doc.image?.cleared_by ?? null,
        image_cleared_at: doc.image ? new Date(doc.image.cleared_at).toISOString() : null,
      },
      { onConflict: "slug" },
    )
    .select("id")
    .single();
  if (sErr || !situation) throw new Error(`${doc.slug}: ${sErr?.message}`);

  await must(
    db.from("situation_translations").upsert(
      locales.map((locale) => ({
        situation_id: situation.id,
        locale,
        title: doc.translations[locale]!.title,
        summary: doc.translations[locale]!.summary,
        image_alt: doc.translations[locale]!.image_alt ?? null,
      })),
      { onConflict: "situation_id,locale" },
    ),
    doc.slug,
  );
  // A locale removed from the doc comes off the row too, or it lingers half-stale.
  await must(
    db
      .from("situation_translations")
      .delete()
      .eq("situation_id", situation.id)
      .not("locale", "in", inLocales),
    doc.slug,
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
    if (srcErr || !source) throw new Error(`${doc.slug} entry ${i + 1}: ${srcErr?.message}`);

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
        doc.slug,
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
    if (eErr || !row) throw new Error(`${doc.slug} entry ${i + 1}: ${eErr?.message}`);

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
      doc.slug,
    );
    await must(
      db.from("entry_translations").delete().eq("entry_id", row.id).not("locale", "in", inLocales),
      doc.slug,
    );
  }

  // Entries deleted from the doc disappear from the site too; cascade takes their
  // translations. Orphaned sources stay — they are a library, not per-situation rows.
  await must(
    db
      .from("entries")
      .delete()
      .eq("situation_id", situation.id)
      .gt("position", doc.entries.length),
    doc.slug,
  );
}

async function must(p: PromiseLike<{ error: { message: string } | null }>, where: string) {
  const { error } = await p;
  if (error) throw new Error(`${where}: ${error.message}`);
}
