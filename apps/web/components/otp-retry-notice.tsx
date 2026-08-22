"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    wait: (seconds: number) => `You can request another code in ${seconds}s.`,
    ready: "You can request a new code now.",
  },
  ar: {
    wait: (seconds: number) => `يمكنك طلب رمز آخر بعد ${seconds} ثوانٍ.`,
    ready: "يمكنك طلب رمز جديد الآن.",
  },
  tr: {
    wait: (seconds: number) => `${seconds} saniye sonra yeni bir kod isteyebilirsin.`,
    ready: "Artık yeni bir kod isteyebilirsin.",
  },
} as const;

export function OtpRetryNotice({ locale, seconds: initialSeconds }: { locale: Locale; seconds: number }) {
  const [seconds, setSeconds] = useState(Math.max(0, initialSeconds));

  useEffect(() => {
    if (seconds === 0) return;
    const timer = window.setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [seconds]);

  return (
    <p role="status" className="auth-notice">
      {seconds > 0 ? copy[locale].wait(seconds) : copy[locale].ready}
    </p>
  );
}
