import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../app/[locale]/saved/page.tsx", import.meta.url), "utf8");

assert.match(page, /from\("saved_sayings"\)/);
assert.match(page, /sayings!inner/);
assert.match(page, /saying_translations/);
assert.match(page, /\/quotes\/\$\{s\.slug\}/);
for (const heading of ["Situations", "المواقف", "Durumlar", "Sayings", "المقولات", "Sözler"]) {
  assert.match(page, new RegExp(heading), `missing section heading: ${heading}`);
}

console.log("saved page sections: ok");
