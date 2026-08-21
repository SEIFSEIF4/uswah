"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: { contents: "Contents", top: "Back to top", share: "Share", copied: "Link copied" },
  ar: { contents: "المحتويات", top: "إلى الأعلى", share: "شارك", copied: "نُسخ الرابط" },
  tr: { contents: "İçindekiler", top: "Başa dön", share: "Paylaş", copied: "Bağlantı kopyalandı" },
} as const;

/**
 * The contents panel from Qalam's long reads, collapsed by default.
 *
 * Ours are one to three minutes, so this appears only when a situation carries enough
 * sections to be worth indexing. Passing an empty list renders nothing at all.
 */
export function Contents({ items, locale }: { items: { id: string; label: string }[]; locale: Locale }) {
  const [open, setOpen] = useState(false);
  if (items.length < 3) return null;
  const t = copy[locale];

  return (
    <nav className="contents">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {t.contents}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"
             style={{ transform: open ? "rotate(180deg)" : undefined }}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ol>
          {items.map((i, n) => (
            <li key={i.id}>
              <a href={`#${i.id}`} onClick={() => setOpen(false)}>
                <span aria-hidden="true">{n + 1}.</span> {i.label}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}

/** Share row. Copy-link gives feedback in place rather than through a toast. */
export function Share({ title, locale }: { title: string; locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  const t = copy[locale];

  useEffect(() => setUrl(window.location.href), []);

  const targets = [
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, path: "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Z" },
    { name: "Telegram", href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, path: "M21 4 3 11l5 2 2 6 3-4 5 4 3-15Z" },
    { name: "X", href: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, path: "M4 4l16 16M20 4L4 20" },
  ];

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="share">
      <span className="share-label">{copied ? t.copied : t.share}</span>
      <div className="share-links">
        {targets.map((s) => (
          <a key={s.name} href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.name}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d={s.path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ))}
        <button type="button" onClick={copyLink} aria-label={t.copied}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M10 14a4 4 0 0 0 6 .5l2-2a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-6-.5l-2 2a4 4 0 0 0 5.7 5.7l1-1"
                  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
