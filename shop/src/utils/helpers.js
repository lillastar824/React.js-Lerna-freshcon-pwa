import { useMedia } from 'react-use'
import firebase from 'firebase/app'

const days = [
	{ id: 0, day: 'Sunday' },
	{ id: 1, day: 'Monday' },
	{ id: 2, day: 'Tuesday' },
	{ id: 3, day: 'Wednesday' },
	{ id: 4, day: 'Thursday' },
	{ id: 5, day: 'Friday' },
	{ id: 6, day: 'Saturday' },
]
function CheckMedia(props) {
	const wide = useMedia('(min-width: 576px')
	return props.children({
		wide,
	})
}
function getDeliveryDate(market) {
	const day = market.day
	// const closing = market.close
	const now = new Date()
	const today = now.getDay()
	let result = new Date(now)
	if (today + 2 >= day) {
		result.setDate(result.getDate() + (day - today))
		result.setDate(result.getDate() + 7)
	} else {
		// calculate date from day of the market
		result.setDate(result.getDate() + (day - today))
	}
	const dtf = new Intl.DateTimeFormat('en-US')
	return `Delivery Date: ${dtf.format(result)}`
}

function getPrice(number) {
	let formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	})
	return formatter.format(number + number * 0.1)
}

function getActualPrice(number) {
	let formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	})
	return formatter.format(number)
}

function perOff(price, off) {
	return price - discounted(price, off)
}

function discounted(price, off) {
	return price * (off / 100)
}

function getOriginalTotal(items) {
	let total = 0
	for (let m of items) {
		for (let p of m.products) {
			total += p.qty * (p.discount ? perOff(p.price, p.discount) : p.price)
		}
	}
	return total
}

async function pay({ order, card, stripe, secret, update }) {
	const { uid } = firebase.auth().currentUser
	// check stock
	let doc = {
		...order,
		state: [new Date()],
		completed: false,
		fee: order.sum * 0.1,
	}
	let orderRef = null
	try {
		orderRef = await firebase
			.firestore()
			.collection('users')
			.doc(uid)
			.collection('orders')
			.add(doc)
	} catch (e) {
		firebase.analytics().logEvent('missing ref in product')
	}
	let variables = {
		// order: Array.from(crypto.getRandomValues(new Uint8Array(20)), b =>
		// 	('0' + b.toString(16)).slice(-2)
		// ).join(''),
		order: orderRef.id,
		amount: order.total,
		fees: order.sum * 0.1,
	}
	try {
		let { paymentIntent } = await stripe.retrievePaymentIntent(secret)
		variables.intent = paymentIntent.id
		await update({
			variables,
		})
	} catch (e) {
		firebase.analytics().logEvent('failed to update order id')
		console.log('order updateing failed', e)
	}
	try {
		let response = await stripe.confirmCardPayment(secret, {
			payment_method: card,
			setup_future_usage: 'on_session',
		})
		if (
			response.paymentIntent &&
			response.paymentIntent.status === 'succeeded'
		) {
			await firebase
				.firestore()
				.collection('users')
				.doc(uid)
				.collection('orders')
				.doc(orderRef.id)
				.update({
					transaction: response.paymentIntent.id,
					paid: true,
				})
			firebase.analytics().logEvent('payment sucess')
			return response.paymentIntent.status
		}
	} catch (e) {
		console.log(e)
		firebase
			.analytics()
			.logEvent(
				'failed to confirm order' +
					e.paymentIntent.id +
					' status ' +
					e.paymentIntent.status
			)
		return 'failed'
	}
}

export {
	pay,
	CheckMedia,
	getDeliveryDate,
	getPrice,
	getActualPrice,
	days,
	perOff,
	discounted,
	getOriginalTotal,
}
