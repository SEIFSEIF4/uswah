import webpush from "web-push";

export type PushPayload = {
  title: string;
  body: string;
  icon?: string;
  url?: string;
};

export type StoredSubscription = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

let configured = false;

export function configureWebPush() {
  if (configured) return;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT ?? "mailto:hello@uswah.app";
  if (!publicKey || !privateKey) {
    throw new Error("VAPID keys are not configured");
  }
  webpush.setVapidDetails(subject, publicKey, privateKey);
  configured = true;
}

export function toWebPushSubscription(row: {
  endpoint: string;
  p256dh: string;
  auth: string;
}): webpush.PushSubscription {
  return {
    endpoint: row.endpoint,
    keys: { p256dh: row.p256dh, auth: row.auth },
  };
}

export async function sendPush(
  subscription: webpush.PushSubscription,
  payload: PushPayload,
) {
  configureWebPush();
  await webpush.sendNotification(
    subscription,
    JSON.stringify({
      title: payload.title,
      body: payload.body,
      icon: payload.icon ?? "/icons/192",
      url: payload.url ?? "/",
    }),
  );
}

/** web-push throws with statusCode 404/410 when the subscription is gone. */
export function isGoneSubscription(error: unknown): boolean {
  const status =
    error && typeof error === "object" && "statusCode" in error
      ? Number((error as { statusCode: unknown }).statusCode)
      : null;
  return status === 404 || status === 410;
}
