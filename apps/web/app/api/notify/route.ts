import { NextResponse, type NextRequest } from "next/server";
import { broadcastNotification } from "@/app/push/actions";

/**
 * Fan-out a web push to stored subscriptions.
 *
 *   POST /api/notify
 *   header: x-revalidate-secret: <REVALIDATE_SECRET>
 *   body:   { "title": "...", "body": "...", "url"?: "/", "locale"?: "en" }
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let title = "Uswah";
  let body = "";
  let url: string | undefined;
  let locale: string | undefined;

  try {
    const json = await req.json();
    if (typeof json?.title === "string" && json.title.trim()) title = json.title.trim();
    if (typeof json?.body === "string") body = json.body.trim();
    if (typeof json?.url === "string") url = json.url;
    if (typeof json?.locale === "string") locale = json.locale;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (!body) {
    return NextResponse.json({ error: "body required" }, { status: 400 });
  }

  const result = await broadcastNotification({ title, body, url }, locale);
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json(result);
}
