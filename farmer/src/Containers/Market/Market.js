import firebase from 'firebase/app'
import React, { useContext, useEffect } from 'react'
import { marketContext, MarketProvider } from './context'
import Layout from './Layout'
import { MarketOrders } from './MarketOrders'
import SubscribedList from './SubscribedList'

export function MarketControl() {
	const { market, setSubs } = useContext(marketContext)
	useEffect(() => {
		const { uid } = firebase.auth().currentUser
		let unsubscribe = firebase
			.firestore()
			.collection('farmers')
			.doc(uid)
			.collection('subscribed')
			.where('status', '==', true)
			.onSnapshot(snap => {
				setSubs(snap.docs.map(market => market.data()))
			})
		return () => {
			unsubscribe()
		}
	}, [setSubs])
	return (
		<Layout>
			<SubscribedList />
			{market && <MarketOrders view={0} />}
		</Layout>
	)
}

const Market = () => (
	<MarketProvider>
		<MarketControl />
	</MarketProvider>
)
export default Market
