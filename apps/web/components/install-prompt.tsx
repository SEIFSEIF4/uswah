"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const STORAGE_KEY = "uswah-install-dismissed";

const copy = {
  en: {
    title: "Install Uswah",
    body: "Add it to your home screen for quick access.",
    install: "Install",
    dismiss: "Not now",
    ios: "Tap Share, then Add to Home Screen.",
  },
  ar: {
    title: "ثبّت أسوة",
    body: "أضِفها إلى الشاشة الرئيسية للوصول السريع.",
    install: "تثبيت",
    dismiss: "ليس الآن",
    ios: "اضغط مشاركة، ثم أضف إلى الشاشة الرئيسية.",
  },
  tr: {
    title: "Uswah’ı yükle",
    body: "Hızlı erişim için ana ekrana ekle.",
    install: "Yükle",
    dismiss: "Şimdi değil",
    ios: "Paylaş’a, sonra Ana Ekrana Ekle’ye dokun.",
  },
} as const;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari before display-mode support
    ("standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

function isIos() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
}

/**
 * Soft install notice: Chromium gets a real install button via beforeinstallprompt;
 * iOS gets Share → Home Screen copy. Hidden once installed or dismissed.
 */
export function InstallPrompt({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(STORAGE_KEY) === "1") return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    // Fires on every install path, not only the button above: the browser's own
    // omnibox icon or menu item never resolves our captured prompt, so this is the
    // one place that reliably sees an install actually complete.
    const onInstalled = () => {
      localStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
      setDeferred(null);
    };
    window.addEventListener("appinstalled", onInstalled);

    // iOS never fires beforeinstallprompt; surface the Share path after a short pause.
    const ios = isIos();
    setIosHint(ios);
    const timer = ios
      ? window.setTimeout(() => setVisible(true), 2800)
      : undefined;

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
    setDeferred(null);
  }, []);

  const install = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    if (outcome === "accepted") {
      localStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
    }
  }, [deferred]);

  if (!visible || (!deferred && !iosHint)) return null;

  return (
    <aside className="install-prompt" role="status" aria-live="polite">
      <div className="install-prompt-copy">
        <p className="install-prompt-title">{t.title}</p>
        <p className="install-prompt-body">
          {iosHint && !deferred ? t.ios : t.body}
        </p>
      </div>
      <div className="install-prompt-actions">
        {deferred ? (
          <button type="button" className="install-prompt-cta" onClick={install}>
            <Download className="size-3.5" aria-hidden />
            {t.install}
          </button>
        ) : iosHint ? (
          <span className="install-prompt-ios" aria-hidden>
            <Share className="size-3.5" />
          </span>
        ) : null}
        <button
          type="button"
          className="install-prompt-dismiss"
          onClick={dismiss}
          aria-label={t.dismiss}
        >
          <X className="size-4" />
        </button>
      </div>
    </aside>
  );
}
