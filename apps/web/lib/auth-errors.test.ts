import assert from "node:assert/strict";
import { authErrorMessage } from "./auth-errors";

assert.equal(
  authErrorMessage("over_email_send_rate_limit", "ar"),
  "أُرسل رمز بالفعل. انتظر قليلًا قبل طلب رمز آخر.",
);
assert.equal(
  authErrorMessage("over_email_send_rate_limit", "en"),
  "A code was already sent. Wait a little before requesting another.",
);
assert.equal(
  authErrorMessage("For security purposes, you can only request this after 58 seconds.", "ar"),
  "أُرسل رمز بالفعل. انتظر قليلًا قبل طلب رمز آخر.",
);
assert.equal(authErrorMessage("otp_expired", "tr"), "Kodun süresi doldu. Yeni bir kod iste.");

console.log("auth error translations: ok");
