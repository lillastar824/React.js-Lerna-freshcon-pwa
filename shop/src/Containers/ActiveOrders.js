import React, { useState, useEffect } from 'react'
import OrderCompact from '../Components/OrderCompact'
import firebase from 'firebase/app'
function getActiveOrders(set) {
	const { uid } = firebase.auth().currentUser
	return firebase
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('orders')
		.where('completed', '==', false)
		.where('paid', '==', true)
		.onSnapshot((snap) => {
			set(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
		})
}
function ActiveOrders({ go }) {
	const [orders, set] = useState([])
	useEffect(() => {
		let cancel = getActiveOrders(set)
		return () => {
			cancel()
		}
	}, [])
	if (orders.length > 0)
		return orders.map((order) => (
			<OrderCompact
				key={order.id}
				order={order}
				go={() => {
					go({ id: 3, order })
				}}
			/>
		))
	else return <div>No Active orders</div>
}

export default ActiveOrders
