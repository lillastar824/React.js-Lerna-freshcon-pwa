import React, { createContext } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
// import Reset from './Reset'
import Login from './Login'
import { useEffect } from 'react'
import { useState } from 'react'
import { parse } from 'query-string'
import firebase from 'firebase/app'

export const welcomeContext = createContext()
async function verifyPasswordReset(mode, oobCode, set) {
	try {
		let mail = await firebase.auth().verifyPasswordResetCode(oobCode)
		set({
			mode,
			oobCode,
			mail,
		})
	} catch (e) {
		throw new Error('expired code')
	}
}
function Welcome({ location }) {
	const [params, set] = useState({})
	const history = useHistory()
	useEffect(() => {
		const { mode, oobCode } = parse(location.search)
		if (mode === 'resetPassword')
			verifyPasswordReset(mode, oobCode, set).then(() => {
				history.push('/welcome/reset')
			})
	}, [location, history])
	return (
		<welcomeContext.Provider
			value={{
				params,
			}}
		>
			<Switch>
				<Route path="/welcome/login" component={Login} />
				{/* <Route path="/welcome/reset" component={Reset} /> */}
				<Redirect to="/welcome/login" />
			</Switch>
		</welcomeContext.Provider>
	)
}

export default Welcome
