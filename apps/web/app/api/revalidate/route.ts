import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * On-demand revalidation, called by the dashboard on every save, publish and
 * delete. Same contract as erth's:
 *
 *   POST /api/revalidate
 *   header: x-revalidate-secret: <REVALIDATE_SECRET>
 *   body:   { "tag": "content:sayings" }   // or { "tags": [...] }
 *
 * Flushes the tagged content reads so the next request renders fresh rows —
 * no rebuild, no redeploy.
 */

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let tags: string[] = [];
  try {
    const body = await req.json();
    if (typeof body?.tag === "string") tags = [body.tag];
    else if (Array.isArray(body?.tags))
      tags = body.tags.filter((t: unknown) => typeof t === "string");
  } catch {
    // fall through to the empty-tags guard
  }

  if (tags.length === 0) {
    return NextResponse.json({ error: "no tag provided" }, { status: 400 });
  }

  // Next 16: 'max' serves stale content while the fresh render happens behind it.
  for (const tag of tags) revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: true, tags });
}
