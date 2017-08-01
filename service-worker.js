self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'グローバルデザイン';
  const options = {
    body: 'Webサイトの構築、運用',
    icon: 'img/logo_m.gif',
    badge: 'img/logo_m.gif'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://glode.co.jp')
  );
});