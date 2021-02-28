import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
// import registerServiceWorker from './registerServiceWorker'

import Auth from './Context/Auth'
import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import '@firebase/storage'
import '@firebase/analytics'
import '@firebase/messaging'
import '@firebase/performance'
import client from './Apollo'
import { ApolloProvider } from 'react-apollo'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT,
	storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING,
	appId: process.env.REACT_APP_FIREBASE_FARMER_APP,
	measurementId: process.env.REACT_APP_FIREBASE_FARMER_MEASUREMENT,
}

firebase.initializeApp(config)
firebase.auth().useDeviceLanguage()
firebase
	.messaging()
	.usePublicVapidKey(
		'BIeSZkfbQLRdfO5ZgMfQ6_u1arxCk1QBSn-TXo_SnJZvDnoNNvZDpI8hbhvaT711G49D2YNHm63bngKsfPVJVTc'
	)

if (process.env.NODE_ENV !== 'development') {
	// enable performce on production
	firebase.performance()
}

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#EF6C00',
		},
		secondary: {
			main: '#7CB342',
			contrastText: '#fff',
		},
	},
})

ReactDOM.render(
	<Auth>
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</ApolloProvider>
	</Auth>,
	document.getElementById('root')
)
// registerServiceWorker()
