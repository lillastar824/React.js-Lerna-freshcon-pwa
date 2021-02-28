import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Button } from '@material-ui/core'
import firebase from 'firebase/app'
import classes from './login.module.css'
// Replace these with custom material-ui textfields
import Input from 'react-phone-number-input/input'
import OtpInput from 'react-otp-input'

const styles = makeStyles(theme => ({
	root: {
		background: 'url(/berry.jpg)',
		height: '100vh',
	},
	phone: {
		borderRadius: 6,
	},
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		placeContent: 'center',
		placeItems: 'center',
	},
}))

function OTP({ length }) {
	const [code, change] = useState()

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			await window.confirmationResult.confirm(code)
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<form onSubmit={handleSubmit}>
			<OtpInput
				containerStyle={classes.codeInput}
				name="code"
				onChange={otp => change(otp)}
				value={code}
				numInputs={6}
				separator={<span>-</span>}
			/>
			<Button variant="contained" color="primary" type="submit">
				Send
			</Button>
		</form>
	)
}
function Phone({ onComplete }) {
	const [phone, change] = useState('')
	const handleChange = value => {
		change(value)
	}
	async function handleSubmit(e) {
		e.preventDefault()
		// check if driver exist
		let result = { exist: false }
		try {
			let response = await fetch(`${process.env.REACT_APP_DRIVER_CHECK}`, {
				method: 'POST',
				body: phone,
			})
			result = await response.json()
		} catch (e) {
			if (process.env.NODE_ENV === 'development') result.exist = true
			console.log('cannot check driver', e)
		}
		if (result.exist) {
			try {
				window.confirmationResult = await firebase
					.auth()
					.signInWithPhoneNumber(phone, window.recaptchaVerifier)
				onComplete(1)
			} catch (error) {
				console.log(error.message)
			}
		} else {
			throw Error('not authorized')
		}
	}
	return (
		<form onSubmit={handleSubmit}>
			<Input
				className={classes.input}
				country="US"
				international
				placeholder="Enter mobile number"
				name="phone"
				value={phone}
				onChange={handleChange}
			/>
			<Button variant="contained" color="primary" type="submit">
				Send
			</Button>
		</form>
	)
}

function Login() {
	const style = styles()
	const [view, set] = useState(0)
	function change(n) {
		set(n)
	}
	useEffect(() => {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('login', {
			size: 'invisible',
			callback: function(response) {
				// reCAPTCHA solved, allow signInWithPhoneNumber.
				console.log('allowed', response)
			},
		})
	}, [])

	return (
		<div className={style.root}>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Driver | Login</title>
			</Helmet>
			<span id="login" style={{ display: 'none' }}></span>
			<Container
				maxWidth="sm"
				classes={{
					root: style.container,
				}}
			>
				{view === 0 ? <Phone onComplete={change} /> : <OTP />}
			</Container>
		</div>
	)
}

export default Login
