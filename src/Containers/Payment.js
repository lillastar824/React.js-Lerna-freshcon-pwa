import { Button, Grid } from '@material-ui/core'
import firebase from 'firebase/app'
import gql from 'graphql-tag'
import { parse } from 'query-string'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-apollo'
import Stripe from '../Components/FarmerDetail'
import { styles } from './Boarding'

const mutation = gql`
	mutation($acc: String, $farmer: String) {
		stripeComplete(farmer: $farmer, acc: $acc) {
			result
		}
	}
`
export function Payment({ next, farmer, location }) {
	const [stripeComplete] = useMutation(mutation)
	const [token] = useState(window.crypto.getRandomValues(new Uint32Array(1))[0])
	const [stripe, set] = useState(false)
	const classes = styles()
	const { email } = firebase.auth().currentUser
	useEffect(() => {
		let q = parse(location.search)

		const { uid } = firebase.auth().currentUser
		if (q.state === sessionStorage.getItem('state')) {
			stripeComplete({
				variables: {
					acc: q.code,
					farmer: uid,
				},
			})
				.then(response => {
					next()
				})
				.catch(e => console.log('gql error:' + e))
		} else {
			sessionStorage.setItem('state', token)
		}
		firebase
			.firestore()
			.collection('farmers')
			.doc(uid)
			.collection('private')
			.doc('payment')
			.get()
			.then(snap => {
				if (snap.exists) set(snap.data())
			})
	}, [token, location, next, stripeComplete])
	useEffect(() => {}, [stripe])

	if (stripe)
		return (
			<Grid container spacing={2} justify="center">
				<Grid item>
					{/* <a href={'http://localhost:3000/onboarding?state=' + token}>M</a> */}
					<Stripe id={stripe.stripe} />
					<Button onClick={next}>NEXT</Button>
				</Grid>
			</Grid>
		)
	else
		return (
			<Grid container spacing={2} justify="center">
				<Grid item>
					Get direct deposit Freshconn partners with Stripe for fast, secure
					payments and direct deposit. Click the Stripe button to start or edit
					the direct deposit information
				</Grid>
				<Grid item>
					<a
						// href={`http://localhost:3000/profile?state=${this.state.token}`}
						href={`https://connect.stripe.com/express/oauth/authorize?client_id=${process.env.REACT_APP_FIREBASE_FARMER_CONNECT}&redirect_uri=${process.env.REACT_APP_STRIPE_REDIRECT_URL}&stripe_user[email]=${email}&state=${token}&stripe_user[country]=US&stripe_user[url]=${farmer.url}&stripe_user[phone_number]=${farmer.phone}&stripe_user[business_name]=${farmer.name}&stripe_user[zip]=${farmer.zipcode}`}
					>
						<img
							className={classes.stripe}
							src="/stripe.png"
							alt="connect with stripe"
						/>
					</a>
				</Grid>
			</Grid>
		)
}
