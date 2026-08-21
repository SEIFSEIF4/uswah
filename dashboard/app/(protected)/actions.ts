"use server";

/**
 * The only paths that write content. Every action re-checks the admin gate —
 * the proxy and layout checks are UX; this one is the trust boundary.
 */

import { revalidatePath } from "next/cache";
import { adminDb, adminEmail, loadSituationDoc } from "@/lib/admin";
import { validate, type SituationDoc } from "@/lib/content-schema";
import { saveSituation } from "@/lib/save-situation";

export type ActionResult = { errors?: string[] };

const denied = async () => ((await adminEmail()) ? null : { errors: ["Not authorized."] });

export async function saveSituationAction(doc: SituationDoc): Promise<ActionResult> {
  const no = await denied();
  if (no) return no;

  const errors = validate(doc, doc.slug || "situation");
  if (errors.length) return { errors };

  try {
    await saveSituation(adminDb(), doc);
  } catch (e) {
    return { errors: [e instanceof Error ? e.message : String(e)] };
  }
  revalidatePath("/", "layout");
  return {};
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

  revalidatePath("/", "layout");
  return {};
}

export async function deleteSituationAction(slug: string): Promise<ActionResult> {
  const no = await denied();
  if (no) return no;

  // Cascades take translations, entries and saves. Sources stay — they are a library.
  const { error } = await adminDb().from("situations").delete().eq("slug", slug);
  if (error) return { errors: [error.message] };

  revalidatePath("/", "layout");
  return {};
}
