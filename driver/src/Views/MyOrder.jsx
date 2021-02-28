import React from 'react'
import { useState } from 'react'
import { getOrders } from '../utils/firebase'
import MarketOrders from '../Components/MarketOrders'
import { Typography } from '@material-ui/core'
function MyOrder() {
	const [dayOrders, setOrders] = useState([])
	useState(() => {
		let running = true
		getOrders().then(data => {
			console.log(running)
			if (running) setOrders(data)
		})
		return () => {
			console.log('umounted')
			running = false
		}
	}, [])
	if (dayOrders.length)
		return dayOrders.map(market => (
			<MarketOrders market={market} key={market.ref.id}></MarketOrders>
		))
	else {
		return (
			<Typography align="center" style={{ margin: '1em 0 1em 0' }}>
				No orders for today
			</Typography>
		)
	}
}

export default MyOrder
