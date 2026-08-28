/* global self, clients */
/**
 * Push delivery for the Uswah PWA. No offline cache, installability does not need it;
 * this worker only shows notifications and opens the site on click.
 */
self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data = { title: "Uswah", body: "", icon: "/icons/192", url: "/" };
  try {
    data = { ...data, ...event.data.json() };
  } catch {
    data.body = event.data.text();
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || "/icons/192",
      badge: "/icons/192",
      data: { url: data.url || "/" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus().then((focused) => {
            if (focused && "navigate" in focused) return focused.navigate(url);
          });
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    }),
  );
});
