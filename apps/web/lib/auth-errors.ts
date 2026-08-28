import type { Locale } from "./i18n";

const messages = {
  over_request_rate_limit: {
    en: "Too many requests. Wait a few minutes and try again.",
    ar: "تكررت الطلبات كثيرًا. انتظر بضع دقائق ثم حاول مرة أخرى.",
    tr: "Çok fazla istek gönderildi. Birkaç dakika bekleyip tekrar dene.",
  },
  otp_expired: {
    en: "That code has expired. Request a new one.",
    ar: "انتهت صلاحية الرمز. اطلب رمزًا جديدًا.",
    tr: "Kodun süresi doldu. Yeni bir kod iste.",
  },
  otp_invalid: {
    en: "That code is not valid. Check it and try again.",
    ar: "الرمز غير صحيح. راجعه وحاول مرة أخرى.",
    tr: "Bu kod geçerli değil. Kontrol edip tekrar dene.",
  },
} as const satisfies Record<string, Record<Locale, string>>;

export function authErrorMessage(error: string, locale: Locale) {
  if (error === "email rate limit exceeded" || error.startsWith("For security purposes")) {
    return null;
  }
  return messages[error as keyof typeof messages]?.[locale] ?? error;
}
