import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { GRADES, quoteBySlug } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";

export const alt = "Uswah";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static instances only: Satori cannot parse a variable font's fvar table.
const font = (name: string) => readFile(join(process.cwd(), "assets", name));

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const rtl = locale === "ar";
  const q = await quoteBySlug(slug);

  /* The Arabic woff is a pre-flipped hack font: this Satori has no bidi engine
     and draws glyph runs left-to-right, so a real Arabic font comes out mirrored
     (tried Noto Naskh and Cairo; both also trip Satori's font parser on a GSUB
     lookup). The hack font's cost is fat side bearings padding every word's box;
     the spans below cancel them with negative margins. */
  const [regular, semibold, arabic] = await Promise.all([
    font("Inter-Regular.woff"),
    font("Inter-SemiBold.woff"),
    font("Arabic-Regular.woff"),
  ]);

  const saying = q ? (q[locale].saying ?? q.saying) : "Uswah";
  const grade = q ? GRADES[q.grade][locale] : "";
  const arabicSaying = /[؀-ۿ]/.test(saying);

  /* An invitation, not a caption: preview inspectors are right that a card with a
     verb gets opened more than one that just states. */
  const cta = { en: "Read the full comparison", ar: "اقرأ المقارنة كاملة", tr: "Karşılaştırmanın tamamını oku" }[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Satori reads `direction` for shaping only, so alignment is expressed with flex.
          alignItems: rtl ? "flex-end" : "flex-start",
          background: "#faf8f4",
          color: "#14181f",
          padding: 72,
          fontFamily: rtl ? "Arabic" : "Inter",
        }}
      >
        <div style={{ fontSize: 26, color: "#8a919c" }}>{rtl ? "أسوة" : "USWAH"}</div>

        {/* Each locale's own saying: the form that circulates in that language.
            Arabic words are separate spans in a reversed row (no bidi in Satori),
            and each span sheds the hack font's ~0.33em side bearings so the gaps
            read as spaces rather than holes. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: arabicSaying ? "row-reverse" : "row",
            /* Always a concrete value: Satori calls .trim() on style strings and
               dies on undefined. flex-start is the default it stands in for. */
            justifyContent: "flex-start",
            /* ponytail: bearings vary per edge glyph (12-19px a side at this size);
               compensation is tuned to the narrowest so no pair ever touches. */
            columnGap: arabicSaying ? 12 : 16,
            rowGap: arabicSaying ? 14 : 6,
            fontSize: 58,
            lineHeight: arabicSaying ? 1.45 : 1.25,
            fontWeight: arabicSaying ? 400 : 600,
            fontFamily: arabicSaying ? "Arabic" : "Inter",
            maxWidth: 980,
          }}
        >
          {saying.split(/\s+/).map((word, i) => (
            <span key={i} style={arabicSaying ? { marginLeft: -12, marginRight: -12 } : undefined}>
              {word}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: rtl ? "row-reverse" : "row",
            alignItems: "center",
            columnGap: 14,
            fontSize: 24,
            color: "#7d2b1d",
          }}
        >
          <span>{grade}</span>
          <span style={{ color: "#8a919c" }}>·</span>
          {/* Satori shapes Arabic but does not reorder it: a multi-word run comes out
              with the words left to right, so the phrase reads backwards. Laying the
              words out as a row-reverse flex puts them back in reading order. */}
          <div
            style={{
              display: "flex",
              flexDirection: rtl ? "row-reverse" : "row",
              columnGap: rtl ? 7 : 8,
              color: "#59606c",
            }}
          >
            {cta.split(" ").map((word, i) => (
              <span key={i} style={rtl ? { marginLeft: -5, marginRight: -5 } : undefined}>
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, style: "normal", weight: 400 },
        { name: "Inter", data: semibold, style: "normal", weight: 600 },
        { name: "Arabic", data: arabic, style: "normal", weight: 400 },
      ],
    },
  );
}
