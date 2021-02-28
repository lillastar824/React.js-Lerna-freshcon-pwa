import React, { useState } from 'react'
import Layout from '../Views/Layout'
import { Tab, Tabs } from '@material-ui/core'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import MyOrders from '../Views/MyOrder'
import MySchedule from '../Views/MySchedule'

function Home({ location }) {
	const history = useHistory()
	const handleChange = (e, value) => {
		if (value) history.push('/home/schedule')
		else history.push('/home/orders')
	}

	return (
		<Layout>
			<Tabs
				value={location.pathname === '/home/schedule' ? 1 : 0}
				onChange={handleChange}
				aria-label="driver-tabs"
				textColor="primary"
				variant="fullWidth"
			>
				<Tab label="Orders" />
				<Tab label="Schedule" />
			</Tabs>
			<Switch>
				<Route exact path="/home/orders" component={MyOrders} />
				<Route exact path="/home/schedule" component={MySchedule} />
				<Redirect to="/home/orders" />
			</Switch>
		</Layout>
	)
}

export default Home
