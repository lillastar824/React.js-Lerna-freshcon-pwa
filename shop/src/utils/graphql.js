import gql from 'graphql-tag'

const CHECKOUT = gql`
	mutation process($order: String, $amount: Float, $fees: Float) {
		checkout(order: $order, amount: $amount, fees: $fees) {
			secret
			status
		}
	}
`
const CREATE_ORDER = gql`
	mutation process($input: OrderInput) {
		createOrder(order: $input) {
			result
		}
	}
`

const DEFAULT_CARD = gql`
	query {
		getDefaultCard {
			id
			brand
			last4
			fingerprint
			exp_month
			exp_year
		}
	}
`

const CARDS = gql`
	query {
		listAllCards {
			id
			brand
			last4
			fingerprint
			exp_month
			exp_year
		}
	}
`

const SETUP_INTENT = gql`
	mutation setupIntent($amount: Float) {
		setupIntent(amount: $amount) {
			secret
			status
		}
	}
`

const UPDATE_INTENT = gql`
	mutation updateIntent($order: String, $amount: Float, $intent: String) {
		updateIntent(order: $order, amount: $amount, intent: $intent) {
			secret
			status
		}
	}
`

export {
	DEFAULT_CARD,
	CARDS,
	CREATE_ORDER,
	CHECKOUT,
	SETUP_INTENT,
	UPDATE_INTENT,
}
