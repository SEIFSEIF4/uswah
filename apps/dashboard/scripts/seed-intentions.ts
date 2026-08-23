import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../lib/supabase/database.types";
import { saveIntention } from "../lib/save-content";
import {
  actLabels,
  bestTopicMatch,
  buildDorarQueries,
  classifySource,
  draftNotes,
  isRelatedToDorar,
  mapActGroup,
  parseIntentionsCsv,
  slugifyIntention,
  sourceLabel,
  type CsvIntention,
  type DorarResult,
} from "../lib/intention-import";

const csvPath = resolve(process.argv[2] ?? "/Users/seifelesllamseif/Downloads/intentions.csv");
const apply = process.argv.includes("--apply");
const API = "https://dorar.net/dorar_api.json";
const localIndex = JSON.parse(
  readFileSync(resolve(import.meta.dirname, "data/dorar-local-index.json"), "utf8"),
) as DorarResult[];

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
  const accepted: {
    row: CsvIntention;
    group: NonNullable<ReturnType<typeof mapActGroup>>;
    result: DorarResult;
    kind: "exact" | "topic";
    query: string;
  }[] = [];
  const skipped: { id: string; reason: string }[] = [];

  for (const row of rows) {
    if (row.accepted === "لا") {
      skipped.push({ id: row.id, reason: "CSV marked rejected" });
      continue;
    }
    if (classifySource(row.source) === "quran") {
      skipped.push({ id: row.id, reason: "Quran-only source; not matched to hadith" });
      continue;
    }
    const group = mapActGroup(row.category);
    if (!group) {
      skipped.push({ id: row.id, reason: `unknown category: ${row.category}` });
      continue;
    }

    let results: DorarResult[] = [];
    let queryUsed = row.intention;
    try {
      for (const query of buildDorarQueries(row)) {
        const found = await searchDorar(query);
        results.push(...found);
        if (isRelatedToDorar(`${row.intention} ${row.subcategory}`, found)) {
          queryUsed = query;
          break;
        }
      }
    } catch {
      results = localIndex;
      queryUsed = row.subcategory;
    }

    if (!isRelatedToDorar(`${row.intention} ${row.subcategory}`, results)) {
      skipped.push({ id: row.id, reason: "no related Dorar hadith" });
      continue;
    }

    const topic = bestTopicMatch(`${row.intention} ${row.subcategory}`, results, 2);
    const result = topic?.result ?? results[0]!;
    const kind =
      classifySource(row.source) === "hadith" || (topic?.score ?? 0) >= 5 ? "exact" : "topic";
    accepted.push({ row, group, result, kind, query: queryUsed });
  }
  return { accepted, skipped };
}

async function main() {
  const rows = parseIntentionsCsv(readFileSync(csvPath, "utf8"));
  const { accepted, skipped } = await verifiedRows(rows);
  console.log(`Dorar verified: ${accepted.length}; skipped: ${skipped.length}`);
  for (const item of skipped) console.log(`  skip ${item.id}: ${item.reason}`);
  for (const { row, result, kind } of accepted) {
    console.log(
      `  ${apply ? "seed" : "would seed"} ${slugifyIntention(row.id)} · ${kind} · ${result.book ?? "Dorar"} ${result.ref ?? ""}`,
    );
  }
  if (!apply) {
    console.log("\nDry run only. Pass --apply to upsert unpublished ar/en/tr drafts.");
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in apps/dashboard/.env.local");
  }
  const db = createClient<Database>(url, key, { auth: { persistSession: false } });

  for (const { row, group, result, kind, query } of accepted) {
    const slug = slugifyIntention(row.id);
    const text = result.th ?? result.text ?? "";
    const { error: dorarError } = await db.from("dorar_hadith").upsert(
      {
        slug,
        query,
        fetched_at: new Date().toISOString(),
        results: [result],
        hadith_id: result.id ?? null,
        takhrij: result.takhrij ?? null,
        categories: result.categories ?? [],
      },
      { onConflict: "slug" },
    );
    if (dorarError) throw new Error(`${slug}: could not save Dorar citation: ${dorarError.message}`);

    const acts = actLabels(row.subcategory);
    const notes = draftNotes(kind === "topic" ? "topic" : "exact");
    await saveIntention(db, {
      slug,
      published: false,
      act_group: group,
      source_original: text || undefined,
      translations: {
        ar: {
          act: acts.ar,
          intention: row.intention,
          note: notes.ar,
          source_label: sourceLabel(result.book, result.ref, "ar"),
        },
        en: {
          act: acts.en,
          intention:
            kind === "topic"
              ? `I intend to practice ${acts.en.toLowerCase()}, guided by a related prophetic teaching on this theme.`
              : `I intend to practice ${acts.en.toLowerCase()}, following the prophetic teaching cited for this act.`,
          note: notes.en,
          source_label: sourceLabel(result.book, result.ref, "en"),
        },
        tr: {
          act: acts.tr,
          intention:
            kind === "topic"
              ? `${acts.tr} konusunda, bu temayla ilişkili nebevî öğretiye uyarak niyet ediyorum.`
              : `${acts.tr} konusunda, bu amel için zikredilen nebevî öğretiye uyarak niyet ediyorum.`,
          note: notes.tr,
          source_label: sourceLabel(result.book, result.ref, "tr"),
        },
      },
    });
  }
  console.log(`\nSeeded ${accepted.length} unpublished drafts with ar/en/tr.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
