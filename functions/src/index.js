import * as functions from 'firebase-functions'
import graphQLserver from './graphql/graphql_server'
import * as admin from 'firebase-admin'
import app from './func/driver'
import hook from './func/stripe'
import * as triggers from './triggers'
admin.initializeApp()
const server = graphQLserver()

const api = functions
	.runWith({
		timeoutSeconds: 540,
		memory: '512MB',
	})
	.https.onRequest(server)

const schedule = functions.pubsub
	.schedule('every monday 01:00')
	.onRun(async (context) => {
		console.log('starting schedules')
		const app = admin.app()
		const db = app.firestore()
		const farmers_collection_snapshot = await db.collection('farmers').get()
		const toUpdate = []
		for (let farmer_ref of farmers_collection_snapshot.docs) {
			let products = await farmer_ref.ref.collection('products').get()
			for (let product of products.docs) {
				let data = product.data()
				let inventory = data.inventory
				if (data.enabled && inventory.auto) {
					toUpdate.push(
						product.ref.update({
							inventory: {
								...inventory,
								stock: inventory.stock + inventory.amount,
							},
						})
					)
				}
			}
		}
		await Promise.all(toUpdate)

		console.log('schedules over')
	})
const driverCheck = functions.https.onRequest(app)
const payments = functions.https.onRequest(hook)
//api
export { api }
// trigger
export { triggers }
//functions
export { driverCheck }
//schedule
export { schedule }
// stripe payment
export { payments }
