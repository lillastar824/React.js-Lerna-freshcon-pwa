import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const onNewOrder = functions.firestore
	.document('/users/{userId}/orders/{orderId}')
	.onCreate(async (changes, context) => {
		const app = admin.app()
		try {
			await app
				.firestore()
				.collection('admin')
				.doc('orders')
				.collection('active')
				.doc(context.params.orderId)
				.set(changes.data())
		} catch (e) {
			console.log('error occured at new' + e)
		}
	})

const onCheckout = functions.firestore
	.document('/users/{userId}/orders/{orderId}')
	.onUpdate(async (changes, context) => {
		let data = changes.after.data()
		// Successfully charged
		if (!changes.before.data().paid && data.paid) {
			const app = admin.app()

			await app
				.firestore()
				.collection('admin')
				.doc('orders')
				.collection('active')
				.doc(context.params.orderId)
				.set(data)
			let farmers = new Set()
			// find all farmets
			for (let market of data.items) {
				for (let product of market.products) {
					farmers.add(product.ref)
				}
			}
			// For Farmers
			let promises = []
			for (let farmer of farmers) {
				let snap = await app
					.firestore()
					.collection('farmers')
					.doc(farmer)
					.collection('subscribed')
					.get()
				let subscribed = new Set(snap.docs.map((doc) => doc.id))
				let productInventory = new WeakMap()
				for (let market of data.items) {
					if (subscribed.has(market.id)) {
						let subscribedOrderRef = app
							.firestore()
							.collection('farmers')
							.doc(farmer)
							.collection('subscribed')
							.doc(market.id)
							.collection('orders')
							.doc(context.params.orderId)
						let newOrder = {
							customer: { ...data.customer },
							delivery: { ...market.delivery },
						}
						newOrder.orderedAt = data.state[0]
						newOrder.total = 0
						newOrder.items = []
						for (let product of market.products) {
							if (farmers.has(product.ref)) {
								productInventory.set(product.id, product.qty)
								newOrder.items.push({ status: false, ...product })
								newOrder.total += product.sum
								newOrder.completed = false
							}
						}

						promises.push(subscribedOrderRef.set(newOrder))
					}
				}
				for (let [id, qty] of productInventory) {
					let productRef = app
						.firestore()
						.collection('farmers')
						.doc(farmer)
						.collection('products')
						.doc(id)
					promises.push(
						app.firestore().runTransaction((transaction) => {
							return transaction.get(productRef).then((doc) => {
								let inventory = doc.data().inventory
								inventory.stock -= qty
								return transaction.update(productRef, {
									inventory,
								})
							})
						})
					)
				}
			}
			await Promise.all(promises)
		}
	})
export { onNewOrder, onCheckout }
