import React from 'react'
import { useEffect } from 'react'
import firebase from 'firebase/app'

function NotificationCenter({ children }) {
	useEffect(() => {
		firebase.messaging().onMessage((payload) => {
			console.log('Message received. ', payload)
			// ...
		})
	}, [])
	return <React.Fragment>{children}</React.Fragment>
}

export default NotificationCenter
