import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { ref } from 'firebase-functions/lib/providers/database'
import path from 'path'

// const orderComplete = functions.firestore
// 	.document('/admin/{adminId}/orders/{adminId}')
// 	.onUpdate(async (changes, context) => {})

const onFarmerComplete = functions.firestore
	.document('/admin/orders/active/{orderId}')
	.onUpdate(async (changes, context) => {
		let data = changes.after.data()
		if (data.state.length === 2) {
			await data.customer.ref
				.collection('orders')
				.doc(context.params.orderId)
				.update({
					total: data.total,
					sum: data.sum,
					items: data.items,
					state: data.state,
				})
		}
	})
const onOrderComplete = functions.firestore
	.document('/admin/orders/active/{orderId}')
	.onUpdate(async (changes, context) => {
		if (!changes.before.data().completed && changes.after.data().completed) {
			let data = changes.after.data()
			await data.customer.ref
				.collection('orders')
				.doc(context.params.orderId)
				.update({
					completed: true,
				})
		}
	})
const onDriverComplete = functions.firestore
	.document('/admin/orders/active/{orderId}')
	.onUpdate(async (changes, context) => {
		let data = changes.after.data()
		if (data.state.length === 3) {
			await data.customer.ref
				.collection('orders')
				.doc(context.params.orderId)
				.update({
					state: data.state,
				})
		}
	})

const onDriverAddToMarket = functions.firestore
	.document('/markets/{marketId}/drivers/{driver}')
	.onCreate(async (changes, context) => {
		const app = admin.app()
		let snapshot = await app
			.firestore()
			.collection('markets')
			.doc(context.params.marketId)
			.collection('farmers')
			.get()
		let farmers = snapshot.docs.map((doc) => doc.id)
		let promises = []
		for (let farmer of farmers) {
			let farmerDriversRef = app
				.firestore()
				.collection('farmers')
				.doc(farmer)
				.collection('subscribed')
				.doc(context.params.marketId)
				.collection('drivers')
			promises.push(
				farmerDriversRef.doc(context.params.driver).set({
					...changes.data(),
				})
			)
		}
		await Promise.all(promises)
	})
const onDriverRemoveFromMarket = functions.firestore
	.document('/markets/{marketId}/drivers/{driverId}')
	.onDelete(async (changes, context) => {
		const app = admin.app()
		let snapshot = await app
			.firestore()
			.collection('markets')
			.doc(context.params.marketId)
			.collection('farmers')
			.get()
		let farmers = snapshot.docs.map((doc) => doc.id)
		let promises = []
		for (let farmer of farmers) {
			let farmerDriversRef = app
				.firestore()
				.collection('farmers')
				.doc(farmer)
				.collection('subscribed')
				.doc(context.params.marketId)
				.collection('drivers')
			promises.push(farmerDriversRef.doc(context.params.driverId).delete())
		}
		await Promise.all(promises)
	})

const onNewStockImage = functions.storage
	.object()
	.onFinalize(async (object, context) => {
		const file = path.parse(object.name)
		if (file.dir === 'stock') {
			console.log(path.basename(object.name))
			const app = admin.app()
			return app
				.firestore()
				.collection('admin')
				.doc('images')
				.collection('stock')
				.add({ name: path.basename(object.name) })
		} else {
			return console.log('not a original image')
		}
	})

const onFarmerUnSub = functions.firestore
	.document('/markets/{marketId}/farmers/{farmerId}')
	.onDelete(async (changes, context) => {
		const app = admin.app()
		const subscribedRef = app
			.firestore()
			.collection('farmers')
			.doc(context.params.farmerId)
			.collection('markets')
		// remove drivers from subscribed too
	})
export {
	onFarmerComplete,
	onDriverComplete,
	onDriverAddToMarket,
	onDriverRemoveFromMarket,
	onNewStockImage,
	onFarmerUnSub,
	onOrderComplete,
}
