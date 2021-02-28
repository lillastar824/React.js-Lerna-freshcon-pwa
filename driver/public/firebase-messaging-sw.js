importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
	apiKey: 'AIzaSyD45YPEUZ7j5QPVzhW5ivsCCUEKFuZC5e0',
	authDomain: 'freshconn-develop.firebaseapp.com',
	databaseURL: 'https://freshconn-develop.firebaseio.com',
	projectId: 'freshconn-develop',
	storageBucket: 'freshconn-develop.appspot.com',
	messagingSenderId: '489149559976',
	appId: '1:489149559976:web:e706deee596f34eeedbe9d',
	measurementId: 'G-87NRF31W94',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler((payload) => {
	const notificationTitle = 'Driver'
	const notificationOptions = {
		body: payload.data,
		icon: '/icon192.png',
	}
	return self.registration.showNotification(
		notificationTitle,
		notificationOptions
	)
})
