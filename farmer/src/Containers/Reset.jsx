import React, { useState } from 'react'
import { useContext } from 'react'
import { welcomeContext } from './Welcome'
import firebase from 'firebase/app'
import classes from './reset.module.css'
import { useHistory } from 'react-router-dom'
import { Button, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useSnackbar } from 'notistack'

function Email() {
	const [email, set] = useState('')
	const [message, raise] = useState(null)
	console.log(process.env.PUBLIC_URL)
	return (
		<form
			className={classes.logincont}
			onSubmit={async e => {
				e.preventDefault()
				try {
					if (email.length > 0) {
						let s = await firebase.auth().sendPasswordResetEmail(email, {
							url: 'localhost',
						})
						console.log(s)
						raise(2)
					}
				} catch (e) {
					if (e.code === 'auth/user-not-found') raise(1)
				}
			}}
		>
			<Typography variant="subtitle1">
				Enter your email to reset your passowrd
			</Typography>
			<span className="field">
				<span className="control">
					<TextField
						color="primary"
						className={`${classes.loginfield} input`}
						style={{
							borderRadius: '5px',
							marginBottom: '1em',
						}}
						value={email}
						id="email"
						type="email"
						placeholder="Email"
						onChange={event => set(event.target.value)}
					/>
				</span>
			</span>
			{message === 2 && (
				<Alert severity="success"> Email Sent, Check your email</Alert>
			)}
			{message === 1 && (
				<Alert severity="warning">Account does not exist</Alert>
			)}
			<span className={'field '}>
				<span className={'control '}>
					<Button
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
					</Button>
				</span>
			</span>
		</form>
	)
}

function Password({ oobCode, mail }) {
	const [state, set] = useState({})
	const history = useHistory()
	const snack = useSnackbar()
	return (
		<form
			className={classes.logincont}
			onSubmit={async event => {
				event.preventDefault()
				if (state.password === state.confirm) {
					await firebase.auth().confirmPasswordReset(oobCode, state.confirm)
					snack.enqueueSnackbar('Password Changed', {
						variant: 'success',
						onClose: () => {
							history.push('/welcome/login')
						},
					})
				}
			}}
		>
			<div className="field">
				<p className="control">
					<TextField
						className={`input`}
						style={{ borderRadius: '5px' }}
						id="password"
						type="password"
						placeholder="New Password"
						onChange={event => set({ ...state, password: event.target.value })}
					/>
				</p>
			</div>
			<div className="field">
				<p className="control">
					<TextField
						className={` input`}
						style={{ borderRadius: '5px' }}
						id="cPassword"
						type="password"
						placeholder="Confirm Password"
						onChange={event => set({ ...state, confirm: event.target.value })}
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
					<Button
						color="primary"
						className={` Button`}
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
					</Button>
				</p>
			</div>
		</form>
	)
}

function ResetPassword() {
	const context = useContext(welcomeContext)
	return (
		<section
			className={classes.container}
			style={{
				backgroundColor: 'white',
			}}
		>
			{context.params.mode ? (
				<Password oobCode={context.params.oobCode} mail={context.params.mail} />
			) : (
				<Email />
			)}
		</section>
	)
}

export default ResetPassword
