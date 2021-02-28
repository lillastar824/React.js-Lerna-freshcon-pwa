import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import firebase from 'firebase/app'
import { authContext } from './Context/Auth'
import NotFound from './Containers/NotFound'
import Header from './Containers/Header'

const Welcome = lazy(() => import('./Containers/Welcome'))
const Boarding = lazy(() => import('./Containers/Boarding'))
const Market = lazy(() => import('./Containers/Market'))
const Manage = lazy(() => import('./Containers/Manage'))
const Numbers = lazy(() => import('./Containers/Numbers'))
const Profile = lazy(() => import('./Containers/Profile'))

function WaitingComponent(Component) {
	return (props) => (
		<Suspense fallback={<div>Loading..</div>}>
			<Component {...props} />
		</Suspense>
	)
}

class CheckWelcomeWrapper extends React.Component {
	static contextType = authContext
	state = {
		loading: true,
		welcome: false,
	}
	async componentDidMount() {
		let profile = await firebase
			.firestore()
			.collection('farmers')
			.doc(this.context.auth.uid)
			.get()
		let data = profile.data()
		try {
			if (data.hasOwnProperty('welcome')) {
				if (data.welcome) this.setState({ welcome: true })
			} else {
				this.setState({ welcome: true })
			}
			this.setState({ loading: false })
		} catch (e) {
			firebase.auth().signOut()
		}
	}
	render() {
		if (this.state.loading) return <div>Loading</div>
		if (this.state.welcome) return <Redirect to="/onboarding" />
		return <React.Fragment>{this.props.children}</React.Fragment>
	}
}

class PrivateRoute extends React.Component {
	static contextType = authContext
	render() {
		let { component: Component, ...rest } = this.props
		return (
			<Route
				{...rest}
				render={(props) => {
					return this.context.auth ? (
						<CheckWelcomeWrapper>
							<Header {...props} />
							<Component {...props} />
						</CheckWelcomeWrapper>
					) : (
						<Redirect to="/welcome" />
					)
				}}
			/>
		)
	}
}

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/onboarding" component={WaitingComponent(Boarding)} />
				{/* TODO: renable registration <Route path="/register" component={WaitingComponent(Register)} /> */}
				<Route path="/welcome" component={WaitingComponent(Welcome)} />

				<PrivateRoute
					path="/market"
					exact
					component={WaitingComponent(Market)}
				/>
				<PrivateRoute path="/" exact component={WaitingComponent(Market)} />
				<PrivateRoute
					path="/manage"
					exact
					component={WaitingComponent(Manage)}
				/>
				<PrivateRoute
					path="/numbers"
					exact
					component={WaitingComponent(Numbers)}
				/>
				<PrivateRoute
					path="/profile"
					exact
					component={WaitingComponent(Profile)}
				/>
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	)
}

export default Routes
