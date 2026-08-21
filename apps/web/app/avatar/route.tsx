import { ImageResponse } from "next/og";
import { markSvg, dataUri, SAND } from "@/lib/logo";

/**
 * The social avatar. Square and full-bleed, because every platform applies its own mask:
 * a circle on X and Instagram, a rounded square elsewhere. The glyph is pulled to 76% so
 * a circular crop never touches it.
 */
export function GET() {
  return new ImageResponse(
    (
      <img
        src={dataUri(markSvg({ ground: SAND, radius: 0, scale: 0.76 }))}
        width={1000}
        height={1000}
        alt=""
      />
    ),
    { width: 1000, height: 1000 },
  );
}
