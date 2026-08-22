import assert from "node:assert/strict";
import { copyText } from "./clipboard";

async function main() {
  let fallbackCalls = 0;

  assert.equal(
    await copyText("https://uswah.app/en", {
      writeText: async () => undefined,
      legacyCopy: () => {
        fallbackCalls += 1;
        return true;
      },
    }),
    true,
  );
  assert.equal(fallbackCalls, 0, "native success must not invoke the fallback");

  assert.equal(
    await copyText("https://uswah.app/ar", {
      writeText: async () => {
        throw new Error("clipboard blocked");
      },
      legacyCopy: () => true,
    }),
    true,
    "fallback should recover from Clipboard API rejection",
  );

  assert.equal(
    await copyText("https://uswah.app/tr", {
      writeText: async () => {
        throw new Error("clipboard blocked");
      },
      legacyCopy: () => false,
    }),
    false,
    "total copy failure must be reported",
  );

  console.log("clipboard fallback: ok");
}

void main();
