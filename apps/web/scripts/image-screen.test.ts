// pnpm image:test, the screen is the safety-critical part, so it gets the tests.
import assert from "node:assert/strict";
import { screenTitle, normaliseLicence, looksLikeTextFace } from "./image-screen";

// Real Commons and Met title shapes that must never reach a human as "probably fine".
const mustBlock = [
  "The Prophet Muhammad and the Monk Bahira",
  "Mohammed receiving his first revelation",
  "The Mi'raj, or The Night Flight of Muhammad on his Steed Buraq",
  "Mahomet and the angel Gabriel",
  "Abraham's Sacrifice, folio from a Falnama",
  "Moses and the Burning Bush",
  "Abu Bakr accompanies the Messenger of God",
  "Ali ibn Abi Talib at the Battle of Siffin",
  "The Companions of the Prophet in council",
];
for (const t of mustBlock) {
  assert.ok(screenTitle(t).blocked, `must block: ${t}`);
}

// Ordinary archive material that should pass through to a human.
const mustPass = [
  '"Zahhak is Told His Fate", Folio 29v from the Shahnama of Shah Tahmasp',
  "Alim Khan, Emir of Bukhara, photographed by Sergey Prokudin-Gorsky in 1911",
  "Ottoman court scene, Khusrau and Shirin",
  "Mosaic - Mosquée de Paris",
  "Sentry at the palace, and old cannons. Bukhara 1904",
  // Regression: "musa" is a substring of Musavvir, a painter's name. A screen that cries
  // wolf on ordinary titles is a screen nobody reads.
  "Shah Tahmasp holding court, attributable to Mu'in Musavvir",
  "Nusayri manuscript, Damascus",
];
for (const t of mustPass) {
  assert.ok(!screenTitle(t).blocked, `must pass: ${t} (${screenTitle(t).reason})`);
}

// Case must not matter, archives are inconsistent about it.
assert.ok(screenTitle("THE PROPHET MUHAMMAD, folio").blocked);
assert.ok(screenTitle("muhammad ibn something, a portrait".toUpperCase()).blocked);

// Licences
assert.equal(normaliseLicence("Public domain"), "public-domain");
assert.equal(normaliseLicence("No restrictions"), "public-domain");
assert.equal(normaliseLicence("CC0"), "cc0");
assert.equal(normaliseLicence("CC BY 4.0"), "cc-by-4.0");
assert.equal(normaliseLicence("CC BY-SA 4.0"), "cc-by-sa-4.0");
assert.equal(normaliseLicence("All rights reserved"), null);
assert.equal(normaliseLicence("Fair use"), null);
assert.equal(normaliseLicence("CC BY-NC 4.0"), null, "non-commercial is not usable");

// Folio text-face warning
assert.ok(looksLikeTextFace("The Feast of Sada, text page"));
assert.ok(looksLikeTextFace("Folio 22v recto"));
assert.ok(!looksLikeTextFace("Court of Gayumars, Persian miniature"));

console.log("--- IMAGE SCREEN TESTS PASSED ---");
