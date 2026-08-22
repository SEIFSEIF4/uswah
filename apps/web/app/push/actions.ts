"use server";

import { currentUserId } from "@/lib/supabase/server";
import { serviceDb } from "@/lib/supabase/service";
import {
  configureWebPush,
  isGoneSubscription,
  sendPush,
  toWebPushSubscription,
  type PushPayload,
  type StoredSubscription,
} from "@/lib/push";
import { isLocale, type Locale } from "@/lib/i18n";

function parseSub(sub: StoredSubscription) {
  if (
    !sub?.endpoint ||
    !sub.keys?.p256dh ||
    !sub.keys?.auth ||
    typeof sub.endpoint !== "string" ||
    typeof sub.keys.p256dh !== "string" ||
    typeof sub.keys.auth !== "string"
  ) {
    throw new Error("Invalid push subscription");
  }
  return sub;
}

export async function subscribeUser(sub: StoredSubscription, locale: string) {
  const parsed = parseSub(sub);
  const loc: Locale = isLocale(locale) ? locale : "en";
  const userId = await currentUserId();
  const db = serviceDb();

  const { error } = await db.from("push_subscriptions").upsert(
    {
      endpoint: parsed.endpoint,
      p256dh: parsed.keys.p256dh,
      auth: parsed.keys.auth,
      user_id: userId,
      locale: loc,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "endpoint" },
  );

  if (error) {
    console.error("push subscribe failed", error);
    return { success: false as const, error: "Failed to save subscription" };
  }
  return { success: true as const };
}

export async function unsubscribeUser(endpoint: string) {
  if (!endpoint) return { success: false as const, error: "Missing endpoint" };
  const db = serviceDb();
  const { error } = await db
    .from("push_subscriptions")
    .delete()
    .eq("endpoint", endpoint);

  if (error) {
    console.error("push unsubscribe failed", error);
    return { success: false as const, error: "Failed to remove subscription" };
  }
  return { success: true as const };
}

/**
 * Fan-out to stored subscriptions. Call from a secret-protected route (or later
 * from the dashboard on publish). Removes endpoints that browsers report as gone.
 */
export async function broadcastNotification(
  payload: PushPayload,
  locale?: string,
) {
  configureWebPush();
  const db = serviceDb();
  let query = db.from("push_subscriptions").select("endpoint, p256dh, auth");
  if (locale && isLocale(locale)) query = query.eq("locale", locale);

  const { data, error } = await query;
  if (error) {
    console.error("push list failed", error);
    return { success: false as const, sent: 0, error: "Failed to load subscriptions" };
  }

  let sent = 0;
  const gone: string[] = [];

  await Promise.all(
    (data ?? []).map(async (row) => {
      try {
        await sendPush(toWebPushSubscription(row), payload);
        sent += 1;
      } catch (err) {
        if (isGoneSubscription(err)) gone.push(row.endpoint);
        else console.error("push send failed", row.endpoint, err);
      }
    }),
  );

  if (gone.length > 0) {
    await db.from("push_subscriptions").delete().in("endpoint", gone);
  }

  return { success: true as const, sent, pruned: gone.length };
}
