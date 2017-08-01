/* eslint-env browser, es6 */
/* eslint-disable no-unused-vars */

'use strict';

///Public Key

//BB8iTwD7mwzJvrvKVqDX1RZuAqLcfvd8JN0KP-nGDWruFIY0FD1y_pO3celc7vQfri-PjRbyFHEoYJMIIWdnhNo
//Private Key

//YwcyFvu72-I7P-5ja7PKWsvsuTSnkFtRjFvFgReeDwc


const applicationServerPublicKey = 'BB8iTwD7mwzJvrvKVqDX1RZuAqLcfvd8JN0KP-nGDWruFIY0FD1y_pO3celc7vQfri-PjRbyFHEoYJMIIWdnhNo';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
	console.log('Service Worker and Push is supported');

	navigator.serviceWorker.register('service_worker.js')
		.then(function (swReg) {
			console.log('Service Worker is registered', swReg);

			swRegistration = swReg;
		})
		.catch(function (error) {
			console.error('Service Worker Error', error);
		});
} else {
	console.warn('Push messaging is not supported');
	pushButton.textContent = 'Push Not Supported';
}