import React, { useState, useContext, useEffect, createContext } from 'react'
import HowItWorks from '../Containers/How'
import Register from '../Containers/Register'
import Login from '../Containers/Login'
import Reset from '../Containers/ResetPassword'
import { WelcomeHeader } from '../Components/WelcomeHeader'
import { auth } from '../Context/Auth'
import { useHistory, useRouteMatch, Redirect } from 'react-router-dom'
import { parse } from 'query-string'
import firebase from 'firebase/app'
import { Route, Switch } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Container from '../Containers/WelcomeContainer'
export const welcomeContext = createContext()

async function createUser() {
	let { uid, displayName } = firebase.auth().currentUser
	let user = await firebase.firestore().collection('users').doc(uid).get()
	if (!user.exists)
		user.ref.set({
			name: displayName,
		})
}
async function verifEmail(oobCode) {
	try {
		await firebase.auth().applyActionCode(oobCode)
		await createUser()
	} catch (error) {
		throw error
	}
}

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
	let { path } = useRouteMatch()
	const { user } = useContext(auth)
	const history = useHistory()
	const [params, set] = useState({})

	useEffect(() => {
		const MySwal = withReactContent(Swal)
		const { mode, oobCode } = parse(location.search)
		if (mode === 'verifyEmail') {
			verifEmail(oobCode).then(
				() => {
					MySwal.fire({
						icon: 'success',
						title: <p>Verficaiton Complete</p>,
						showConfirmButton: false,
						timer: 2000,
						onClose: () => {
							history.push('/')
							window.location.reload()
						},
					})
				},
				(e) => {
					console.log(e.code, e.message)
					if (e.code === 'auth/expired-action-code')
						MySwal.fire({
							icon: 'error',
							title: <p>Link Expired, Login to verify again</p>,
						})
					if (e.code === 'auth/invalid-action-code')
						MySwal.fire({
							icon: 'error',
							title: <p>Invalid Link or Already Verified</p>,
						})
					if (e.code === 'auth/user-disabled')
						MySwal.fire({
							icon: 'error',
							title: <p>Account Disabled, Contact freshconn</p>,
						})
					if (e.code === 'auth/user-not-found')
						MySwal.fire({
							icon: 'error',
							title: <p>Account Does not exist</p>,
						})
				}
			)
		}
		if (mode === 'resetPassword') {
			verifyPasswordReset(mode, oobCode, set).then(
				() => {
					history.push('/welcome/reset')
				},
				(e) => {
					MySwal.fire({
						icon: 'error',
						title: <p>Code Expired, Reset your password again</p>,
					})
				}
			)
		}
	}, [location, history])
	if (user !== 'loading' && user) return <Redirect to="/" />
	return (
		<welcomeContext.Provider
			value={{
				params,
			}}
		>
			<WelcomeHeader />
			<Container>
				<Switch>
					<Route path={path + '/login'} exact component={Login} />
					<Route path={path + '/register'} exact component={Register} />
					<Route path={path + '/reset'} exact component={Reset} />
					<Route path={path} component={Login} />
				</Switch>
			</Container>
			<HowItWorks />
		</welcomeContext.Provider>
	)
}

export default Welcome
