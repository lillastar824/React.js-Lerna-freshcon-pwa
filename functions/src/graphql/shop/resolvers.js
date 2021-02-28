import firebase from 'firebase-admin'

export default {
	Query: {
		async listAllCards(_, arg, { stripe, ids }) {
			const paymentMethods = await stripe.paymentMethods.list({
				customer: ids.stripe,
				type: 'card',
			})
			return paymentMethods.data.map((o) => ({ id: o.id, ...o.card }))
		},
		async getDefaultCard(_, arg, { stripe, ids }) {
			let customer = await stripe.customers.retrieve(ids.stripe)
			try {
				if (customer && customer.invoice_settings.default_payment_method) {
					let pm = await stripe.paymentMethods.retrieve(
						customer.invoice_settings.default_payment_method
					)
					return { id: pm.id, ...pm.card }
				} else {
					return { id: null }
				}
			} catch (e) {
				return { id: null }
			}
		},
		async setupCard(_, arg, { stripe, ids }) {
			const intent = await stripe.setupIntents.create()
			return intent.client_secret
		},
	},
	Mutation: {
		async preOrder(_, order, { db, ids }) {
			//Add to admin and user
			let adminOrder = await db
				.collection('admin')
				.doc('2y1PKufuheS450gAjv5ENa0ZU4l1')
				.add(order)
			await db.collection('users').doc(adminOrder.id).set(order)

			return {
				result: adminOrder.id,
			}
		},
		async process(_, { order, id }, { ids, db }) {
			let newOrder = {
				customer: { ...order.customer },
				delivery: { ...order.delivery },
				total: 0,
				items: [],
			}
			let farmers = new Set()
			// find all farmets
			for (let market of order.items) {
				for (let product of market) {
					farmers.add(product.farmer)
				}
			}
			// For Farmers
			let promises = []
			for (let farmer of farmers) {
				let snap = await farmer.collection('subscribed').get()
				let subscribed = new Set(snap.docs.map((doc) => doc.id))
				for (let market of order.items) {
					if (subscribed.has(market.ref)) {
						let subscribedOrderRef = farmer
							.collection('subscribed')
							.doc(market.ref)
							.collection('orders')
							.doc(id)
						newOrder.total = 0
						newOrder.items = []
						for (let product of market) {
							if (farmers.has(product.farmer)) {
								newOrder.items.push(product)
								newOrder.total += product.total
							}
						}
						promises.push(subscribedOrderRef.set(newOrder))
					}
				}
			}
			await Promise.all(promises)
			return {
				result: 'end',
			}
		},
		async addCard(_, arg, { stripe, ids }) {
			let pm = await stripe.paymentMethods.attach(arg.token, {
				customer: ids.stripe,
			})
			return { id: pm.id, ...pm.card }
		},
		async setDefaultCard(_, arg, { stripe, ids }) {
			let cus = await stripe.customers.update(ids.stripe, {
				invoice_settings: {
					default_payment_method: arg.source !== 'none' ? arg.source : null,
				},
			})

			return true
		},
		async deleteCard(_, arg, { stripe }) {
			await stripe.paymentMethods.detach(arg.id)
			return true
		},
		async checkout(_, arg, { ids, stripe, db }) {
			//check order total if correct total is correct
			try {
				let intent = await stripe.paymentIntents.create({
					amount: Math.round(arg.amount * 100),
					currency: 'usd',
					confirm: true,
					setup_future_usage: 'on_session',
					transfer_group: arg.order,
				})
				return {
					secret: intent.client_secret,
					status: intent.status,
				}
			} catch (e) {
				let intent = e.payment_intent
				return {
					secret: intent.client_secret,
					status: intent.status,
				}
			}
		},
		async setupIntent(_, arg, { stripe, ids }) {
			//check order total if correct total is correct
			try {
				let intent = await stripe.paymentIntents.create({
					amount: Math.round(arg.amount * 100),
					customer: ids.stripe,
					currency: 'usd',
					payment_method_types: ['card'],
				})
				return {
					secret: intent.client_secret,
					status: intent.status,
				}
			} catch (e) {
				let intent = e.payment_intent
				return {
					secret: intent.client_secret,
					status: intent.status,
				}
			}
		},
		async updateIntent(_, arg, { stripe, ids }) {
			try {
				let intent = await stripe.paymentIntents.update(arg.intent, {
					amount: Math.round(arg.amount * 100),
					transfer_group: arg.order,
				})
				console.log(arg.intent, intent.id)
				return {
					secret: intent.client_secret,
					status: intent.status,
				}
			} catch (e) {
				let intent = e.payment_intent
				return {
					secret: intent.client_secret,
					status: intent.status,
				}
			}
		},
	},
}
