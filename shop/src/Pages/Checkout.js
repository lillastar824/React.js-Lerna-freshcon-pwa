import React, { useState, createContext } from 'react'
// import { useTransition, animated } from 'react-spring'
import OrderSummary from '../Containers/Summary'
import Delivery from '../Containers/Delivery'
import Payments from '../Containers/Payments'
import { Switch, Route, Redirect } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

import { Elements } from '@stripe/react-stripe-js'
const checkoutContext = createContext()
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

function Checkout() {
	const [order, set] = useState({ done: false })
	// })
	return (
		<checkoutContext.Provider
			value={{
				order,
				set,
			}}
		>
			<Elements stripe={stripePromise}>
				{/* {transitions.map(({ item, props, key }) => (
				<animated.div key={key} style={{ ...props, position: 'relative' }}> */}
				<Switch>
					<Route default path="/checkout/delivery" component={Delivery} />
					<Route path="/checkout/review" component={OrderSummary} />
					<Route path="/checkout/payments" component={Payments} />
					<Redirect to="/checkout/delivery" />
				</Switch>
				{/* </animated.div>
			))} */}
			</Elements>
		</checkoutContext.Provider>
	)
}

export { checkoutContext }

export default Checkout
