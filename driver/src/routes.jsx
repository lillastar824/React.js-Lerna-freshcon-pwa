import React, { lazy, Suspense, useContext } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { auth } from './auth'
import Splash from './Views/Splash'

const Login = lazy(() => import('./Pages/Login'))
const Home = lazy(() => import('./Pages/Home'))
const Schedule = lazy(() => import('./Pages/Schedule'))
function WaitingComponent(Component) {
	return props => (
		<Suspense fallback={<Splash />}>
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
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}}
		/>
	)
}

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute default path="/home" component={WaitingComponent(Home)} />
				<PrivateRoute path="/schedule" component={WaitingComponent(Schedule)} />
				<Route path="/login" component={WaitingComponent(Login)} />
				<Redirect to="/home" />
			</Switch>
		</BrowserRouter>
	)
}

export default Routes
