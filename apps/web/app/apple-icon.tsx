import { ImageResponse } from "next/og";
import { markSvg, dataUri, SAND } from "@/lib/logo";

// iOS rounds the corners itself, so this ships square with the glyph pulled in.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <img
        src={dataUri(markSvg({ ground: SAND, radius: 0, scale: 0.86 }))}
        width={180}
        height={180}
        alt=""
      />
    ),
    size,
  );
}
