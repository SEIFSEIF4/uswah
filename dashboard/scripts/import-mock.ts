// One-time import: the sayings and intentions hard-coded in the web client move
// into the database, through the same validate + save path the dashboard uses.
//
//   pnpm content:import            validate + print what would change, write nothing
//   pnpm content:import --apply    write it
//
// Sayings whose grade cannot be published without a scholarly reviewer land as
// drafts — the weak_grades_stay_drafts constraint would refuse anything else.

import { createClient } from "@supabase/supabase-js";
import { QUOTES } from "../../web/lib/mock/quotes";
import { INTENTIONS } from "../../web/lib/mock/intentions";
import type { Database } from "../lib/supabase/database.types";
import {
  LOCALES,
  PUBLISHABLE_GRADES,
  validateIntention,
  validateSaying,
  type IntentionDoc,
  type SayingDoc,
} from "../lib/content-schema";
import { saveIntention, saveSaying } from "../lib/save-content";

const apply = process.argv.includes("--apply");

const sayings: SayingDoc[] = QUOTES.map((q) => ({
  slug: q.slug,
  published: PUBLISHABLE_GRADES.includes(q.grade),
  saying: q.saying,
  grade: q.grade,
  situation_slug: q.situation,
  source_original: q.source.original,
  translations: Object.fromEntries(
    LOCALES.map((l) => [
      l,
      { angle: q[l].angle, closeness: q[l].closeness, source_label: q.source.label[l] },
    ]),
  ),
}));

const intentions: IntentionDoc[] = INTENTIONS.map((i) => ({
  slug: i.slug,
  published: true,
  act_group: i.group,
  source_original: i.source.original,
  translations: Object.fromEntries(
    LOCALES.map((l) => [
      l,
      { act: i.act[l], intention: i[l].intention, note: i[l].note, source_label: i.source.label[l] },
    ]),
  ),
}));

const errors = [
  ...sayings.flatMap((s) => validateSaying(s).map((e) => `${s.slug}: ${e}`)),
  ...intentions.flatMap((i) => validateIntention(i).map((e) => `${i.slug}: ${e}`)),
];
if (errors.length) {
  console.error(`${errors.length} problem(s):\n` + errors.map((e) => `  ${e}`).join("\n"));
  process.exit(1);
}

for (const s of sayings)
  console.log(`${s.published ? "live " : "draft"}  saying     ${s.slug}  [${s.grade}]`);
for (const i of intentions) console.log(`live   intention  ${i.slug}  [${i.act_group}]`);

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }
  const db = createClient<Database>(url, key, { auth: { persistSession: false } });

  // A saying may point at a situation that only exists in the mock data. The
  // foreign key would refuse it, so the link is dropped with a warning and can
  // be re-added from the dashboard once the situation is in the database.
  const { data: existing } = await db.from("situations").select("slug");
  const known = new Set((existing ?? []).map((s) => s.slug));

  for (const s of sayings) {
    if (s.situation_slug && !known.has(s.situation_slug)) {
      console.warn(`  ${s.slug}: situation "${s.situation_slug}" is not in the database — link dropped`);
      s.situation_slug = undefined;
    }
    await saveSaying(db, s);
    console.log(`  pushed saying ${s.slug}`);
  }
  for (const i of intentions) {
    await saveIntention(db, i);
    console.log(`  pushed intention ${i.slug}`);
  }
}

if (!apply) {
  console.log(`\n${sayings.length + intentions.length} doc(s) valid. Nothing written — pass --apply to push.`);
} else {
  main()
    .then(() => console.log(`\nPushed ${sayings.length} saying(s) and ${intentions.length} intention(s).`))
    .catch((err) => {
      console.error(String(err));
      process.exit(1);
    });
}
