import firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
import DialogProvider from './context'
import Layout from './Layout'
import ProductList from './ProductList'
import ProductTable from './ProductTable'

function ManageControl(props) {
	const [products, set] = useState([])
	useEffect(() => {
		const { uid } = firebase.auth().currentUser
		let unsubscribe = firebase
			.firestore()
			.collection('farmers')
			.doc(uid)
			.collection('products')
			.onSnapshot(snap => {
				if (!snap.empty) set(snap.docs.map(p => ({ id: p.id, ...p.data() })))
			})
		return () => {
			unsubscribe()
		}
	}, [])
	return (
		<Layout>
			<ProductTable products={products}>
				<ProductList products={products} />
			</ProductTable>
		</Layout>
	)
}

function Manage() {
	return (
		<DialogProvider>
			<ManageControl />
		</DialogProvider>
	)
}

export default Manage
