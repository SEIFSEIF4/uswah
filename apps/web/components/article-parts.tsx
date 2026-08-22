"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: { share: "Share", copy: "Copy link", copied: "Link copied" },
  ar: { share: "شارك", copy: "نسخ الرابط", copied: "نُسخ الرابط" },
  tr: { share: "Paylaş", copy: "Bağlantıyı kopyala", copied: "Bağlantı kopyalandı" },
} as const;

const icons = {
  WhatsApp: (
    <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.67-1.611-.916-2.206-.242-.579-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.85 9.85 0 0 1-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 1 1 8.372 4.632m8.396-15.297A11.815 11.815 0 1 0 3.1 18.85L2 22l3.234-.849a11.815 11.815 0 0 0 17.124-10.663c0-3.16-1.23-6.127-3.467-8.356" />
  ),
  Telegram: <path fill="currentColor" d="M23.5 3.5 20 20.2c-.3 1.2-1 1.5-2 .9l-5.5-4.1-2.7 2.6c-.3.3-.5.5-1 .5l.4-5.6 10.2-9.2c.4-.4-.1-.6-.6-.2L6.2 13.3.8 11.6c-1.2-.4-1.2-1.2.3-1.8L22.2 1.5c1-.4 1.8.2 1.3 2Z" />,
  X: <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L6.084 4.126H4.117L17.083 19.77Z" />,
};

export function Share({ title, locale }: { title: string; locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  const t = copy[locale];

  useEffect(() => setUrl(window.location.href), []);

  const targets = [
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { name: "Telegram", href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { name: "X", href: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
  ];

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="share">
      <span className="share-label">{t.share}</span>
      <div className="share-links">
        {targets.map((s) => (
          <a key={s.name} href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.name}>
            <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">{icons[s.name as keyof typeof icons]}</svg>
          </a>
        ))}
        <button type="button" onClick={copyLink} aria-label={t.copy}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M10 14a4 4 0 0 0 6 .5l2-2a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-6-.5l-2 2a4 4 0 0 0 5.7 5.7l1-1"
                  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className={`share-toast${copied ? " is-visible" : ""}`} role="status" aria-live="polite">
        {t.copied}
      </div>
    </div>
  );
}
