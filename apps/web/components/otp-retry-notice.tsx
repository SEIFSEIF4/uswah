"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const suffix = {
  en: "s",
  ar: "ث",
  tr: "sn",
} as const;

export function OtpRequestButton({
  locale,
  seconds: initialSeconds,
  label,
  action,
}: {
  locale: Locale;
  seconds: number;
  label: string;
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [seconds, setSeconds] = useState(Math.max(0, initialSeconds));

  useEffect(() => {
    if (seconds === 0) return;
    const timer = window.setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [seconds]);

  return (
    <button formAction={action} className="auth-primary" disabled={seconds > 0}>
      {seconds > 0 ? `${seconds}${suffix[locale]}` : label}
    </button>
  );
}
