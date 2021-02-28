import React, { useContext, useState, useEffect } from 'react'
import { marketContext } from './context'
import firebase from 'firebase/app'
import OrdersByCustomer from './Components/OrderByCustomer'
import OrdersByMetric from './Components/OrdersByMetric'
import MarketOveriew from './MarketOveriew'

export function MarketOrders() {
	const { market, order } = useContext(marketContext)
	const [orders, setOrders] = useState([])

	useEffect(() => {
		const { uid } = firebase.auth().currentUser
		let unsubscribe = firebase
			.firestore()
			.collection('farmers')
			.doc(uid)
			.collection('subscribed')
			.doc(market.ref.id)
			.collection('orders')
			.where('completed', '==', false)
			.onSnapshot(async (snap) => {
				let marketRawSnap = await firebase
					.firestore()
					.collection('markets')
					.doc(market.ref.id)
					.get()
				let marketRaw = marketRawSnap.data()
				let day = marketRaw.day
				// get current date
				let now = new Date()
				// get market date of the week
				let marketDate = new Date(now)
				marketDate.setHours(now.getHours() + (day - now.getDay()) * 24)

				// Noramlize the date to 00:00 time
				let normDate = new Date(
					Date.UTC(
						marketDate.getFullYear(),
						marketDate.getMonth(),
						marketDate.getDate(),
						4,
						0,
						0
					)
				)

				let to = new Date(normDate)
				let from = new Date(normDate)
				to.setHours(to.getHours() - 48)
				from.setHours(from.getHours() - 168)
				// market range of current week
				// console.log(
				// 	'\tMarket ID: ',
				// 	marketRawSnap.id,
				// 	' Range: ',
				// 	from.toLocaleString('en-US', { timeZone: 'America/New_York' }),
				// 	' - ',
				// 	to.toLocaleString('en-US', { timeZone: 'America/New_York' })
				// )
				let orders = snap.docs
					.map((order) => ({
						id: order.id,
						...order.data(),
					}))
					.filter((order) => {
						if (
							order.orderedAt.toDate() >= from &&
							order.orderedAt.toDate() <= to
						)
							return true
						else return false
					})
				market.ref.get().then((snap) => {
					// console.log(snap.data())
					// for (let o of orders) {
					// 	console.log(
					// 		o.orderedAt
					// 			.toDate()
					// 			.toLocaleString('en-US', { timeZone: 'America/New_York' })
					// 	)
					// }
					setOrders(orders)
				})
			})
		return () => {
			unsubscribe()
		}
	}, [market])

	return (
		<React.Fragment>
			<MarketOveriew market={market} />
			{order === 0 ? (
				<OrdersByCustomer orders={orders} />
			) : (
				<OrdersByMetric orders={orders} />
			)}
		</React.Fragment>
	)
}
