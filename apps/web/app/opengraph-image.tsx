import { ImageResponse } from "next/og";
import { markSvg, dataUri, SAND, INK, WORDMARK_PATH, WORDMARK_VIEWBOX } from "@/lib/logo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Uswah";

const wordmark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${WORDMARK_VIEWBOX}"><path d="${WORDMARK_PATH}" fill="${INK}"/></svg>`;

// The link preview is the wordmark and nothing else. Every other surface is small enough
// to need the mark instead; this one has room for the name.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: SAND,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <img src={dataUri(wordmark)} width={520} height={345} alt="" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            color: INK,
            fontSize: 30,
            letterSpacing: 8,
          }}
        >
          <img src={dataUri(markSvg({ ground: null, scale: 1 }))} width={44} height={44} alt="" />
          USWAH
        </div>
      </div>
    ),
    size,
  );
}
