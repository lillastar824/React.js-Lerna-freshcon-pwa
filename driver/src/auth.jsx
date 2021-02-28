import React, { createContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
const auth = createContext()

function AuthProvider({ children }) {
	const [user, set] = useState('loading')
	useEffect(() => {
		const unsub = firebase.auth().onAuthStateChanged((user) => {
			if (user) set(user)
			else set(null)
		})
		return () => {
			unsub()
		}
	}, [])
	useEffect(() => {
		async function message(id) {
			const messaging = firebase.messaging()
			messaging
				.getToken()
				.then(async (currentToken) => {
					if (currentToken) {
						await firebase.firestore().collection('drivers').doc(id).update({
							push: currentToken,
						})
					} else {
						// Show permission request.
						console.log(
							'No Instance ID token available. Request permission to generate one.'
						)
						// Show permission UI.
					}
				})
				.catch((err) => {
					console.log('An error occurred while retrieving token. ', err)
				})
			messaging.onMessage((payload) => {
				console.log('Message received. ', payload)
				// ...
			})
		}
		if (user && user.uid) {
			message(user.uid)
		}
	}, [user])

	return (
		<auth.Provider
			value={{
				user,
			}}
		>
			{children}
		</auth.Provider>
	)
}

export default AuthProvider
export { auth }
