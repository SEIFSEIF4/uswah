import assert from "node:assert/strict";
import { authErrorMessage } from "./auth-errors";

assert.equal(authErrorMessage("email rate limit exceeded", "ar"), null);
assert.equal(
  authErrorMessage("For security purposes, you can only request this after 58 seconds.", "ar"),
  null,
);
assert.equal(authErrorMessage("otp_expired", "tr"), "Kodun süresi doldu. Yeni bir kod iste.");

console.log("auth error translations: ok");
