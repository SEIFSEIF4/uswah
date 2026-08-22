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

  const [regular, semibold, arabic] = await Promise.all([
    font("Inter-Regular.woff"),
    font("Inter-SemiBold.woff"),
    font("Arabic-Regular.woff"),
  ]);

  const saying = q ? (q[locale].saying ?? q.saying) : "Uswah";
  const grade = q ? GRADES[q.grade][locale] : "";
  /* The ar locale carries a native Arabic saying; Satori shapes it but does not
     reorder it, so its words go into a reversed row, same as the strapline below. */
  const arabicSaying = /[؀-ۿ]/.test(saying);

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

        {/* Each locale's own saying: the form that circulates in that language. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: arabicSaying ? "row-reverse" : "row",
            columnGap: 16,
            rowGap: arabicSaying ? 14 : 6,
            fontSize: 58,
            lineHeight: arabicSaying ? 1.45 : 1.25,
            fontWeight: arabicSaying ? 400 : 600,
            fontFamily: arabicSaying ? "Arabic" : "Inter",
            maxWidth: 980,
          }}
        >
          {saying.split(/\s+/).map((word, i) => (
            <span key={i}>{word}</span>
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
              columnGap: 8,
              color: "#59606c",
            }}
          >
            {(rtl ? "من المصدر الأصلي" : "From the original source")
              .split(" ")
              .map((word, i) => (
                <span key={i}>{word}</span>
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
