import { ImageResponse } from "next/og";
import { markSvg, dataUri, SAND } from "@/lib/logo";

/**
 * PWA install icons, same mark as the favicon / apple-icon. `512-maskable` pulls the
 * glyph in so Android's circular/squircle crop never clips the hamza or stem.
 */
const SIZES = {
  "192": { px: 192, scale: 0.86 },
  "512": { px: 512, scale: 0.86 },
  "512-maskable": { px: 512, scale: 0.72 },
} as const;

type SizeKey = keyof typeof SIZES;

export function generateStaticParams() {
  return Object.keys(SIZES).map((size) => ({ size }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> },
) {
  const { size } = await params;
  const spec = SIZES[size as SizeKey];
  if (!spec) {
    return new Response("Not found", { status: 404 });
  }

  const { px, scale } = spec;
  return new ImageResponse(
    (
      <img
        src={dataUri(markSvg({ ground: SAND, radius: 0, scale }))}
        width={px}
        height={px}
        alt=""
      />
    ),
    { width: px, height: px },
  );
}
