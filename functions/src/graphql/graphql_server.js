import express from 'express'
import cors from 'cors'
import { ApolloServer, ApolloError } from 'apollo-server-express'
import shop from './shop'
import farmer from './farmer'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import Stripe from 'stripe'

const routes = [
	'http://localhost:3000',
	'https://farmer.freshconn.com',
	'https://freshconn.com',
	'https://driver.freshconn.com',
	'https://shop.freshconn.com',
	'https://freshconn-develop.web.app',
]

function server() {
	const app = express()
	app.use(
		cors({
			origin: (origin, call) => {
				if (routes.indexOf(origin) !== -1) call(null, true)
				else call(new Error('not allowed'))
			},
			credentials: true,
		})
	)
	const graphqlServer = new ApolloServer({
		typeDefs: [shop.schema, farmer.schema],
		resolvers: [shop.resolvers, farmer.resolvers],
		introspection: true,
		uploads: { maxFileSize: 10000000, maxFiles: 10 },
		context: async ({ req }) => {
			// user represents firbease user
			let user = null
			try {
				let token = await admin.auth().verifyIdToken(req.headers.token)
				user = await admin.auth().getUser(token.uid)
			} catch (err) {
				console.log(err)
				throw new ApolloError('Invalid Auth')
			}
			const app = admin.app()
			const db = app.firestore()
			let ids = { user: user.uid }
			const stripe = new Stripe(functions.config().stripe.key)
			if (req.headers.type === 'users') {
				const snap = await db.collection(req.headers.type).doc(user.uid).get()
				let data = snap.data()
				if (!snap.exists || !('stripe_id' in data)) {
					let cus = await stripe.customers.create({
						email: user.email,
						name: user.displayName,
					})
					if (snap.exists)
						await db.collection(req.headers.type).doc(user.uid).update({
							stripe_id: cus.id,
						})
					else
						await db.collection(req.headers.type).doc(user.uid).set({
							stripe_id: cus.id,
						})
				}
				ids.usr = {
					...data,
				}
				ids.stripe = data.stripe_id
			}
			return {
				ids,
				stripe,
				app,
				db,
			}
		},
	})
	graphqlServer.applyMiddleware({ app, path: '/' })

	return app
}
export default server
