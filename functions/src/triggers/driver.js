import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
const onNewOrder = functions.firestore
	.document('drivers/{driverId}/schedule/{marketId}/orders/{orderId}')
	.onCreate(async (changes, context) => {
		await changes.ref.update({
			state: admin.firestore.FieldValue.delete(),
		})
	})

const onOrderPickup = functions.firestore
	.document('drivers/{driverId}/schedule/{marketId}/orders/{orderId}')
	.onUpdate(async (changes, context) => {
		if (!changes.before.data().state && changes.after.data().state) {
			const app = admin.app()
			await app
				.firestore()
				.collection('admin')
				.doc('orders')
				.collection('active')
				.doc(context.params.orderId)
				.update({
					state: admin.firestore.FieldValue.arrayUnion(
						changes.after.data().state
					),
				})
		}
	})

const onSubscribe = functions.firestore
	.document('drivers/{driverId}/schedule/{marketId}')
	.onCreate(async (changes, context) => {
		const app = admin.app()
		let driverRef = app
			.firestore()
			.collection('drivers')
			.doc(context.params.driverId)
		const snap = await driverRef.get()
		let driver = snap.data()
		let marketDriversRef = app
			.firestore()
			.collection('markets')
			.doc(context.params.marketId)
			.collection('drivers')
		await marketDriversRef.doc(context.params.driverId).set({
			name: driver.name,
			image: '',
			ref: snap.ref,
		})
	})
const onUnSubscribe = functions.firestore
	.document('drivers/{driverId}/schedule/{marketId}')
	.onDelete(async (changes, context) => {
		const app = admin.app()
		let marketDriverRef = app
			.firestore()
			.collection('markets')
			.doc(context.params.marketId)
			.collection('drivers')
			.doc(context.params.driverId)
		await marketDriverRef.delete()
	})
export { onNewOrder, onOrderPickup, onSubscribe, onUnSubscribe }
