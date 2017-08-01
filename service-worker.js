self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'http://www.glode.com/img/logo_m.gif',
    badge: 'http://www.glode.com/img/logo_m.gif'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});