// Writes validated SayingDocs and IntentionDocs to Supabase. Same contract as
// lib/save-situation.ts: callers validate first and pass a service-role client;
// upserts are idempotent, re-saving a live row keeps its publish date, and
// locales removed from a doc come off their rows too.

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./supabase/database.types";
import type { IntentionDoc, Locale, SayingDoc } from "./content-schema";

type Db = SupabaseClient<Database>;

async function publishedAt(db: Db, table: "sayings" | "intentions", doc: { slug: string; published: boolean }) {
  const { data } = await db.from(table).select("published_at").eq("slug", doc.slug).maybeSingle();
  return doc.published ? (data?.published_at ?? new Date().toISOString()) : null;
}

export async function saveSaying(db: Db, doc: SayingDoc) {
  const locales = Object.keys(doc.translations) as Locale[];

  const { data: row, error } = await db
    .from("sayings")
    .upsert(
      {
        slug: doc.slug,
        saying: doc.saying,
        grade: doc.grade,
        situation_slug: doc.situation_slug ?? null,
        source_original: doc.source_original ?? null,
        published_at: await publishedAt(db, "sayings", doc),
      },
      { onConflict: "slug" },
    )
    .select("id")
    .single();
  if (error || !row) throw new Error(`${doc.slug}: ${error?.message}`);

  await must(
    db.from("saying_translations").upsert(
      locales.map((locale) => ({ saying_id: row.id, locale, ...doc.translations[locale]! })),
      { onConflict: "saying_id,locale" },
    ),
    doc.slug,
  );
  await must(
    db.from("saying_translations").delete().eq("saying_id", row.id).not("locale", "in", `(${locales.join(",")})`),
    doc.slug,
  );
}

export async function saveIntention(db: Db, doc: IntentionDoc) {
  const locales = Object.keys(doc.translations) as Locale[];

  const { data: row, error } = await db
    .from("intentions")
    .upsert(
      {
        slug: doc.slug,
        act_group: doc.act_group,
        source_original: doc.source_original ?? null,
        published_at: await publishedAt(db, "intentions", doc),
      },
      { onConflict: "slug" },
    )
    .select("id")
    .single();
  if (error || !row) throw new Error(`${doc.slug}: ${error?.message}`);

  await must(
    db.from("intention_translations").upsert(
      locales.map((locale) => ({ intention_id: row.id, locale, ...doc.translations[locale]! })),
      { onConflict: "intention_id,locale" },
    ),
    doc.slug,
  );
  await must(
    db.from("intention_translations").delete().eq("intention_id", row.id).not("locale", "in", `(${locales.join(",")})`),
    doc.slug,
  );
}

async function must(p: PromiseLike<{ error: { message: string } | null }>, where: string) {
  const { error } = await p;
  if (error) throw new Error(`${where}: ${error.message}`);
}
