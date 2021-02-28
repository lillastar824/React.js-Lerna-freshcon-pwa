import fest from 'firebase-functions-test'
// import stripe from 'stripe'

let functions_test = fest()
// const STRIPE_ID = 'sk_test_Hd9PMP3pyJj4jvsRKS0zXd6g'
// const stripeRef = stripe(STRIPE_ID)

test('two plus two is four', () => {
	let tf = require('./drivers')
	expect(2 + 2).toBe(4)
})

functions_test.cleanup()
