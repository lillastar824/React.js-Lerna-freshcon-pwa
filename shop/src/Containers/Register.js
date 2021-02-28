import React, { useState } from 'react'
import ErrorAlert from '../Components/ErrorAlert'
import styles from './register.module.css'
import * as firebase from 'firebase/app'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useHistory } from 'react-router-dom'

function Register({ view }) {
	const [state, set] = useState({})
	const [loading, load] = useState(false)
	const MySwal = withReactContent(Swal)
	const history = useHistory()
	function isValid() {
		if (
			state.email === '' ||
			state.password === '' ||
			state.confirmPassword === ''
		) {
			set({
				...state,
				error: 'Please enter in all fields',
			})
			return false
		}

		if (state.password !== state.confirmPassword) {
			set({
				...state,
				error: 'Please make sure your passwords match',
			})
			return false
		}

		return true
	}

	async function submitAccount(event) {
		event.preventDefault()
		load(true)
		if (!isValid()) {
			load(false)
			return
		}
		try {
			let result = await firebase
				.auth()
				.createUserWithEmailAndPassword(state.email, state.password)
			const user = result.user
			await user.updateProfile({
				displayName: state.displayName,
			})
			await user.sendEmailVerification()
			MySwal.fire({
				title: (
					<p>
						Verification email has been sent to your account. Please verify and
						continue
					</p>
				),
				timer: 2000,
				showConfirmButton: false,
				onClose: () => {
					history.push('/welcome/login')
				},
			})
		} catch (e) {
			if (e.code === 'auth/email-already-in-use') {
				MySwal.fire({
					icon: 'warning',
					title: <p>Account already exist, try reseting your password</p>,
					timer: 2000,
					showConfirmButton: false,
					onClose: () => {
						history.push('/welcome/login')
					},
				})
			}
			if (e.code === 'auth/invalid-email') {
				MySwal.fire({
					icon: 'warning',
					title: <p>Invalid Email</p>,
					timer: 2000,
					showConfirmButton: false,
				})
			}
			if (e.code === 'auth/weak-password') {
				MySwal.fire({
					icon: 'warning',
					title: <p>Weak Password</p>,
					timer: 2000,
					showConfirmButton: false,
				})
			}
			load(false)
			firebase.analytics().logEvent('registration failed')
		}
	}
	return (
		<React.Fragment>
			<form
				className={styles.registercont}
				onSubmit={(event) => submitAccount(event)}
			>
				<div className="field">
					<p className="control">
						<input
							className={`${styles.registerfield} input`}
							style={{ borderRadius: '5px' }}
							id="name"
							type="text"
							placeholder="Name"
							onChange={(event) =>
								set({ ...state, displayName: event.target.value })
							}
						/>
					</p>
				</div>
				<div className="field">
					<p className="control">
						<input
							className={`${styles.registerfield} input`}
							style={{ borderRadius: '5px' }}
							id="email"
							type="text"
							placeholder="Email"
							onChange={(event) => set({ ...state, email: event.target.value })}
						/>
					</p>
				</div>
				<div className="field">
					<p className="control">
						<input
							className={`${styles.registerfield} input`}
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
						<input
							className={`${styles.registerfield} input`}
							style={{ borderRadius: '5px' }}
							id="confirm-password"
							type="password"
							placeholder="Confirm Password"
							onChange={(event) =>
								set({ ...state, confirmPassword: event.target.value })
							}
						/>
					</p>
				</div>
				{state.error && <ErrorAlert>Please fill all the fields</ErrorAlert>}
				<div className="field">
					<p className="control">
						<button
							className={`${styles.registerfield} button`}
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
							Register
						</button>
					</p>
				</div>
			</form>
			<div className="field" style={{ marginTop: '2vh' }}>
				<p className="control subtitle has-text-centered has-text-white">
					<span>Already a member?</span>
					&nbsp;
					<span
						style={{ color: '#EF6C00', fontWeight: 'bold', cursor: 'pointer' }}
						role="button"
						tabIndex={0}
						onKeyDown={() => {
							history.push('/welcome/login')
						}}
						onClick={() => {
							history.push('/welcome/login')
						}}
					>
						Sign In
					</span>
				</p>
			</div>
		</React.Fragment>
	)
}

export default Register
