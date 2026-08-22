"use server";

/**
 * The only paths that write content. Every action re-checks the admin gate -
 * the proxy and layout checks are UX; this one is the trust boundary.
 */

import { revalidatePath } from "next/cache";
import { adminDb, adminEmail, loadIntentionDoc, loadSayingDoc, loadSituationDoc } from "@/lib/admin";
import {
  validate,
  validateIntention,
  validateSaying,
  type IntentionDoc,
  type SayingDoc,
  type SituationDoc,
} from "@/lib/content-schema";
import { saveSituation } from "@/lib/save-situation";
import { saveIntention, saveSaying } from "@/lib/save-content";

export type ActionResult = { errors?: string[] };

const denied = async () => ((await adminEmail()) ? null : { errors: ["Not authorized."] });
const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));

/**
 * Best-effort ping to the reader site so its cached content reads flush now
 * rather than when their hour expires. Both tags every time: two cache entries
 * is not a cost worth a per-action tag map. A failure only delays freshness,
 * so it logs and moves on.
 */
async function revalidateSite() {
  const url = process.env.SITE_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!url || !secret) return;
  try {
    await fetch(`${url}/api/revalidate`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-revalidate-secret": secret },
      body: JSON.stringify({ tags: ["content:situations", "content:sayings", "content:intentions"] }),
    });
  } catch (e) {
    console.error("[dashboard] site revalidation failed:", msg(e));
  }
}

const done = async () => {
  revalidatePath("/", "layout");
  await revalidateSite();
  return {};
};

// ── situations ────────────────────────────────────────────────────────────────

export async function saveSituationAction(doc: SituationDoc): Promise<ActionResult> {
  const no = await denied();
  if (no) return no;
  const errors = validate(doc, doc.slug || "situation");
  if (errors.length) return { errors };
  try {
    await saveSituation(adminDb(), doc);
  } catch (e) {
    return { errors: [msg(e)] };
  }
  return done();
}

export async function setPublishedAction(slug: string, published: boolean): Promise<ActionResult> {
  const no = await denied();
  if (no) return no;

  // Publishing re-runs the full document check: a half-translated or
  // unattributed situation must not go live from a one-click toggle.
  if (published) {
    const doc = await loadSituationDoc(slug);
    if (!doc) return { errors: [`${slug}: not found`] };
    const errors = validate({ ...doc, published: true }, slug);
    if (errors.length) return { errors };
  }

  const { error } = await adminDb()
    .from("situations")
    .update({ published_at: published ? new Date().toISOString() : null })
    .eq("slug", slug);
  if (error) return { errors: [error.message] };
  return done();
}

export async function deleteSituationAction(slug: string): Promise<ActionResult> {
  const no = await denied();
  if (no) return no;
  // Cascades take translations, entries and saves. Sources stay - they are a library.
  const { error } = await adminDb().from("situations").delete().eq("slug", slug);
  if (error) return { errors: [error.message] };
  return done();
}

// ── sayings ───────────────────────────────────────────────────────────────────

export async function saveSayingAction(doc: SayingDoc): Promise<ActionResult> {
  const no = await denied();
  if (no) return no;
  const errors = validateSaying(doc);
  if (errors.length) return { errors };
  try {
    await saveSaying(adminDb(), doc);
  } catch (e) {
    return { errors: [msg(e)] };
  }
  return done();
}

export async function setSayingPublishedAction(slug: string, published: boolean): Promise<ActionResult> {
  const no = await denied();
  if (no) return no;

  if (published) {
    const doc = await loadSayingDoc(slug);
    if (!doc) return { errors: [`${slug}: not found`] };
    const errors = validateSaying({ ...doc, published: true });
    if (errors.length) return { errors };
  }

  const { error } = await adminDb()
    .from("sayings")
    .update({ published_at: published ? new Date().toISOString() : null })
    .eq("slug", slug);
  if (error) return { errors: [error.message] };
  return done();
}

export async function deleteSayingAction(slug: string): Promise<ActionResult> {
  const no = await denied();
  if (no) return no;
  const { error } = await adminDb().from("sayings").delete().eq("slug", slug);
  if (error) return { errors: [error.message] };
  return done();
}

// ── intentions ────────────────────────────────────────────────────────────────

export async function saveIntentionAction(doc: IntentionDoc): Promise<ActionResult> {
  const no = await denied();
  if (no) return no;
  const errors = validateIntention(doc);
  if (errors.length) return { errors };
  try {
    await saveIntention(adminDb(), doc);
  } catch (e) {
    return { errors: [msg(e)] };
  }
  return done();
}

export async function setIntentionPublishedAction(slug: string, published: boolean): Promise<ActionResult> {
  const no = await denied();
  if (no) return no;

  if (published) {
    const doc = await loadIntentionDoc(slug);
    if (!doc) return { errors: [`${slug}: not found`] };
    const errors = validateIntention({ ...doc, published: true });
    if (errors.length) return { errors };
  }

  const { error } = await adminDb()
    .from("intentions")
    .update({ published_at: published ? new Date().toISOString() : null })
    .eq("slug", slug);
  if (error) return { errors: [error.message] };
  return done();
}

export async function deleteIntentionAction(slug: string): Promise<ActionResult> {
  const no = await denied();
  if (no) return no;
  const { error } = await adminDb().from("intentions").delete().eq("slug", slug);
  if (error) return { errors: [error.message] };
  return done();
}
