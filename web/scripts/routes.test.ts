// pnpm routes:test — the route registry decides who gets in, so it gets a check.
import assert from "node:assert/strict";
import {
  isAuthRoute,
  isProtectedRoute,
  isPublicRoute,
  safeInternalRedirect,
  DEFAULT_REDIRECT_ROUTE,
} from "../routes";
import { splitLocale, localeFromHeader } from "../lib/i18n";

// Locale stripping: one registry entry has to cover both languages.
assert.deepEqual(splitLocale("/ar/saved"), { locale: "ar", path: "/saved" });
assert.deepEqual(splitLocale("/en/saved/x"), { locale: "en", path: "/saved/x" });
assert.deepEqual(splitLocale("/saved"), { locale: "en", path: "/saved" });

assert.ok(isProtectedRoute("/saved"));
assert.ok(isProtectedRoute("/saved/anything"));
assert.ok(!isProtectedRoute("/search"), "search must stay public");
assert.ok(!isProtectedRoute("/saved-not-really"), "prefix must not match a sibling slug");
assert.ok(isAuthRoute("/login"));
assert.ok(isPublicRoute("/search"));

// Open-redirect guard: everything here would send a user off-site after login.
for (const evil of ["//evil.com", "https://evil.com", "http://evil.com", "evil.com"]) {
  assert.equal(safeInternalRedirect(evil), DEFAULT_REDIRECT_ROUTE, `must reject ${evil}`);
}
assert.equal(safeInternalRedirect("/en/saved"), "/en/saved");
assert.equal(safeInternalRedirect(null, "/ar/saved"), "/ar/saved");

assert.equal(localeFromHeader("ar,en;q=0.8"), "ar");
assert.equal(localeFromHeader("en-US,en;q=0.9"), "en");
assert.equal(localeFromHeader(null), "en");
// "ar" must not be matched inside another tag
assert.equal(localeFromHeader("hy-arevela,en;q=0.9"), "en");

console.log("--- ROUTE REGISTRY TESTS PASSED ---");
