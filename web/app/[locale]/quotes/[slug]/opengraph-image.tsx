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
  const q = quoteBySlug(slug);

  const [regular, semibold, arabic] = await Promise.all([
    font("Inter-Regular.woff"),
    font("Inter-SemiBold.woff"),
    font("Arabic-Regular.woff"),
  ]);

  const saying = q?.saying ?? "Uswah";
  const grade = q ? GRADES[q.grade][locale] : "";

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

        {/* The saying stays LTR whatever the page language: it circulates in English. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 16,
            rowGap: 6,
            fontSize: 58,
            lineHeight: 1.25,
            fontWeight: 600,
            fontFamily: "Inter",
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
          <span style={{ color: "#59606c" }}>
            {rtl ? "من المصدر الأصلي" : "From the original source"}
          </span>
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
