/* eslint-env browser,  es6 */

function getDetails() {
  const details = window.localStorage.getItem('last-known-details');
  try {
    if (details) {
      return JSON.parse(details);
    }
  } catch (err) {
    // NOOP
  }
  return null;
}

function saveDetails(details) {
  window.localStorage.setItem('last-known-details',
    JSON.stringify(details));
}

function sendPushMessage() {
  const subscriptionTextArea = document.getElementById('push-subscription');
  const textToSendTextArea = document.getElementById('push-data');

  const subscriptionString = subscriptionTextArea.value.trim();
  const dataString = textToSendTextArea.value;

  saveDetails({
    subscription: subscriptionString,
    data: dataString
  });

  if (subscriptionString.length === 0 ) {
    return Promise.reject(new Error('Please provide a push subscription.'));
  }

  let subscriptionObject = null;
  try {
    subscriptionObject = JSON.parse(subscriptionString);
  } catch (err) {
    return Promise.reject(new Error('Unable to parse subscription as JSON'));
  }

  if (!subscriptionObject.endpoint) {
    return Promise.reject(new Error('The subscription MUST have an endpoint'));
  }

  if (subscriptionObject.endpoint.indexOf('â€¦') !== -1) {
    return Promise.reject(new Error('The subscription endpoint appears to be ' +
      'truncated (It has \'...\' in it).\n\nDid you copy it from the console ' +
      'in Chrome?')
    );
  }

  // const publicElement = document.getElementById('.js-public-key');
 // const privateElement = document.getElementById('.js-private-key');

  return fetch('https://web-push-codelab.appspot.com/api/send-push-msg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subscription: subscriptionObject,
      data: dataString,
      applicationKeys: {
        public: "BB8iTwD7mwzJvrvKVqDX1RZuAqLcfvd8JN0KP-nGDWruFIY0FD1y_pO3celc7vQfri-PjRbyFHEoYJMIIWdnhNo",
        private: "YwcyFvu72-I7P-5ja7PKWsvsuTSnkFtRjFvFgReeDwc"
      }
    })
  })
  .then((response) => {
    if (response.status !== 200) {
      return response.text()
      .then((responseText) => {
        throw new Error(responseText);
      });
    }
  });
}

function initialiseUI() {
  const sendBtn = document.getElementById('js-send-push');
  sendBtn.addEventListener('click', () => {
    sendBtn.disabled = true;

    sendPushMessage()
    .catch((err) => {
      console.error(err);
      window.alert(err.message);
    })
    .then(() => {
      sendBtn.disabled = false;
    });
  });

  const previousDetails = getDetails();
  if (previousDetails) {
    const subscriptionTextArea = document.getElementById('push-subscription');
    const textToSendTextArea = document.getElementById('push-data');

    subscriptionTextArea.value = previousDetails.subscription;
    textToSendTextArea.value = previousDetails.data;
  }

  sendBtn.disabled = false;
}

window.addEventListener('load', () => {
  initialiseUI();
});