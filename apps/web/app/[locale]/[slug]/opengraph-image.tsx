import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { db } from "@/lib/supabase/public";
import { isLocale, type Locale } from "@/lib/i18n";

export const alt = "Uswah";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fonts are read from disk rather than fetched: the share card is the first thing
// anyone sees of this project, and it must not depend on a network call at render
// time. Arabic needs its own face or every glyph renders as a box.
//
// Static instances, not variable fonts — Satori cannot parse an `fvar` table and
// fails with an unhelpful "cannot read properties of undefined".
const font = (name: string) => readFile(join(process.cwd(), "assets", name));

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const rtl = locale === "ar";

  const { data } = await db
    .from("situations")
    .select("situation_translations!inner(title, locale)")
    .eq("slug", slug)
    .eq("situation_translations.locale", locale)
    .maybeSingle();

  const title = data?.situation_translations[0].title ?? "Uswah";
  const [regular, semibold, arabic, arabicBold] = await Promise.all([
    font("Inter-Regular.woff"),
    font("Inter-SemiBold.woff"),
    font("Arabic-Regular.woff"),
    font("Arabic-SemiBold.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Satori uses `direction` for shaping only, not for layout, so the
          // right-to-left arrangement is expressed with flex alignment instead.
          alignItems: rtl ? "flex-end" : "flex-start",
          background: "#fbfaf8",
          color: "#16202e",
          padding: 72,
          direction: rtl ? "rtl" : "ltr",
          fontFamily: rtl ? "Arabic" : "Inter",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: rtl ? 0 : 4,
            textTransform: rtl ? "none" : "uppercase",
            color: "#7c8798",
          }}
        >
          {rtl ? "أسوة" : "Uswah"}
        </div>

        {/* Satori mis-measures the spaces inside an Arabic run, which leaves ragged
            gaps between words and sometimes none at all. Laying each word out as its
            own flex item with an explicit gap sidesteps the text measurement entirely;
            row-reverse puts the first word on the right where it belongs. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "flex-start",
            columnGap: rtl ? 18 : 16,
            rowGap: 8,
            fontSize: 68,
            lineHeight: 1.25,
            maxWidth: 960,
            fontWeight: 600,
          }}
        >
          {title.split(/\s+/).map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: rtl ? "row-reverse" : "row",
            columnGap: rtl ? 8 : 7,
            fontSize: 26,
            color: "#7c8798",
          }}
        >
          {(rtl ? "من المصدر الأصلي" : "From the original source")
            .split(/\s+/)
            .map((word, i) => (
              <span key={i}>{word}</span>
            ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, style: "normal", weight: 400 },
        { name: "Inter", data: semibold, style: "normal", weight: 600 },
        { name: "Arabic", data: arabic, style: "normal", weight: 400 },
        { name: "Arabic", data: arabicBold, style: "normal", weight: 600 },
      ],
    },
  );
}
