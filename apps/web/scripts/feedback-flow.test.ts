import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const saveButton = readFileSync(
  new URL("../components/save-button.tsx", import.meta.url),
  "utf8",
);
const pushPrompt = readFileSync(
  new URL("../components/push-prompt.tsx", import.meta.url),
  "utf8",
);

assert.doesNotMatch(
  saveButton,
  /onClick=.*setIsSaved/,
  "save feedback must not claim success before the server action finishes",
);
assert.doesNotMatch(
  saveButton,
  /useState\(saved\)/,
  "the saved state must come from the server-rendered saved prop",
);

for (const message of [
  "Notifications enabled",
  "تم تفعيل التنبيهات",
  "Bildirimler açıldı",
]) {
  assert.match(pushPrompt, new RegExp(message), `missing success copy: ${message}`);
}
assert.match(pushPrompt, /role="status"/);
assert.match(pushPrompt, /aria-live="polite"/);
assert.match(
  pushPrompt,
  /const result = await subscribeUser[\s\S]*if \(!result\.success\) return;[\s\S]*setEnabled\(true\)/,
  "success feedback must wait for the subscription row to be stored",
);

console.log("save and notification feedback: ok");
