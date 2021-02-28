import React, { useState, useEffect } from 'react'
// import OrderItems from './OrderItems.js'
import firebase from 'firebase/app'
import OrderCompact from '../Components/OrderCompact.jsx'

function getHistoryofOrders(set) {
	const { uid } = firebase.auth().currentUser
	let running = true
	firebase
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('orders')
		.where('completed', '==', true)

		.get()
		.then(snap => {
			if (running && !snap.empty)
				set(snap.docs.map(doc => ({ id: doc.id, snap: doc, ...doc.data() })))
		})
	return () => {
		running = false
	}
}

function getMore(orders, set) {
	const { uid } = firebase.auth().currentUser
	firebase
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('orders')
		.where('completed', '==', true)
		.startAfter(orders[orders.length - 1].snap)
		.get()
		.then(snap => {
			if (!snap.empty)
				set(snap.docs.map(doc => ({ id: doc.id, snap: doc, ...doc.data() })))
		})
}

function OrderHistory({ go }) {
	const [orders, set] = useState([])
	useEffect(() => {
		let cancel = getHistoryofOrders(set)
		return () => {
			cancel()
		}
	}, [])
	if (orders.length > 0)
		return (
			<>
				{orders.map(order => (
					<OrderCompact
						key={order.id}
						order={order}
						go={() => {
							go({ id: 3, order })
						}}
					/>
				))}
				<button
					className="button"
					onClick={() => {
						getMore(orders, set)
					}}
				>
					more
				</button>
			</>
		)
	else return <div>No orders</div>
}

export default OrderHistory
