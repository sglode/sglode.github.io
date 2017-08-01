self.addEventListener('install', function(event) {
  console.log("Service Worker installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  console.log("Service Worker activated");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', function(event) {
  console.log("Service Worker message event: " + JSON.stringify(event.data));
  var sender = ( event.ports && event.ports[0] ) || event.source;
  switch (event.data) {
    case 'fetchNotifications': {
      // send notifications when client is ready
      sender.postMessage("Here are your queued notifications!");
      break;
    }
    // case 'command': // handle some command, respond
    default: {
      if(sender)
        sender.postMessage("Unknown command: " + event.data);
      break;
    }
  }
});

console.log("Service Worker initialized");

setInterval(function() {
  // request to your API
  // create notification
  // queue to send to client
}, 60*1000);