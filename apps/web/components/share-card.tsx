"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { toSvg } from "html-to-image";
import QRCode from "qrcode";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Download,
  RectangleHorizontal,
  RectangleVertical,
  Share,
  Square,
  X,
} from "lucide-react";
import {
  CARD_SIZES,
  CARD_THEMES,
  QuoteCard,
  type CardAlign,
  type CardFont,
  type CardRatio,
  type CardTheme,
} from "@/components/quote-card";
import type { Locale } from "@/lib/i18n";
import { copyText } from "@/lib/clipboard";

const copy = {
  en: {
    open: "Share as image",
    title: "Share this saying",
    theme: "Ground",
    ratio: "Dimensions",
    align: "Alignment",
    font: "Type",
    qr: "Link code",
    qrNote: "Scans back to the page",
    logo: "Logo",
    logoNote: "Mark in the corner",
    save: "Save image",
    send: "Share",
    copy: "Copy link",
    copied: "Link copied",
    copyFailed: "Could not copy the link",
    close: "Close",
    naskh: "Naskh",
    serif: "Serif",
    warm: "Warm",
    paper: "Paper",
    ink: "Ink",
    story: "Story",
    square: "Square",
    wide: "Wide",
    they: "They say",
    we: "We say",
  },
  ar: {
    open: "شارك كصورة",
    title: "شارك هذه المقولة",
    theme: "الأرضية",
    ratio: "الأبعاد",
    align: "محاذاة النص",
    font: "الخط",
    qr: "رمز الرابط",
    qrNote: "يعيد إلى الصفحة",
    logo: "الشعار",
    logoNote: "العلامة في الزاوية",
    save: "حفظ الصورة",
    send: "مشاركة",
    copy: "نسخ الرابط",
    copied: "نُسخ الرابط",
    copyFailed: "تعذّر نسخ الرابط",
    close: "إغلاق",
    naskh: "نسخ",
    serif: "مشرقي",
    warm: "دافئة",
    paper: "بيضاء",
    ink: "داكنة",
    story: "ستوري",
    square: "مربّع",
    wide: "عريض",
    they: "هم يقولون",
    we: "أما نحن فنقول",
  },
  tr: {
    open: "Görsel olarak paylaş",
    title: "Bu sözü paylaş",
    theme: "Zemin",
    ratio: "Boyut",
    align: "Hizalama",
    font: "Yazı",
    qr: "Bağlantı kodu",
    qrNote: "Sayfaya geri götürür",
    logo: "Logo",
    logoNote: "Köşedeki işaret",
    save: "Görseli kaydet",
    send: "Paylaş",
    copy: "Bağlantıyı kopyala",
    copied: "Bağlantı kopyalandı",
    copyFailed: "Bağlantı kopyalanamadı",
    close: "Kapat",
    naskh: "Nesih",
    serif: "Serif",
    warm: "Sıcak",
    paper: "Beyaz",
    ink: "Koyu",
    story: "Hikâye",
    square: "Kare",
    wide: "Geniş",
    they: "Onlar diyor ki",
    we: "Biz ise diyoruz ki",
  },
} as const;

const THEMES = ["warm", "paper", "ink"] as const;
const SWATCH: Record<CardTheme, string> = { warm: "#faf8f4", paper: "#ffffff", ink: "#241d18" };
const RATIOS = [
  { id: "story", Icon: RectangleVertical },
  { id: "square", Icon: Square },
  { id: "wide", Icon: RectangleHorizontal },
] as const;
/* Logical, so the icons mirror with the language rather than naming a physical side. */
const ALIGNS = [
  { id: "start", Icon: AlignRight },
  { id: "center", Icon: AlignCenter },
  { id: "end", Icon: AlignLeft },
  { id: "justify", Icon: AlignJustify },
] as const;

/**
 * The preview IS the card: one DOM node, laid out by the browser's own text engine,
 * scaled down for the dialog and snapshotted at full size for save and share. What you
 * see is what you post — and Arabic gets real shaping, marks and spacing, which the
 * old server renderer could not do.
 */
export function ShareCard({
  slug,
  locale,
  saying,
  original,
  grade,
  source,
}: {
  slug: string;
  locale: Locale;
  saying: string;
  original: string | null;
  grade: string;
  source: string;
}) {
  const t = copy[locale];
  const [theme, setTheme] = useState<CardTheme>("warm");
  const [font, setFont] = useState<CardFont>("naskh");
  const [ratio, setRatio] = useState<CardRatio>("story");
  const [align, setAlign] = useState<CardAlign>("center");
  const [qr, setQr] = useState(true);
  const [mark, setMark] = useState(true);
  const [copyStatus, setCopyStatus] = useState<"copied" | "failed" | null>(null);
  const [busy, setBusy] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [scale, setScale] = useState(0.25);

  const frameRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<number | null>(null);

  const page = `/${locale}/quotes/${slug}`;
  const { w, h } = CARD_SIZES[ratio];

  // QR is generated in the browser; the qrcode package is isomorphic.
  useEffect(() => {
    if (!qr) return;
    let cancelled = false;
    QRCode.toDataURL(new URL(page, window.location.href).toString(), {
      margin: 0,
      errorCorrectionLevel: "M",
      color: { dark: CARD_THEMES[theme].ink, light: "#00000000" },
    }).then((url) => {
      if (!cancelled) setQrUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [qr, page, theme]);

  useEffect(() => () => {
    if (copyTimeoutRef.current !== null) window.clearTimeout(copyTimeoutRef.current);
  }, []);

  // The card lays out at export size; the frame decides how far down it scales.
  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / CARD_SIZES[ratio].w);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ratio]);

  const snapshot = useCallback(async () => {
    // Webfonts must be in before the clone is rasterised, or the text falls back.
    await document.fonts.ready;
    const svg = await toSvg(cardRef.current!, {
      width: w,
      height: h,
      style: { transform: "none" },
    });
    // Rasterised here rather than by toPng, and from the data URL on purpose: Chrome
    // marks a foreignObject SVG loaded via a blob: URL as origin-unclean, which taints
    // the canvas and blocks export. The data: form stays clean; decode() is awaited
    // because the library's onload-based wait never fired for an SVG this size.
    const img = new Image();
    img.src = svg;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL("image/png");
  }, [w, h]);

  const download = useCallback((url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `uswah-${slug}.png`;
    a.click();
  }, [slug]);

  const save = useCallback(async () => {
    setBusy(true);
    try {
      download(await snapshot());
    } finally {
      setBusy(false);
    }
  }, [snapshot, download]);

  const send = useCallback(async () => {
    setBusy(true);
    try {
      const url = await snapshot();
      const blob = await (await fetch(url)).blob();
      const file = new File([blob], `uswah-${slug}.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
        return;
      }
      // Browsers block top-frame data: URLs, so the desktop fallback is the download.
      download(url);
    } catch (err) {
      // Dismissing the sheet is a choice, not a failure.
      if ((err as Error)?.name === "AbortError") return;
    } finally {
      setBusy(false);
    }
  }, [snapshot, download, slug]);

  const copyLink = useCallback(async () => {
    const copied = await copyText(new URL(page, window.location.href).toString());
    if (copyTimeoutRef.current !== null) window.clearTimeout(copyTimeoutRef.current);
    setCopyStatus(copied ? "copied" : "failed");
    copyTimeoutRef.current = window.setTimeout(() => {
      setCopyStatus(null);
      copyTimeoutRef.current = null;
    }, 2000);
  }, [page]);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="share-card">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.7" />
          <path d="M3 15.5l4.5-4a2 2 0 0 1 2.7 0L15 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="15.5" cy="9" r="1.6" fill="currentColor" />
        </svg>
        {t.open}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="sheet-backdrop" />
        <Dialog.Popup className="sheet">
          <Dialog.Title className="sheet-title">{t.title}</Dialog.Title>

          <div className="sheet-body">
            <div className="sheet-side">
              <div className={`sheet-preview is-${ratio}`} ref={frameRef}>
                {/* Pinned to the frame's corner: left in flow, the 1080px box overflows
                    leftward under RTL and the scale pulls it out of the clipped frame. */}
                <div
                  ref={cardRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: w,
                    height: h,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <QuoteCard
                    locale={locale}
                    theyLabel={t.they}
                    weLabel={t.we}
                    saying={saying}
                    original={original}
                    // The reference often names the grade already; repeating it reads
                    // as a stutter, not as rigour.
                    grade={source.includes(grade) ? null : grade}
                    source={source}
                    theme={theme}
                    ratio={ratio}
                    font={font}
                    align={align}
                    qrUrl={qr ? qrUrl : null}
                    showMark={mark}
                  />
                </div>
              </div>
            </div>

            <div className="sheet-controls">
              <div className="sheet-field">
                <span>{t.theme}</span>
                <div className="sheet-swatches">
                  {THEMES.map((name) => (
                    <button key={name} type="button" title={t[name]} aria-label={t[name]}
                            aria-pressed={theme === name} onClick={() => setTheme(name)}
                            style={{ background: SWATCH[name] }} />
                  ))}
                </div>
              </div>

              <div className="sheet-field">
                <span>{t.ratio}</span>
                <div className="sheet-choices">
                  {RATIOS.map(({ id, Icon }) => (
                    <button key={id} type="button" title={t[id]} aria-label={t[id]}
                            aria-pressed={ratio === id} onClick={() => setRatio(id)}>
                      <Icon className="size-4" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="sheet-field">
                <span>{t.align}</span>
                <div className="sheet-choices">
                  {ALIGNS.map(({ id, Icon }) => (
                    <button key={id} type="button" aria-label={id}
                            aria-pressed={align === id} onClick={() => setAlign(id)}>
                      <Icon className="size-4" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="sheet-field">
                <span>{t.font}</span>
                <div className="sheet-choices">
                  {(["naskh", "serif"] as const).map((id) => (
                    <button key={id} type="button" aria-pressed={font === id}
                            onClick={() => setFont(id)}>
                      {t[id]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sheet-toggle">
                <span>
                  {t.qr}
                  <em>{t.qrNote}</em>
                </span>
                <button type="button" role="switch" aria-checked={qr} aria-label={t.qr}
                        onClick={() => setQr((v) => !v)} />
              </div>

              <div className="sheet-toggle">
                <span>
                  {t.logo}
                  <em>{t.logoNote}</em>
                </span>
                <button type="button" role="switch" aria-checked={mark} aria-label={t.logo}
                        onClick={() => setMark((v) => !v)} />
              </div>

              <div className="sheet-actions">
                <button type="button" className="sheet-primary" onClick={save} disabled={busy}>
                  <Download className="size-5" aria-hidden="true" />
                  {t.save}
                </button>
                <button type="button" className="sheet-secondary" onClick={send} disabled={busy}>
                  <Share className="size-5" aria-hidden="true" />
                  {t.send}
                </button>
              </div>
              <button type="button" className="sheet-copy" onClick={copyLink}>
                {copyStatus === "copied" ? t.copied : copyStatus === "failed" ? t.copyFailed : t.copy}
              </button>
            </div>
          </div>

          <Dialog.Close className="sheet-close" aria-label={t.close}>
            <X className="size-4" aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
