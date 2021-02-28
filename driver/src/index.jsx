import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/messaging'
import 'firebase/performance'
import * as serviceWorker from './serviceWorker'
import AuthProvider from './auth'

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT,
	storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING,
	appId: process.env.REACT_APP_FIREBASE_DRIVER_APP,
	measurementId: process.env.REACT_APP_FIREBASE_DRIVER_MEASUREMENT,
}

firebase.initializeApp(config)
firebase.auth().useDeviceLanguage()
// firebase
// 	.messaging()
// 	.usePublicVapidKey(
// 		'BIeSZkfbQLRdfO5ZgMfQ6_u1arxCk1QBSn-TXo_SnJZvDnoNNvZDpI8hbhvaT711G49D2YNHm63bngKsfPVJVTc'
// 	)

if (process.env.NODE_ENV !== 'development') {
	// enable performce on production
	firebase.performance()
}

ReactDOM.render(
	<AuthProvider>
		<App />
	</AuthProvider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
	onUpdate: (registration) => {
		console.log('update found')
		registration.unregister().then(() => {
			window.location.reload()
			console.log('updated')
		})
	},
})
