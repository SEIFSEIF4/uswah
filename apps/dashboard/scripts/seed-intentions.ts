import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../lib/supabase/database.types";
import { saveIntention } from "../lib/save-content";
import { isRelatedToDorar, mapActGroup, parseIntentionsCsv, slugifyIntention, type CsvIntention, type DorarResult } from "../lib/intention-import";

const csvPath = resolve(process.argv[2] ?? "/Users/seifelesllamseif/Downloads/intentions.csv");
const apply = process.argv.includes("--apply");
const API = "https://dorar.net/dorar_api.json";

type ApiResponse = { ahadith?: DorarResult[] };

async function searchDorar(query: string): Promise<DorarResult[]> {
  const response = await fetch(`${API}?skey=${encodeURIComponent(query)}`, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`Dorar API returned ${response.status}`);
  return ((await response.json()) as ApiResponse).ahadith ?? [];
}

async function verifiedRows(rows: CsvIntention[]) {
  const accepted: { row: CsvIntention; group: NonNullable<ReturnType<typeof mapActGroup>>; result: DorarResult }[] = [];
  const skipped: { id: string; reason: string }[] = [];
  let apiUnavailable: string | null = null;
  for (const row of rows) {
    if (row.accepted === "لا") {
      skipped.push({ id: row.id, reason: "CSV marked rejected" });
      continue;
    }
    const group = mapActGroup(row.category);
    if (!group) {
      skipped.push({ id: row.id, reason: `unknown category: ${row.category}` });
      continue;
    }
    if (apiUnavailable) {
      skipped.push({ id: row.id, reason: apiUnavailable });
      continue;
    }
    let results: DorarResult[];
    try {
      results = await searchDorar(row.intention);
    } catch (error) {
      apiUnavailable = `Dorar API unavailable: ${error instanceof Error ? error.message : String(error)}`;
      skipped.push({ id: row.id, reason: apiUnavailable });
      continue;
    }
    if (!isRelatedToDorar(row.intention, results)) {
      skipped.push({ id: row.id, reason: "no related Dorar hadith" });
      continue;
    }
    accepted.push({ row, group, result: results[0]! });
  }
  return { accepted, skipped };
}

async function main() {
  const rows = parseIntentionsCsv(readFileSync(csvPath, "utf8"));
  const { accepted, skipped } = await verifiedRows(rows);
  console.log(`Dorar verified: ${accepted.length}; skipped: ${skipped.length}`);
  for (const item of skipped) console.log(`  skip ${item.id}: ${item.reason}`);
  for (const { row, group, result } of accepted) {
    console.log(`  ${apply ? "seed" : "would seed"} ${slugifyIntention(row.id)} · ${result.book ?? result.mohdith ?? "Dorar"} ${result.ref ?? ""}`);
  }
  if (!apply) {
    console.log("\nDry run only. Pass --apply to write Arabic drafts; English and Turkish remain absent until translated and reviewed.");
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in apps/dashboard/.env.local");
  const db = createClient<Database>(url, key, { auth: { persistSession: false } });
  for (const { row, group, result } of accepted) {
    const slug = slugifyIntention(row.id);
    const { error: dorarError } = await db.from("dorar_hadith").upsert({
      slug,
      query: row.intention,
      fetched_at: new Date().toISOString(),
      results: [result],
      hadith_id: result.id ?? null,
      takhrij: result.takhrij ?? null,
      categories: [],
    }, { onConflict: "slug" });
    if (dorarError) throw new Error(`${slug}: could not save Dorar citation: ${dorarError.message}`);
    await saveIntention(db, {
      slug,
      published: false,
      act_group: group,
      source_original: result.th ?? result.text ?? undefined,
      translations: {
        ar: {
          act: row.subcategory,
          intention: row.intention,
          note: "مسودة مستوردة من ملف النيات؛ تحتاج مراجعة وترجمة قبل النشر.",
          source_label: `${result.book ?? result.mohdith ?? "الدرر السنية"}${result.ref ? ` ${result.ref}` : ""}`,
        },
      },
    });
  }
  console.log(`\nSeeded ${accepted.length} unpublished Arabic drafts.`);
}

main().catch((error) => { console.error(error); process.exit(1); });
