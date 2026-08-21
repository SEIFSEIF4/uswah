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
import { validate, type SituationDoc } from "../lib/content-schema";
import { saveSituation } from "../lib/save-situation";

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

  for (const { doc } of docs) {
    await saveSituation(db, doc);
    console.log(`  pushed ${doc.slug}`);
  }
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
