import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './login.module.css'
import * as firebase from 'firebase/app'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Login({ view }) {
	const [state, set] = useState({})
	const [loading, load] = useState(false)
	const history = useHistory()
	const MySwal = withReactContent(Swal)
	function submitLogin(event) {
		event.preventDefault()
		load(true)
		firebase
			.auth()
			.signInWithEmailAndPassword(state.email, state.password)
			.then((suc) => {
				if (suc.user.emailVerified) history.push('/')
				else {
					suc.user.sendEmailVerification()
					MySwal.fire({
						icon: 'warning',
						title: <p>Verification mail has been sent again </p>,
						timer: 3000,
						onClose: () => {
							// firebase.auth().signOut()
						},
					})
				}
				load(false)
			})
			.catch((err) => {
				console.log(err)
				if (err.code === 'auth/user-not-found') {
					MySwal.fire({
						icon: 'warning',
						title: <p>Account does not exist</p>,
						timer: 2000,
						showConfirmButton: false,
					})
				}
				if (err.code === 'auth/invalid-email') {
					MySwal.fire({
						icon: 'warning',
						title: <p>Invalid email</p>,
						timer: 2000,
						showConfirmButton: false,
					})
				}
				if (err.code === 'auth/user-disabled') {
					MySwal.fire({
						icon: 'warning',
						title: <p>Account has been disabled, Contact freshconn</p>,
						timer: 2000,
						showConfirmButton: false,
					})
				}
				if (err.code === 'auth/wrong-password') {
					MySwal.fire({
						icon: 'warning',
						title: <p>Wrong Password</p>,
						timer: 2000,
						showConfirmButton: false,
					})
				}
				load(false)
			})
	}
	return (
		<React.Fragment>
			<form
				className={styles.logincont}
				onSubmit={(event) => {
					submitLogin(event)
				}}
			>
				<div className="field">
					<p className="control">
						<input
							className={`${styles.loginfield} input`}
							style={{ borderRadius: '5px' }}
							id="email"
							type="email"
							placeholder="Email"
							onChange={(event) => set({ ...state, email: event.target.value })}
						/>
					</p>
				</div>
				<div className="field">
					<p className="control">
						<input
							className={`${styles.loginfield} input`}
							style={{ borderRadius: '5px' }}
							id="password"
							type="password"
							placeholder="Password"
							onChange={(event) =>
								set({ ...state, password: event.target.value })
							}
						/>
					</p>
				</div>
				<div className="field">
					<p className="control">
						<button
							className={`${styles.loginfield} button`}
							type="submit"
							value="Submit"
							style={{
								borderRadius: '5px',
								backgroundColor: '#EF6C00',
								color: 'white',
								border: 'none',
							}}
							disabled={loading}
						>
							Login
						</button>
					</p>
				</div>
			</form>
			<div className="field" style={{ marginTop: '2vh' }}>
				<p className="control subtitle has-text-white has-text-centered">
					<span>Not a member?</span>{' '}
					<span
						style={{
							color: '#EF6C00',
							fontWeight: 'bold',
							cursor: 'pointer',
						}}
						role="button"
						tabIndex={0}
						onClick={() => {
							history.push('/welcome/register')
						}}
						onKeyDown={() => {
							history.push('/welcome/register')
						}}
					>
						Sign Up
					</span>{' '}
					<span> / </span>
					<span
						style={{
							color: '#7CB342',
							fontWeight: 'bold',
							cursor: 'pointer',
						}}
						role="button"
						tabIndex={0}
						onClick={() => {
							history.push('/welcome/reset')
						}}
						onKeyDown={() => {
							history.push('/welcome/reset')
						}}
					>
						Reset Password
					</span>
				</p>
			</div>
		</React.Fragment>
	)
}

export default Login
