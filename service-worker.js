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
		 document.addEventListener('DOMContentLoaded', function () {
		  if (Notification.permission !== "granted")
		    Notification.requestPermission();
		});

		function notifyMe() {
		  if (!Notification) {
		    alert('Permission required'); 
		    return;
		  }
			
		  if (Notification.permission !== "granted")
		    Notification.requestPermission();
		  else {
		    var text = document.getElementById('mytext').value;
		    var notification = new Notification('Notification title', {
		      icon: 'http://www.glode.com/img/logo_m.gif',
		      body: text,
		    });

		    notification.onclick = function () {
		      window.open("https://www.glode.co.jp/");      
		    };    
		  }
		}
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