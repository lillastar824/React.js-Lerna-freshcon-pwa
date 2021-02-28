import { ApolloProvider } from '@apollo/react-hooks'
import React, { lazy, Suspense, useContext } from 'react'
import CustomLoader from './Components/CustomLoader'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { createClient } from './Apollo'
import { auth } from './Context/Auth'
import Provider from './Provider'

const Market = lazy(() => import('./Pages/Market'))
const Order = lazy(() => import('./Pages/Order'))
const Profile = lazy(() => import('./Pages/Profile'))
const Checkout = lazy(() => import('./Pages/Checkout'))
const Welcome = lazy(() => import('./Pages/Welcome'))

function WaitingComponent(Component) {
	return props => (
		<Suspense fallback={<div>Loading..</div>}>
			<Component {...props} />
		</Suspense>
	)
}

function PrivateRoute({ component: Component, ...rest }) {
	const context = useContext(auth)
	return (
		<Route
			{...rest}
			render={props => {
				return context.user && context.user !== 'loading' ? (
					<ApolloProvider client={createClient(context.user)}>
						<Provider>
							<Component {...props} />
						</Provider>
					</ApolloProvider>
				) : context.user === 'loading' ? (
					<CustomLoader />
				) : (
					<Redirect to="/welcome" />
				)
			}}
		/>
	)
}

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute path="/checkout" component={WaitingComponent(Checkout)} />
				<PrivateRoute path="/orders" component={WaitingComponent(Order)} />
				<PrivateRoute path="/profile" component={WaitingComponent(Profile)} />
				<PrivateRoute path="/market" component={WaitingComponent(Market)} />
				<Route path="/welcome" component={WaitingComponent(Welcome)} />

				<Redirect to="/market" />
			</Switch>
		</BrowserRouter>
	)
}

export default Routes
