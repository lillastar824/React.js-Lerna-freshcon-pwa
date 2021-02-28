import React, { createContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
const auth = createContext()

function AuthProvider({ children }) {
	const [user, set] = useState('loading')
	useEffect(() => {
		const unsub = firebase.auth().onAuthStateChanged((user) => {
			if (user && user.emailVerified) {
				set(user)
			} else set(null)
		})
		return () => {
			unsub()
		}
	}, [])

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
