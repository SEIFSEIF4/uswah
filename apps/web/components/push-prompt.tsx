"use client";

import { useCallback, useEffect, useState } from "react";
import { Bell, Check, LoaderCircle, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { subscribeUser } from "@/app/push/actions";

const DISMISS_KEY = "uswah-push-dismissed";

const copy = {
  en: {
    title: "Stay in the loop",
    body: "Get a notice when new guidance is published.",
    enable: "Enable",
    enabling: "Enabling…",
    success: "Notifications enabled",
    dismiss: "Not now",
    iosNeedInstall: "Install Uswah first, then enable notifications.",
  },
  ar: {
    title: "ابقَ على اطّلاع",
    body: "تنبيه عند نشر إرشاد جديد.",
    enable: "تفعيل",
    enabling: "جارٍ التفعيل…",
    success: "تم تفعيل التنبيهات",
    dismiss: "ليس الآن",
    iosNeedInstall: "ثبّت أسوة أولًا، ثم فعّل التنبيهات.",
  },
  tr: {
    title: "Haberdar ol",
    body: "Yeni rehberlik yayınlandığında bildirim al.",
    enable: "Aç",
    enabling: "Açılıyor…",
    success: "Bildirimler açıldı",
    dismiss: "Şimdi değil",
    iosNeedInstall: "Önce Uswah’ı yükle, sonra bildirimleri aç.",
  },
} as const;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) output[i] = rawData.charCodeAt(i);
  return output;
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

function isIos() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
}

/**
 * Soft push opt-in. Registers the service worker, asks for permission, and stores
 * the subscription server-side. Hidden when already subscribed or dismissed;
 * on iOS only after the app is installed to the home screen.
 */
export function PushPrompt({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [supported, setSupported] = useState(false);
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [iosBlocked, setIosBlocked] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const timer = window.setTimeout(() => setEnabled(false), 3200);
    return () => window.clearTimeout(timer);
  }, [enabled]);

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const ios = isIos();
    const standalone = isStandalone();
    const dismissed = localStorage.getItem(DISMISS_KEY) === "1";

    // Always register so returning subscribers still receive pushes.
    const ready = navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then((registration) => registration.pushManager.getSubscription())
      .catch(() => null);

    if (dismissed) return;

    if (ios && !standalone) {
      const setupTimer = window.setTimeout(() => {
        setIosBlocked(true);
        setSupported(true);
        if (localStorage.getItem("uswah-install-dismissed") === "1") {
          window.setTimeout(() => setVisible(true), 1200);
        }
      }, 0);
      return () => window.clearTimeout(setupTimer);
    }

    ready.then((sub) => {
      setSupported(true);
      if (sub || Notification.permission === "denied") return;
      const installDone =
        standalone || localStorage.getItem("uswah-install-dismissed") === "1";
      window.setTimeout(() => {
        if (localStorage.getItem(DISMISS_KEY) === "1") return;
        setVisible(true);
      }, installDone ? 1400 : 8000);
    });
  }, []);

  const dismiss = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }, []);

  const enable = useCallback(async () => {
    if (iosBlocked || busy) return;
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!publicKey) return;

    setBusy(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        dismiss();
        return;
      }
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      const serialized = JSON.parse(JSON.stringify(sub)) as {
        endpoint: string;
        keys: { p256dh: string; auth: string };
      };
      const result = await subscribeUser(serialized, locale);
      if (!result.success) return;
      localStorage.setItem(DISMISS_KEY, "1");
      setVisible(false);
      setEnabled(true);
    } finally {
      setBusy(false);
    }
  }, [busy, dismiss, iosBlocked, locale]);

  if (!supported || (!visible && !enabled)) return null;

  return (
    <>
      {visible ? (
        <aside className="install-prompt push-prompt" role="status" aria-live="polite">
          <div className="install-prompt-copy">
            <p className="install-prompt-title">{t.title}</p>
            <p className="install-prompt-body">
              {iosBlocked ? t.iosNeedInstall : t.body}
            </p>
          </div>
          <div className="install-prompt-actions">
            {!iosBlocked ? (
              <button
                type="button"
                className="install-prompt-cta"
                onClick={enable}
                disabled={busy}
                aria-busy={busy}
              >
                {busy ? <LoaderCircle className="size-3.5 push-prompt-spinner" aria-hidden /> : <Bell className="size-3.5" aria-hidden />}
                {busy ? t.enabling : t.enable}
              </button>
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
      ) : null}
      {enabled ? (
        <div className="push-success-toast" role="status" aria-live="polite">
          <Check className="size-4" aria-hidden />
          <span>{t.success}</span>
        </div>
      ) : null}
    </>
  );
}
