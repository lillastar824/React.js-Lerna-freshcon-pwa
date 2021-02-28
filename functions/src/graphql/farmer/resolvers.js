export default {
	Query: {
		async getBalance(_, arg, { stripe }) {
			let bal = await stripe.balance.retrieve({
				stripe_account: arg.acc,
			})
			console.log(bal)
			return {
				available: bal.available[0].amount,
				pending: bal.pending[0].amount,
			}
		},
	},
	Mutation: {
		async stripeComplete(_, arg, { stripe, db }) {
			let res = await stripe.oauth.token({
				grant_type: 'authorization_code',
				code: arg.acc,
			})

			console.log(res.stripe_user_id)
			let payementRef = await db
				.collection('farmers')
				.doc(arg.farmer)
				.collection('private')
				.doc('payment')
			payementRef.set({
				stripe: res.stripe_user_id,
			})
			return {
				result: res.stripe_user_id,
			}
		},
	},
}
