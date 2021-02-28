import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import Stripe from 'stripe'
import cors from 'cors'
import express from 'express'
import SendGrid from '@sendgrid/mail'
SendGrid.setApiKey(
	'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'
)

let app = express()
app.use(
	cors({
		origin: true,
	})
)

const stripe = new Stripe(functions.config().stripe.key)
const endPoint = functions.config().stripe.endpoint

async function paymentHook(request, response) {
	const sig = request.get('stripe-signature')
	let event
	try {
		event = stripe.webhooks.constructEvent(
			request.rawBody.toString('utf8'),
			sig,
			endPoint
		)
	} catch (err) {
		console.log(err)
		console.log(err.code, err.code === 'auth/user-not-found')
		return response.status(400).end()
	}
	switch (event.type) {
		case 'payment_intent.succeeded': {
			const paymentIntent = event.data.object
			// get user
			const userSnap = await admin
				.firestore()
				.collection('users')
				.where('stripe_id', '==', paymentIntent.customer)
				.get()
			const user = await admin.auth().getUser(userSnap.docs[0].ref.id)

			// get its charges too
			const charges = paymentIntent.charges
			// get order id's from charges
			let order = {}
			for (let charge of charges.data) {
				order.id = charge.transfer_group
				order.paid = charge.paid
				order.receipt = charge.receipt_url
			}
			console.log(order)
			try {
				// update admin
				await admin
					.firestore()
					.collection('admin')
					.doc('orders')
					.collection('active')
					.doc(order.id)
					.update({
						paid: order.paid,
						payment: paymentIntent.id,
						receipt: order.receipt,
					})
			} catch (e) {
				console.log('Failed to update the order', e)
			}
			try {
				// update user
				await userSnap.docs[0].ref.collection('orders').doc(order.id).update({
					paid: order.paid,
					payment: paymentIntent.id,
					receipt: order.receipt,
				})
			} catch (e) {
				console.log('Failed to update the order', e)
			}
			const msg = {
				to: user.email,
				from: 'orders@freshcon.com',
				subject: 'Reciept for Order ' + order.id,
				html: `<p> Thank you ${user.displayName}  for ordering from Freshconn</p><p> Your receipt ${order.receipt}</p>`,
			}
			await SendGrid.send(msg)
			break
		}
		case 'payment_intent.payment_failed': {
			const paymentIntent = event.data.object
			// get user
			const userSnap = await admin
				.firestore()
				.collection('users')
				.where('stripe_id', '==', paymentIntent.customer)
				.get()
			const user = await admin.auth().getUser(userSnap.docs[0].ref.id)

			// get its charges too
			const charges = paymentIntent.charges
			// get order id's from charges
			let order = {}
			for (let charge of charges.data) {
				order.id = charge.transfer_group
				order.paid = charge.paid
			}
			console.log(order)
			try {
				// update admin
				await admin
					.firestore()
					.collection('admin')
					.doc('orders')
					.collection('active')
					.doc(order.id)
					.update({
						paid: order.paid,
						payment: paymentIntent.id,
					})
				// update user
				await userSnap.docs[0].ref.collection('orders').doc(order.id).update({
					paid: order.paid,
					payment: paymentIntent.id,
				})
			} catch (e) {
				console.log('Failed to update the order')
			}
			const msg = {
				to: user.email,
				from: 'orders@freshcon.com',
				subject: 'Reciept for Order ' + order.id,
				html: `<p> Payment failed for the the order </p>`,
			}
			await SendGrid.send(msg)
			break
		}
		// ... handle other event types
		default: {
			console.log(event.type)
			// Unexpected event type
			return response.status(400).end()
		}
	}

	response.json({ received: true })
}

app.post('/', paymentHook)
export default app
