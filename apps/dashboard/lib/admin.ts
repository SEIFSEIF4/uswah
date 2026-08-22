/**
 * Everything the admin dashboard knows: who counts as an admin, the service-role
 * client content writes go through, and the reads that turn database rows back
 * into the SituationDoc shape the validator and the form both work on.
 *
 * Server-only by construction — ./supabase/server imports next/headers, and the
 * service key does not exist in the client bundle's env.
 */

import { createClient as createServiceClient, type SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";
import type { Database } from "./supabase/database.types";
import type { IntentionDoc, Locale, SayingDoc, SituationDoc } from "./content-schema";

/** The public site, for "view page" links out of the dashboard. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Signed-in user's email if it is listed in ADMIN_EMAILS, else null. */
export async function adminEmail(): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = (data?.claims?.email as string | undefined)?.toLowerCase();
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return email && admins.includes(email) ? email : null;
}

let service: SupabaseClient<Database> | undefined;

/** Service-role client. Bypasses RLS — only call after adminEmail() passed. */
export function adminDb() {
  service ??= createServiceClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  return service;
}

export type SituationRow = {
  slug: string;
  published_at: string | null;
  image_url: string | null;
  locales: Locale[];
  entryCount: number;
  unreviewed: number;
};

/** Every situation, drafts included, newest first. */
export async function listSituations(): Promise<SituationRow[]> {
  const { data, error } = await adminDb()
    .from("situations")
    .select("slug, published_at, image_url, created_at, situation_translations(locale), entries(reviewed_by)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data.map((s) => ({
    slug: s.slug,
    published_at: s.published_at,
    image_url: s.image_url,
    locales: s.situation_translations.map((t) => t.locale as Locale),
    entryCount: s.entries.length,
    unreviewed: s.entries.filter((e) => e.reviewed_by === "UNVERIFIED").length,
  }));
}

/** One situation as a SituationDoc, or null. The form edits exactly this shape. */
export async function loadSituationDoc(slug: string): Promise<SituationDoc | null> {
  const { data: s, error } = await adminDb()
    .from("situations")
    .select(
      `slug, published_at, topic, minutes, feature,
       image_url, image_credit, image_source_url, image_license, image_cleared_by, image_cleared_at,
       situation_translations(locale, title, summary, image_alt),
       entries(position, reviewed_by, reviewed_at,
         source:sources(kind, collection, ref, text_original,
           source_translations(locale, text, translator)),
         entry_translations(locale, body, takeaway))`,
    )
    .eq("slug", slug)
    .order("position", { referencedTable: "entries" })
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!s) return null;

  const day = (iso: string | null) => (iso ? iso.slice(0, 10) : "");

  return {
    slug: s.slug,
    published: s.published_at !== null,
    topic: (s.topic as SituationDoc["topic"]) ?? undefined,
    minutes: s.minutes ?? undefined,
    feature: (s.feature as SituationDoc["feature"]) ?? undefined,
    image: s.image_url
      ? {
          url: s.image_url,
          credit: s.image_credit ?? "",
          source_url: s.image_source_url ?? "",
          license: s.image_license ?? "",
          cleared_by: s.image_cleared_by ?? "",
          cleared_at: day(s.image_cleared_at),
        }
      : undefined,
    translations: Object.fromEntries(
      s.situation_translations.map((t) => [
        t.locale,
        { title: t.title, summary: t.summary, image_alt: t.image_alt ?? undefined },
      ]),
    ),
    entries: s.entries.map((e) => ({
      source: {
        kind: e.source.kind,
        collection: e.source.collection ?? undefined,
        ref: e.source.ref,
        text_original: e.source.text_original,
        translations: e.source.source_translations.length
          ? Object.fromEntries(
              e.source.source_translations.map((t) => [
                t.locale,
                { text: t.text, translator: t.translator },
              ]),
            )
          : undefined,
      },
      translations: Object.fromEntries(
        e.entry_translations.map((t) => [t.locale, { body: t.body, takeaway: t.takeaway }]),
      ),
      reviewed_by: e.reviewed_by,
      reviewed_at: day(e.reviewed_at),
    })),
  };
}

// ── sayings ───────────────────────────────────────────────────────────────────

export type SayingRow = {
  slug: string;
  saying: string;
  grade: string;
  situation_slug: string | null;
  published_at: string | null;
  locales: Locale[];
};

export async function listSayings(): Promise<SayingRow[]> {
  const { data, error } = await adminDb()
    .from("sayings")
    .select("slug, saying, grade, situation_slug, published_at, created_at, saying_translations(locale)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data.map((s) => ({
    slug: s.slug,
    saying: s.saying,
    grade: s.grade,
    situation_slug: s.situation_slug,
    published_at: s.published_at,
    locales: s.saying_translations.map((t) => t.locale as Locale),
  }));
}

export async function loadSayingDoc(slug: string): Promise<SayingDoc | null> {
  const { data: s, error } = await adminDb()
    .from("sayings")
    .select("slug, saying, grade, situation_slug, source_original, published_at, saying_translations(locale, angle, closeness, source_label)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!s) return null;
  return {
    slug: s.slug,
    published: s.published_at !== null,
    saying: s.saying,
    grade: s.grade as SayingDoc["grade"],
    situation_slug: s.situation_slug ?? undefined,
    source_original: s.source_original ?? undefined,
    translations: Object.fromEntries(
      s.saying_translations.map((t) => [
        t.locale,
        { angle: t.angle, closeness: t.closeness, source_label: t.source_label },
      ]),
    ),
  };
}

// ── intentions ────────────────────────────────────────────────────────────────

export type IntentionRow = {
  slug: string;
  act_group: string;
  act: string; // English act name, for the list
  published_at: string | null;
  locales: Locale[];
};

export async function listIntentions(): Promise<IntentionRow[]> {
  const { data, error } = await adminDb()
    .from("intentions")
    .select("slug, act_group, published_at, created_at, intention_translations(locale, act)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data.map((i) => ({
    slug: i.slug,
    act_group: i.act_group,
    act: i.intention_translations.find((t) => t.locale === "en")?.act ?? "",
    published_at: i.published_at,
    locales: i.intention_translations.map((t) => t.locale as Locale),
  }));
}

export async function loadIntentionDoc(slug: string): Promise<IntentionDoc | null> {
  const { data: i, error } = await adminDb()
    .from("intentions")
    .select("slug, act_group, source_original, published_at, intention_translations(locale, act, intention, note, source_label)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!i) return null;
  return {
    slug: i.slug,
    published: i.published_at !== null,
    act_group: i.act_group as IntentionDoc["act_group"],
    source_original: i.source_original ?? undefined,
    translations: Object.fromEntries(
      i.intention_translations.map((t) => [
        t.locale,
        { act: t.act, intention: t.intention, note: t.note, source_label: t.source_label },
      ]),
    ),
  };
}

/** Every situation slug, for linking a saying to one. */
export async function situationSlugs(): Promise<string[]> {
  const { data, error } = await adminDb().from("situations").select("slug").order("slug");
  if (error) throw new Error(error.message);
  return data.map((s) => s.slug);
}

export type DorarRow = Database["public"]["Tables"]["dorar_hadith"]["Row"];

/** The dorar.net record backing this slug, for the review panel. */
export async function loadDorar(slug: string): Promise<DorarRow | null> {
  const { data } = await adminDb().from("dorar_hadith").select("*").eq("slug", slug).maybeSingle();
  return data;
}
