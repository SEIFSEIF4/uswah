/**
 * Builds the CSV intentions migration + verification report from:
 * - Downloads/intentions.csv
 * - scripts/data/hadith-csv-matches.json (verified Dorar pages)
 * - scripts/data/ai-topic-matches.json (local-index topic matches, score ≥ 3)
 * - scripts/data/dorar-local-index.json (for AI result payloads)
 *
 * Does not call Dorar. Does not write to production — emits SQL only.
 *
 *   pnpm --dir apps/dashboard exec tsx scripts/build-csv-intention-migration.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import {
  actLabels,
  classifySource,
  draftNotes,
  hasAllLocales,
  mapActGroup,
  parseIntentionsCsv,
  slugifyIntention,
  sourceLabel,
  translateIntention,
  type CsvIntention,
  type DorarResult,
} from "../lib/intention-import";

const root = resolve(import.meta.dirname, "../../..");
const csvPath = resolve("/Users/seifelesllamseif/Downloads/intentions.csv");
const dataDir = resolve(import.meta.dirname, "data");
const outMigration = resolve(root, "supabase/migrations/20260823130000_csv_intentions_batch.sql");
const outReport = resolve(dataDir, "csv-intentions-verification.md");

type HadithMatch = {
  csvId: string;
  query: string;
  dorarId: string;
  dorarUrl: string;
  text: string;
  rawi?: string;
  book?: string;
  ref?: string;
  grade?: string;
  takhrij?: string;
  categories?: { id: string; name: string }[];
  matchKind: "exact" | "close";
};

type AiMatch = {
  id: string;
  subcategory: string;
  category: string;
  intention: string;
  dorarId: string;
  score: number;
  book?: string;
  ref?: string;
  text: string;
  rawi?: string;
  grade?: string;
  takhrij?: string;
  categories?: { id: string; name: string }[];
  query: string;
};

type Built = {
  csvId: string;
  slug: string;
  kind: "hadith-exact" | "ai-topic" | "ai-exact";
  group: NonNullable<ReturnType<typeof mapActGroup>>;
  row: CsvIntention;
  result: DorarResult & { id: string; text: string };
  query: string;
  dorarUrl: string;
  matchNote: string;
};

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlJson(value: unknown): string {
  return `$j$${JSON.stringify(value)}$j$::jsonb`;
}

function buildTranslations(row: CsvIntention, result: DorarResult, kind: Built["kind"]) {
  const acts = actLabels(row.subcategory);
  const topic = kind === "ai-topic";
  const notes = draftNotes(topic ? "topic" : "exact");
  const translations = {
    ar: {
      act: acts.ar,
      intention: row.intention,
      note: notes.ar,
      source_label: sourceLabel(result.book, result.ref, "ar"),
    },
    en: {
      act: acts.en,
      intention: translateIntention(row, "en", topic),
      note: notes.en,
      source_label: sourceLabel(result.book, result.ref, "en"),
    },
    tr: {
      act: acts.tr,
      intention: translateIntention(row, "tr", topic),
      note: notes.tr,
      source_label: sourceLabel(result.book, result.ref, "tr"),
    },
  };
  if (!hasAllLocales(translations)) throw new Error(`missing locales for csv-${row.id}`);
  return translations;
}

function fallbackResult(row: CsvIntention, localIndex: DorarResult[]): { result: DorarResult; query: string } {
  const topic = `${row.subcategory} ${row.category}`;
  const rules: [string, string][] = [
    ["صلاة|صيام|قرآن|دعاء|ذكر|عباد", "hjugjsr9"],
    ["صحة|رياضة|علاج|طب", "Ov16uqG0"],
    ["عمل|دراسة|رزق|مال|تجارة|مهنة", "ymcRhdPb"],
    ["أسرة|والد|زواج|أبناء|أيتام|جار|رحم|أصدقاء|علاقات", "Mgy5kJET"],
    ["بيئة|حيوان|أشجار|طاقة|ماء", "oOabSoIV"],
    ["علم|تعلم|قراءة|تعليم|مهارات", "xjsZ7VeS"],
    ["غضب|صبر|نفس|خلق|تقوى|توبة|استغفار", "SllC88XC"],
    ["صدقة|تطوع|مجتمع|مساعدة|إحسان", "Ee2PC71D"],
    ["سفر|رحلة", "Ov16uqG0"],
  ];
  const id = rules.find(([pattern]) => new RegExp(pattern).test(topic))?.[1] ?? "Ov16uqG0";
  const result = localIndex.find((item) => item.id === id) ?? localIndex[0];
  if (!result) throw new Error("local Dorar index is empty");
  return { result, query: `${row.subcategory} / ${row.category} (topic fallback)` };
}

function main() {
  const rows = parseIntentionsCsv(readFileSync(csvPath, "utf8"));
  const byId = new Map(rows.map((r) => [r.id, r]));
  const hadithMatches = JSON.parse(readFileSync(resolve(dataDir, "hadith-csv-matches.json"), "utf8")) as HadithMatch[];
  const aiMatches = JSON.parse(readFileSync(resolve(dataDir, "ai-topic-matches.json"), "utf8")) as AiMatch[];
  // Include the two already-verified AI/hadith exact rows from the first migration.
  const exactAi: Built[] = [];
  const row113 = byId.get("113");
  if (row113) {
    const group = mapActGroup(row113.category);
    if (group) {
      exactAi.push({
        csvId: "113",
        slug: "csv-113",
        kind: "ai-exact",
        group,
        row: row113,
        query: "المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف",
        dorarUrl: "https://dorar.net/h/Ov16uqG0",
        matchNote: "Exact quote match (Muslim 2664)",
        result: {
          id: "Ov16uqG0",
          text: "المُؤمِنُ القَويُّ خَيرٌ وأحَبُّ إلى اللهِ مِنَ المُؤمِنِ الضَّعيفِ، وفي كُلٍّ خَيرٌ. احرِصْ على ما يَنفَعُكَ، واستَعِنْ باللهِ ولا تَعجِزْ.",
          rawi: "أبو هريرة",
          book: "صحيح مسلم",
          ref: "2664",
          grade: "[صحيح]",
          takhrij: "أخرجه ابن ماجه (79)، وأحمد (8829)، وأبو يعلى (6251) جميعهم بلفظه.",
          categories: [{ id: "a1a6cc0f150cdc7da0070c79a011f497", name: "قدر - الأمر بالعمل وترك العجز" }],
        },
      });
    }
  }

  const imported: Built[] = [...exactAi];
  const excluded: { id: string; reason: string }[] = [];
  const importedIds = new Set<string>(imported.map((b) => b.csvId));

  for (const match of hadithMatches) {
    if (importedIds.has(match.csvId)) continue;
    const row = byId.get(match.csvId);
    if (!row) {
      excluded.push({ id: match.csvId, reason: "hadith match without CSV row" });
      continue;
    }
    const group = mapActGroup(row.category);
    if (!group) {
      excluded.push({ id: match.csvId, reason: `unknown category: ${row.category}` });
      continue;
    }
    if (!match.dorarId || !match.text) {
      excluded.push({ id: match.csvId, reason: "incomplete Dorar match" });
      continue;
    }
    imported.push({
      csvId: match.csvId,
      slug: slugifyIntention(match.csvId),
      kind: "hadith-exact",
      group,
      row,
      query: match.query,
      dorarUrl: match.dorarUrl,
      matchNote: match.matchKind === "exact" ? "Exact hadith wording" : "Close hadith wording",
      result: {
        id: match.dorarId,
        text: match.text,
        rawi: match.rawi,
        book: match.book,
        ref: match.ref,
        grade: match.grade,
        takhrij: match.takhrij,
        categories: match.categories ?? [],
      },
    });
    importedIds.add(match.csvId);
  }

  for (const match of aiMatches) {
    if (importedIds.has(match.id)) continue;
    const row = byId.get(match.id);
    if (!row) continue;
    if (row.accepted === "لا") {
      excluded.push({ id: match.id, reason: "CSV marked rejected" });
      continue;
    }
    const group = mapActGroup(row.category);
    if (!group) {
      excluded.push({ id: match.id, reason: `unknown category: ${row.category}` });
      continue;
    }
    imported.push({
      csvId: match.id,
      slug: slugifyIntention(match.id),
      kind: "ai-topic",
      group,
      row,
      query: match.query,
      dorarUrl: `https://dorar.net/h/${match.dorarId}`,
      matchNote: `Topic match score ${match.score} against local Dorar index`,
      result: {
        id: match.dorarId,
        text: match.text,
        rawi: match.rawi,
        book: match.book,
        ref: match.ref,
        grade: match.grade,
        takhrij: match.takhrij,
        categories: match.categories ?? [],
      },
    });
    importedIds.add(match.id);
  }

  // The user requested the remaining AI rows as reviewable drafts. When the
  // live API is unavailable and no stronger local match exists, attach the
  // closest broad-topic source from the local Dorar index. The note shown to
  // readers explicitly says this is a topic fallback, never an exact proof.
  for (const row of rows) {
    if (importedIds.has(row.id) || classifySource(row.source) !== "ai" || row.accepted === "لا") continue;
    const group = mapActGroup(row.category);
    if (!group) {
      excluded.push({ id: row.id, reason: `unknown category: ${row.category}` });
      continue;
    }
    const fallback = fallbackResult(row, JSON.parse(readFileSync(resolve(dataDir, "dorar-local-index.json"), "utf8")) as DorarResult[]);
    imported.push({
      csvId: row.id,
      slug: slugifyIntention(row.id),
      kind: "ai-topic",
      group,
      row,
      query: fallback.query,
      dorarUrl: `https://dorar.net/h/${fallback.result.id}`,
      matchNote: "Generic topic fallback from local Dorar index; editorial review required",
      result: { ...fallback.result, id: fallback.result.id!, text: fallback.result.th ?? fallback.result.text ?? "" },
    });
    importedIds.add(row.id);
  }

  for (const row of rows) {
    if (importedIds.has(row.id)) continue;
    if (row.accepted === "لا") {
      excluded.push({ id: row.id, reason: "CSV marked rejected" });
      continue;
    }
    const kind = classifySource(row.source);
    if (kind === "quran") {
      excluded.push({
        id: row.id,
        reason: "Quran-only source; schema stores Dorar hadith citations — excluded rather than mis-attributed",
      });
      continue;
    }
    if (kind === "hadith") {
      excluded.push({ id: row.id, reason: "hadith CSV row without verified Dorar match" });
      continue;
    }
    excluded.push({
      id: row.id,
      reason: "AI row without strong topic match in local Dorar index (API blocked with HTTP 403)",
    });
  }

  // Stable order by numeric CSV id
  imported.sort((a, b) => Number(a.csvId) - Number(b.csvId));
  excluded.sort((a, b) => Number(a.id) - Number(b.id));

  const dorarValues = imported.map((item) => {
    const payload = [{
      id: item.result.id,
      text: item.result.text,
      rawi: item.result.rawi,
      book: item.result.book,
      ref: item.result.ref,
      grade: item.result.grade,
      takhrij: item.result.takhrij,
      categories: item.result.categories ?? [],
    }];
    return `(
    ${sqlString(item.slug)},
    ${sqlString(item.query)},
    '2026-08-23T01:00:00Z',
    ${sqlJson(payload)},
    ${sqlString(item.result.id)},
    ${item.result.takhrij ? sqlString(item.result.takhrij) : "null"},
    ${sqlJson(item.result.categories ?? [])}
  )`;
  }).join(",\n  ");

  const intentionRows = imported.map((item) =>
    `(${sqlString(item.slug)}, ${sqlString(item.group)}, ${sqlString(item.result.text)})`
  ).join(",\n    ");

  const translationRows = imported.flatMap((item) => {
    const t = buildTranslations(item.row, item.result, item.kind);
    return (["ar", "en", "tr"] as const).map((locale) => {
      const row = t[locale];
      return `(${sqlString(item.slug)}, ${sqlString(locale)}, ${sqlString(row.act)}, ${sqlString(row.intention)}, ${sqlString(row.note)}, ${sqlString(row.source_label)})`;
    });
  }).join(",\n  ");

  const sql = `-- CSV intentions batch (2026-08-23).
-- Hadith rows: verified Dorar page IDs. AI rows: topic matches against the local
-- dorar_hadith index only (live Dorar API returned HTTP 403). All rows unpublished.
-- Quran CSV rows are intentionally excluded. Idempotent via ON CONFLICT.

insert into dorar_hadith (slug, query, fetched_at, results, hadith_id, takhrij, categories)
values
  ${dorarValues}
on conflict (slug) do update set
  query = excluded.query,
  fetched_at = excluded.fetched_at,
  results = excluded.results,
  hadith_id = excluded.hadith_id,
  takhrij = excluded.takhrij,
  categories = excluded.categories;

with rows (slug, act_group, source_original) as (
  values
    ${intentionRows}
), upserted as (
  insert into intentions (slug, act_group, source_original, published_at)
  select slug, act_group, source_original, null from rows
  on conflict (slug) do update set
    act_group = excluded.act_group,
    source_original = excluded.source_original,
    published_at = null
  returning id, slug
)
insert into intention_translations (intention_id, locale, act, intention, note, source_label)
select u.id, t.locale, t.act, t.intention, t.note, t.source_label
from upserted u
join (values
  ${translationRows}
) as t(slug, locale, act, intention, note, source_label) on t.slug = u.slug
on conflict (intention_id, locale) do update set
  act = excluded.act,
  intention = excluded.intention,
  note = excluded.note,
  source_label = excluded.source_label;
`;

  writeFileSync(outMigration, sql);

  const report = `# CSV intentions verification report

Generated: 2026-08-23

## Summary

| Set | Count |
| --- | ---: |
| CSV total | ${rows.length} |
| Imported | ${imported.length} |
| Excluded | ${excluded.length} |
| Hadith-exact / close | ${imported.filter((i) => i.kind === "hadith-exact").length} |
| AI exact quote | ${imported.filter((i) => i.kind === "ai-exact").length} |
| AI topic drafts | ${imported.filter((i) => i.kind === "ai-topic").length} |
| Quran excluded | ${excluded.filter((e) => e.reason.includes("Quran")).length} |
| Rejected (لا) | ${excluded.filter((e) => e.reason.includes("rejected")).length} |

Every imported row has \`ar\` / \`en\` / \`tr\` and \`published_at = null\`.

## Imported

| CSV | Slug | Kind | Dorar ID | URL | Note |
| --- | --- | --- | --- | --- | --- |
${imported.map((i) => `| ${i.csvId} | ${i.slug} | ${i.kind} | ${i.result.id} | ${i.dorarUrl} | ${i.matchNote} |`).join("\n")}

## Excluded

| CSV | Reason |
| --- | --- |
${excluded.map((e) => `| ${e.id} | ${e.reason} |`).join("\n")}
`;

  mkdirSync(dataDir, { recursive: true });
  writeFileSync(outReport, report);
  console.log(`Wrote ${imported.length} intentions → ${outMigration}`);
  console.log(`Wrote report → ${outReport}`);
  console.log(`Excluded ${excluded.length}`);
}

main();
