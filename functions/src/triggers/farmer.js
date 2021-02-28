import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import Stripe from 'stripe'
import SendGrid from '@sendgrid/mail'

SendGrid.setApiKey(functions.config().sendgrid.key)
async function getAvailDriver(farmer, market) {
	let drivers = await admin
		.firestore()
		.collection('farmers')
		.doc(farmer)
		.collection('drivers')
		.get()

	if (!drivers.empty) {
		let availabilty = drivers.docs.map((driver) => ({
			ref: driver.ref,
			queue: driver.data().queue,
		}))
		availabilty.sort((p, n) => p.queue - n.queue)
		return availabilty[0].ref
	}
	return null
}

async function addDriversFromMarket(subscribedMarket) {
	const app = admin.app()
	let marketDriversRef = app
		.firestore()
		.collection('markets')
		.doc(subscribedMarket.id)
		.collection('drivers')
	let drivers = await marketDriversRef.get()
	let promises = []
	for (let driver of drivers.docs) {
		promises.push(
			subscribedMarket.collection('drivers').doc(driver.id).set(driver.data())
		)
	}
	await Promise.all(promises)
}
async function addProductsToMarket(farmer, market) {
	const app = admin.app()
	const marketRef = app.firestore().collection('markets').doc(market.id)
	const farmerRef = app.firestore().collection('farmers').doc(farmer)
	let snap = await farmerRef.get()
	let farmerData = snap.data()
	const productsSnapshot = await farmerRef
		.collection('products')
		.where('status', '==', true)
		.get()
	let promises = []
	promises.push(
		app
			.firestore()
			.collection('markets')
			.doc(market.id)
			.collection('farmers')
			.doc(farmer)
			.set({
				name: farmerData.name,
				producer: farmerData.story,
				ref: snap.ref,
			})
	)
	for (let product of productsSnapshot.docs) {
		let data = product.data()
		promises.push(
			marketRef.collection('products').doc(product.id).set({
				category: data.category,
				discount: data.discount,
				facts: data.facts,
				stock: data.inventory.stock,
				farmer: farmerData.name,
				image: data.image,
				metric: data.metric,
				name: data.name,
				price: data.price,
				producer: farmerData.story,
				description: data.description,
				ref: snap.ref,
			})
		)
	}
	await Promise.all(promises)
}
async function removeProductsFromMarket(farmer, market) {
	const app = admin.app()
	const marketRef = app.firestore().collection('markets').doc(market.id)
	const farmerRef = app.firestore().collection('farmers').doc(farmer)
	const productsSnapshot = await app
		.firestore()
		.collection('farmers')
		.doc(farmer)
		.collection('products')
		.get()
	let promises = []
	promises.push(
		app
			.firestore()
			.collection('markets')
			.doc(market.id)
			.collection('farmers')
			.doc(farmer)
			.delete()
	)
	for (let product of productsSnapshot.docs) {
		promises.push(marketRef.collection('products').doc(product.id).delete())
	}
	await Promise.all(promises)
}
async function writeToSubs(context, snap, data) {
	const app = admin.app()
	let marketsId = snap.docs.map((s) => s.id)
	let p = []
	let ref = app.firestore().collection('farmers').doc(context.params.farmerId)
	let fsnap = await ref.get()

	for (let m of marketsId) {
		p.push(
			app
				.firestore()
				.collection('markets')
				.doc(m)
				.collection('products')
				.doc(context.params.productId)
				.set({
					category: data.category,
					discount: data.discount,
					facts: data.facts,
					farmer: fsnap.data().name,
					image: data.image,
					metric: data.metric,
					stock: data.inventry.stock,
					name: data.name,
					price: data.price,
					producer: fsnap.data().story,
					description: data.description,
					ref: fsnap.ref,
				})
		)
	}
	return await Promise.all(p)
}
async function removeFromSubs(context, snap) {
	const app = admin.app()
	let marketsId = snap.docs.map((s) => s.id)
	let p = []
	for (let m of marketsId) {
		p.push(
			app
				.firestore()
				.collection('markets')
				.doc(m)
				.collection('products')
				.doc(context.params.productId)
				.delete()
		)
	}
	return await Promise.all(p)
}
const onNewProduct = functions.firestore
	.document('/farmers/{farmerId}/products/{productId}')
	.onCreate(async (changes, context) => {
		const app = admin.app()
		try {
			let snap = await app
				.firestore()
				.collection('farmers')
				.doc(context.params.farmerId)
				.collection('subscribed')
				.get()
			let message = await writeToSubs(context, snap, changes.data())
		} catch (e) {
			console.log('error occured at new' + e)
		}
	})

const onToggleProduct = functions.firestore
	.document('/farmers/{farmerId}/products/{productId}')
	.onUpdate(async (changes, context) => {
		const app = admin.app()
		let data = changes.after.data()
		let changed = changes.before.data().status !== data.status
		if (data.status === true) {
			try {
				console.log('updating')
				let snap = await app
					.firestore()
					.collection('farmers')
					.doc(context.params.farmerId)
					.collection('subscribed')
					.get()
				let message = await writeToSubs(context, snap, data)
			} catch (e) {
				console.log('error occured at adding ' + e)
			}
		} else if (changed) {
			try {
				console.log('removing')
				let snap = await app
					.firestore()
					.collection('farmers')
					.doc(context.params.farmerId)
					.collection('subscribed')
					.get()

				let message = await removeFromSubs(context, snap)
			} catch (e) {
				console.log('error occured at delete ' + e)
			}
		}
	})

const onNewOrder = functions.firestore
	.document('/farmers/{farmerId}/subscribed/{marketId}/orders/{orderId}')
	.onCreate(async (changes, context) => {
		let data = changes.data()
		const app = admin.app()
		app
			.firestore()
			.collection('farmers')
			.doc(context.params.farmerId)
			.collection('subscribed')
			.doc(context.params.marketId)
			.update({
				incomplete: admin.firestore.FieldValue.increment(1),
			})
		const farmerProfile = await app
			.firestore()
			.collection('farmers')
			.doc(context.params.farmerId)
			.get()
		const msg = {
			to: farmerProfile.data().email,
			cc: 'admin@foxolabs.com',
			from: 'admin@freshconn.com',
			subject: 'New order recived',
			html: `<p> you recived order from ${data.customer.name} of value ${data.total}</p>`,
		}
		await SendGrid.send(msg)
	})

const orderComplete = functions.firestore
	.document('/farmers/{farmerId}/subscribed/{marketId}/orders/{orderId}')
	.onUpdate(async (changes, context) => {
		if (!changes.before.data().completed && changes.after.data().completed) {
			const app = admin.app()
			let orderRef = app
				.firestore()
				.collection('admin')
				.doc('orders')
				.collection('active')
				.doc(context.params.orderId)
			await orderRef.update({
				completed: true,
			})
			let subscribedRef = app
				.firestore()
				.collection('farmers')
				.doc(context.params.farmerId)
				.collection('subscribed')
				.doc(context.params.marketId)
			await subscribedRef.update({
				incomplete: admin.firestore.FieldValue.increment(-1),
			})
		}
	})
const onMetricComplete = functions.firestore
	.document('/farmers/{farmerId}/subscribed/{marketId}/orders/{orderId}')
	.onUpdate(async (changes, context) => {
		if (!changes.before.data().state && changes.after.data().state) {
			const app = admin.app()
			let farmerOrder = changes.after.data()

			// TODO: Assume transfered
			// let paySnap = await app
			// 	.firestore()
			// 	.collection('farmers')
			// 	.doc(context.params.farmerId)
			// 	.collection('private')
			// 	.doc('payment')
			// 	.get()
			// const payment = paySnap.data()
			// const stripe = Stripe('sk_test_VPPsK2fcoKUVxinG5HJeK7q2')
			// try {
			// 	await stripe.transfers.create({
			// 		amount: Math.round((data.total - data.total * 0.1) * 100),
			// 		currency: 'usd',
			// 		destination: payment.stripe,
			// 		transfer_group: context.params.orderId,
			// 	})
			// } catch (e) {
			// 	console.log(e)
			// }

			// farmer -> admin  metric update
			let snap = await app
				.firestore()
				.collection('admin')
				.doc('orders')
				.collection('active')
				.doc(context.params.orderId)
				.get()
			let adminOrder = snap.data()

			for (let adminMarket of adminOrder.items) {
				if (adminMarket.id === context.params.marketId) {
					// assume driver here subsscribed to this market
					// order: market -> customer -> farm -> products, market -> farms -> customer -> products
					if (farmerOrder.delivery.type === 'home') {
						let driver = null // getAvailDriver()
						// check if order exists
						if (driver) {
							let driverOrder = await driver
								.collection('schedule')
								.doc(context.params.marketId)
								.collection('orders')
								.doc(context.params.orderId)
								.get()
							if (!driverOrder.exists)
								await driver
									.collection('schedule')
									.doc(context.params.marketId)
									.collection('orders')
									.doc(context.params.orderId)
									.set(farmerOrder)
						}
					}
					for (let adminProduct of adminMarket.products) {
						for (let farmerProduct of farmerOrder.items) {
							if (adminProduct.id === farmerProduct.id) {
								adminProduct.actual = farmerProduct.actual
								adminProduct.sum = farmerProduct.sum
								adminProduct.status = true
							}
						}
					}
				}
			}
			// find total again from adjusted
			let tsum = 0
			for (let m of adminOrder.items) {
				let sum = 0
				for (let p of m.products) {
					sum += p.sum
				}
				tsum += sum
			}
			adminOrder.sum = tsum
			adminOrder.total = tsum + adminOrder.fee + adminOrder.donation
			adminOrder.state.push(farmerOrder.state)

			await app
				.firestore()
				.collection('admin')
				.doc('orders')
				.collection('active')
				.doc(context.params.orderId)
				.set(adminOrder)
		}
	})

const onNewMarketSubscribe = functions.firestore
	.document('/farmers/{farmerId}/subscribed/{marketId}')
	.onCreate(async (changes, context) => {
		const app = admin.app()
		let marketRef = app
			.firestore()
			.collection('markets')
			.doc(context.params.marketId)
		let farmerRef = app
			.firestore()
			.collection('farmers')
			.doc(context.params.farmerId)
		let farmerSnapshot = await farmerRef.get()
		let farmer = farmerSnapshot.data()
		// add driver from market too
		let marketDrivers = await marketRef.collection('drivers').get()
		let promises = []
		for (let driver of marketDrivers.docs) {
			promises.push(
				changes.ref.collection('drivers').doc(driver.id).set(driver.data())
			)
		}
		promises.push(
			marketRef.collection('farmers').doc(context.params.farmerId).set({
				name: farmer.name,
				story: farmer.story,
				ref: farmerSnapshot.ref,
			})
		)
		await Promise.all(promises)
	})

const onMarketSubUpdate = functions.firestore
	.document('/farmers/{farmerId}/subscribed/{marketId}')
	.onUpdate(async (changes, context) => {
		let data = changes.after.data()
		if (data.status) {
			await addProductsToMarket(context.params.farmerId, changes.after.ref)
			//add drivers from market
			await addDriversFromMarket(changes.after.ref)
		} else {
			await removeProductsFromMarket(context.params.farmerId, changes.after.ref)
		}
	})
const addDriverToOrders = functions.firestore
	.document('/farmers/{farmerId}/subscribed/{marketId}/drivers/{driver}')
	.onCreate(async (changes, context) => {
		//get active orders and add driver to it
		const app = admin.app()
		let subscribedRef = app
			.firestore()
			.doc(
				`/farmers/${context.params.farmerId}/subscribed/${context.params.marketId}`
			)
		let ordersSnapshot = await subscribedRef
			.collection('orders')
			.where('completed', '==', false)
			.get()
		let promises = []
		let driver = changes.data()
		for (let order of ordersSnapshot.docs) {
			let data = order.data()
			// add driver only if doesnt not exist and on metrics completetion
			if (data.state && !data.driver) {
				promises.push(
					order.ref.update({
						driver,
					})
				)
			}
		}

		await Promise.all(promises)
	})
const removeDriverFromOrders = functions.firestore
	.document('/farmers/{farmerId}/subscribed/{marketId}/drivers/{driver}')
	.onDelete(async (changes, context) => {
		//
		// const app = admin.app()
		// let subscribedRef = app
		// 	.firestore()
		// 	.doc(
		// 		`/farmers/${context.params.farmerId}/subscribed/${context.params.marketId}`
		// 	)
		// let ordersSnapshot = await subscribedRef
		// 	.collection('orders')
		// 	.where('completed', '==', false)
		// 	.get()
	})
// const removeDrivertoSubscribed = functions.firestore
// .document('/farmers/{farmerId}/subscribed/{marketId}')
// .onDelete( async (changes, context) => {

// })

const deleteProduct = functions.firestore
	.document('/farmers/{farmerId}/products/{productId}')
	.onDelete(async (changes, context) => {
		const app = admin.app()
		let data = changes.data()
		// move into seperate 'deleted' collection
		await app
			.firestore()
			.collection('farmers')
			.doc(context.params.farmerId)
			.collection('deleted')
			.doc(context.params.productId)
			.set(data)
		// remove from markets
		let snap = await app
			.firestore()
			.collection('farmers')
			.doc(context.params.farmerId)
			.collection('subscribed')
			.get()

		await removeFromSubs(context, snap)
	})
const checkInventory = functions.firestore
	.document('/farmers/{farmerId}/products/{productId}')
	.onUpdate(async (changes, context) => {
		let data = changes.after.data()

		if (data.inventory.stock <= 0) {
			changes.after.ref.update({
				status: false,
			})
		}
		if (data.inventory.stock <= data.inventory.warning) {
			const app = admin.app()
			const farmerProfile = await app
				.firestore()
				.collection('farmers')
				.doc(context.params.farmerId)
				.get()
			const msg = {
				to: farmerProfile.data().email,
				cc: 'admin@foxolabs.com',
				from: 'admin@freshconn.com',
				subject: data.name + ' almost out of stock',
				html: `<p> Warning, stock for ${data.name} fell below warning level </p>`,
			}
			await SendGrid.send(msg)
		}
	})

export {
	checkInventory,
	onToggleProduct,
	onNewOrder,
	onMetricComplete,
	onNewMarketSubscribe,
	onMarketSubUpdate,
	addDriverToOrders,
	orderComplete,
	deleteProduct,
}
