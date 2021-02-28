import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
import '@firebase/storage'
import '@firebase/analytics'
import '@firebase/performance'
import '@firebase/messaging'
import * as Sentry from '@sentry/browser'
import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
import * as serviceWorker from './serviceWorker'

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT,
	storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING,
	appId: process.env.REACT_APP_FIREBASE_SHOP_APP,
	measurementId: process.env.REACT_APP_FIREBASE_SHOP_MEASUREMENT,
}

firebase.initializeApp(config)

firebase.auth().useDeviceLanguage()
if (firebase.messaging.isSupported()) {
	firebase
		.messaging()
		.usePublicVapidKey(
			'BIeSZkfbQLRdfO5ZgMfQ6_u1arxCk1QBSn-TXo_SnJZvDnoNNvZDpI8hbhvaT711G49D2YNHm63bngKsfPVJVTc'
		)
}
if (process.env.NODE_ENV !== 'development') {
	// enable sentry during production
	Sentry.init({
		dsn: process.env.REACT_APP_SENTRY,
		environment:
			process.env.REACT_APP_FIREBASE_PROJECT === 'freshconn-develop'
				? 'stage'
				: 'live',
	})
	firebase.performance()
} else {
	// disable anaylitcs during development
	firebase.analytics().setAnalyticsCollectionEnabled(false)
}

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register({
	onUpdate: (registration) => {
		console.log('update found')
		registration.unregister().then(() => {
			window.location.reload()
			console.log('updated')
		})
	},
})
