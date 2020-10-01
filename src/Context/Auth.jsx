import React, { useState, useEffect } from 'react'
import firebase from '@firebase/app'

const authContext = React.createContext()

function AuthProvider({ children }) {
	const [auth, setAuth] = useState(firebase.auth().currentUser)
	const [loaded, enable] = useState(false)
	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			setAuth(user)
			enable(true)
		})
	}, [])
	return (
		<authContext.Provider
			value={{
				hasAuthLoaded: loaded,
				auth,
			}}
		>
			{children}
		</authContext.Provider>
	)
}

export default AuthProvider
export { authContext }
