import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const button = readFileSync(new URL("../components/saying-save-button.tsx", import.meta.url), "utf8");
const page = readFileSync(new URL("../app/[locale]/quotes/[slug]/page.tsx", import.meta.url), "utf8");
const action = readFileSync(new URL("../app/[locale]/quotes/actions.ts", import.meta.url), "utf8");

assert.doesNotMatch(button, /onClick=.*set.*saved/i, "heart must not optimistically toggle");
assert.match(button, /aria-pressed=\{saved\}/);
assert.match(page, /from\("saved_sayings"\)/);
assert.match(page, /<SayingSaveButton/);
assert.match(page, /error: sayingError/);
assert.match(page, /if \(sayingError\) throw sayingError/);
assert.match(page, /error: savedError/);
assert.match(page, /if \(savedError\) throw savedError/);
assert.match(action, /redirect\([\s\S]*\/quotes\//, "login must return to the quote");
assert.match(action, /if \(existing\)[\s\S]*delete\(\)[\s\S]*else[\s\S]*insert/);
assert.match(action, /if \(error\) throw error/, "database failures must not claim success");

console.log("saved sayings flow: ok");
