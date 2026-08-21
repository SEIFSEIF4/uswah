"use client";

/**
 * The share card as real markup.
 *
 * The previous renderer (Satori) shapes Arabic but applies no bidi reordering, no mark
 * attachment and no line breaking. Every card needed hand-packed lines, stripped
 * harakat and invented word gaps, and each fix traded one artefact for another —
 * letters split inside words, vowels floating beside their letters. The browser has a
 * full text engine and this site already renders the same text correctly on the page,
 * so the card is drawn by the DOM and snapshotted client-side instead.
 *
 * The card lays itself out at its export size (1080×1920 and friends) and is scaled
 * down visually by the dialog, so the preview and the saved image are the same layout,
 * not two approximations of each other.
 */
import type { CSSProperties } from "react";
import type { Locale } from "@/lib/i18n";

export const CARD_THEMES = {
  warm: { bg: "#faf8f4", ink: "#14181f", muted: "#8a919c", quiet: "#a9a49c", ornament: "#e0d8c8", brand: "#7d2b1d" },
  paper: { bg: "#ffffff", ink: "#14181f", muted: "#8a919c", quiet: "#a9a49c", ornament: "#ebe4d8", brand: "#7d2b1d" },
  ink: { bg: "#241d18", ink: "#f4f1ea", muted: "#a89b8a", quiet: "#8d8175", ornament: "#4a3f35", brand: "#e8a08d" },
} as const;
export type CardTheme = keyof typeof CARD_THEMES;

export const CARD_SIZES = {
  story: { w: 1080, h: 1920 },
  square: { w: 1080, h: 1080 },
  wide: { w: 1920, h: 1080 },
} as const;
export type CardRatio = keyof typeof CARD_SIZES;

/**
 * Both faces are Arabic text faces already loaded by the page. Naskh is the default
 * because DESIGN.md reserves it for scripture; Thmanyah is offered because it is the
 * site's own voice. The toggle changes the verse, which is the card.
 */
export type CardFont = "naskh" | "serif";
export type CardAlign = "start" | "center" | "end" | "justify";

const PETALS = [
  "M366.952 364.857C549.954 192.357 544.454 169.357 366.952 1.35712C185.455 162.857 183.454 197.357 366.952 364.857Z",
  "M366.952 728.857C549.954 556.357 544.454 533.357 366.952 365.357C185.455 526.857 183.454 561.357 366.952 728.857Z",
  "M369.078 366.231C541.578 549.234 564.578 543.734 732.578 366.231C571.078 184.735 536.578 182.733 369.078 366.231Z",
  "M1.36377 365.946C173.864 548.948 196.864 543.448 364.864 365.946C203.364 184.449 168.864 182.447 1.36377 365.946Z",
];

function Rosette({ colour, size, style }: { colour: string; size: number; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 734 731" width={size} height={size} style={style} aria-hidden="true">
      {PETALS.map((d) => (
        <path key={d} d={d} stroke={colour} strokeWidth={2} fill="none" />
      ))}
    </svg>
  );
}

/** The tile mark from app/icon.svg, inlined so the snapshot never waits on a request. */
function Mark({ size, style }: { size: number; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} style={style} aria-hidden="true">
      <rect width="64" height="64" rx="10" fill="#e4d9c6" />
      <g transform="translate(19.96 32.04) scale(0.0482)">
        <path
          d="M17 67 27 82 404 -27 482 -179 471 -193 337 -168C198 -157 119 -220 119 -255C119 -290 219 -307 253 -307C302 -307 353 -271 380 -231L395 -233L400 -242C450 -345 412 -457 309 -457C184 -457 88 -293 88 -183C88 -139 103 -100 136 -68C126 -58 117 -48 108 -38Z"
          fill="#241d18"
        />
      </g>
      <rect x="26.5" y="38" width="11" height="17" rx="2.5" fill="#241d18" />
    </svg>
  );
}

function Eyebrow({
  text,
  colour,
  rule,
  k,
  arabic,
}: {
  text: string;
  colour: string;
  rule: string;
  k: number;
  arabic: boolean;
}) {
  const bar: CSSProperties = { width: 28 * k, height: 1, background: rule, flex: "none" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 * k, alignSelf: "center" }}>
      <span style={bar} />
      <span
        style={{
          fontSize: 26 * k,
          color: colour,
          whiteSpace: "nowrap",
          fontFamily: arabic
            ? "var(--font-arabic), sans-serif"
            : "var(--font-latin), system-ui, sans-serif",
          letterSpacing: arabic ? 0 : "0.08em",
          textTransform: arabic ? undefined : "uppercase",
        }}
      >
        {text}
      </span>
      <span style={bar} />
    </div>
  );
}

export function QuoteCard({
  locale,
  theyLabel,
  weLabel,
  saying,
  original,
  grade,
  source,
  theme: themeName,
  ratio,
  font,
  align,
  qrUrl,
  showMark,
}: {
  locale: Locale;
  theyLabel: string;
  weLabel: string;
  saying: string;
  original: string | null;
  grade: string | null;
  source: string;
  theme: CardTheme;
  ratio: CardRatio;
  font: CardFont;
  align: CardAlign;
  qrUrl: string | null;
  showMark: boolean;
}) {
  const theme = CARD_THEMES[themeName];
  const { w, h } = CARD_SIZES[ratio];
  const rtl = locale === "ar";
  // One composition; the shorter canvases run the same design smaller.
  const k = ratio === "story" ? 1 : ratio === "square" ? 0.62 : 0.68;

  // The browser breaks lines itself now, so sizing is the only length decision left.
  const len = original ? original.replace(/[ً-ْٰ]/g, "").length : 0;
  const verseSize = (len > 180 ? 46 : len > 110 ? 56 : len > 60 ? 66 : 78) * k;
  const sayingSize = (saying.length > 70 ? 34 : saying.length > 45 ? 40 : 46) * k;

  const alignItems =
    align === "center" ? "center" : align === "justify" ? "stretch" : `flex-${align}`;
  const ornamentSize = Math.min(w, h) * 0.62;

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      style={{
        width: w,
        height: h,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: theme.bg,
        color: theme.ink,
        padding: `${130 * k}px ${90 * k}px`,
      }}
    >
      {/* Bled off opposite corners, barely above the ground. */}
      <Rosette
        colour={theme.ornament}
        size={ornamentSize}
        style={{ position: "absolute", left: -ornamentSize * 0.34, top: -ornamentSize * 0.32 }}
      />
      <Rosette
        colour={theme.ornament}
        size={ornamentSize}
        style={{ position: "absolute", right: -ornamentSize * 0.34, bottom: -ornamentSize * 0.32 }}
      />

      {showMark && (
        <Mark size={84 * k} style={{ position: "absolute", top: 64 * k, right: 64 * k, borderRadius: 14 }} />
      )}
      {qrUrl && (
        <img
          src={qrUrl}
          width={112 * k}
          height={112 * k}
          alt=""
          style={{ position: "absolute", bottom: 64 * k, left: 64 * k, opacity: 0.85 }}
        />
      )}

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems,
          textAlign: align,
          gap: 34 * k,
        }}
      >
        <Eyebrow text={theyLabel} colour={theme.quiet} rule={theme.ornament} k={k} arabic={rtl} />

        {/* The saying circulates in English, so it keeps its own direction. */}
        <p
          dir="ltr"
          style={{
            margin: 0,
            fontSize: sayingSize,
            lineHeight: 1.4,
            color: theme.muted,
            fontFamily: "var(--font-latin), system-ui, sans-serif",
          }}
        >
          {saying}
        </p>

        {original && (
          <>
            <Rosette colour={theme.ornament} size={54 * k} style={{ alignSelf: "center", margin: `${10 * k}px 0` }} />
            <Eyebrow text={weLabel} colour={theme.brand} rule={theme.brand} k={k} arabic={rtl} />
            {/* Full harakat, real shaping, natural spacing: the browser's text engine. */}
            <p
              dir="rtl"
              style={{
                margin: 0,
                fontSize: verseSize,
                lineHeight: font === "naskh" ? 2 : 1.85,
                fontWeight: 500,
                color: theme.ink,
                fontFamily:
                  font === "naskh"
                    ? "var(--font-scripture), serif"
                    : "var(--font-arabic), serif",
              }}
            >
              {original}
            </p>
          </>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 72 * k,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 14 * k,
          fontSize: 30 * k,
          color: theme.muted,
          fontFamily: rtl ? "var(--font-arabic), sans-serif" : "var(--font-latin), system-ui, sans-serif",
        }}
      >
        {grade && (
          <>
            <span>{grade}</span>
            <span
              style={{ width: 5 * k, height: 5 * k, borderRadius: 999, background: theme.ornament }}
            />
          </>
        )}
        <span>{source}</span>
      </div>
    </div>
  );
}
