import React, { useState } from 'react'
import { useContext } from 'react'
import { welcomeContext } from '../Pages/Welcome'
import firebase from 'firebase/app'
import classes from './login.module.css'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Email() {
	const [email, set] = useState('')
	const [message, raise] = useState(null)
	return (
		<form
			className={classes.logincont}
			onSubmit={async (e) => {
				e.preventDefault()
				try {
					if (email.length > 0) {
						await firebase.auth().sendPasswordResetEmail(email)
						raise(2)
					}
				} catch (e) {
					if (e.code === 'auth/user-not-found') raise(1)
				}
			}}
		>
			<p style={{ fontWeight: 'bolder', color: 'white', marginBottom: '1em' }}>
				Enter to your email to send reset link{'\n'}
			</p>
			<span className="field">
				<span className="control">
					<input
						className={`${classes.loginfield} input`}
						style={{
							borderRadius: '5px',
							marginBottom: '1em',
						}}
						value={email}
						id="email"
						type="email"
						placeholder="Email"
						onChange={(event) => set(event.target.value)}
					/>
				</span>
			</span>
			{message === 2 && (
				<article class="message is-link">
					<div class="message-header">
						<p>Email Sent</p>
						<button class="delete" aria-label="delete"></button>
					</div>
					<div class="message-body">Check your mail for reset link</div>
				</article>
			)}
			{message === 1 && (
				<article class="message is-warning">
					<div class="message-header">
						<p>Warning</p>
						<button class="delete" aria-label="delete"></button>
					</div>
					<div class="message-body">Account does not exist</div>
				</article>
			)}
			<span className={'field '}>
				<span className={'control '}>
					<button
						className={`${classes.loginfield} button`}
						type="submit"
						value="Submit"
						style={{
							borderRadius: '5px',
							backgroundColor: '#EF6C00',
							color: 'white',
							border: 'none',
						}}
					>
						Send Link
					</button>
				</span>
			</span>
		</form>
	)
}

function Password({ oobCode, mail }) {
	const [state, set] = useState({})
	const history = useHistory()
	const MySwal = withReactContent(Swal)
	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault()
				if (state.password === state.confirm) {
					await firebase.auth().confirmPasswordReset(oobCode, state.confirm)
					MySwal.fire({
						icon: 'success',
						text: 'Password changed',
						confirmButtonText: 'Go to login',
						onClose: () => {
							history.push('/welcome/login')
						},
					}).then(() => {
						history.push('/welcome/login')
					})
				}
			}}
		>
			<div className="field">
				<p className="control">
					<input
						className={`input`}
						style={{ borderRadius: '5px' }}
						id="password"
						type="password"
						placeholder="New Password"
						onChange={(event) =>
							set({ ...state, password: event.target.value })
						}
					/>
				</p>
			</div>
			<div className="field">
				<p className="control">
					<input
						className={` input`}
						style={{ borderRadius: '5px' }}
						id="cPassword"
						type="password"
						placeholder="Confirm Password"
						onChange={(event) => set({ ...state, confirm: event.target.value })}
					/>
				</p>
			</div>

			{/* {!state.mailverify && <h1>Please verify your email</h1>} */}
			<div
				className="field"
				style={{
					display: 'flex',
					placeContent: 'center',
				}}
			>
				<p className="control">
					<button
						className={` button`}
						type="submit"
						value="Submit"
						style={{
							borderRadius: '5px',
							backgroundColor: '#EF6C00',
							color: 'white',
							border: 'none',
						}}
					>
						Reset Password
					</button>
				</p>
			</div>
		</form>
	)
}

function ResetPassword() {
	const context = useContext(welcomeContext)
	if (context.params.mode)
		return (
			<Password oobCode={context.params.oobCode} mail={context.params.mail} />
		)
	return <Email />
}

export default ResetPassword
