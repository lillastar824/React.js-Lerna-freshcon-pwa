import firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
import DialogProvider from './context'
import Layout from './Layout'
import ProductList from './ProductList'
import ProductTable from './ProductTable'
import Fuse from 'fuse.js'
import { SORTING } from './utils'

function ManageControl(props) {
	const [productSet, setProducts] = useState([])
	const [products, setResult] = useState([])
	const [query, setQuery] = useState('')
	const [sort, setSort] = useState(SORTING.DEFAULT)
	// useEffect(() => {
	// 	fuse.setCollection(productSet)
	// }, [productSet])
	useEffect(() => {
		// products.sort
		if (sort === SORTING.DEFAULT)
			setResult((result) => {
				console.log('sorting by name')
				return result.sort((a, b) => a.name.localeCompare(b.name))
			})
		if (sort === SORTING.PRICE)
			setResult((result) => {
				console.log('sorting by price')
				let p = result.sort((a, b) => a.price - b.price)
				return p
			})
	}, [productSet, sort])
	useEffect(() => {
		if (query.length === 0) {
			setResult(productSet)
		} else {
			const fuse = new Fuse(productSet, {
				keys: ['name'],
			})
			let result = fuse.search(query)
			setResult(result.map((itr) => ({ ...itr.item, index: itr.refIndex })))
		}
	}, [query, productSet])
	useEffect(() => {
		const { uid } = firebase.auth().currentUser
		let unsubscribe = firebase
			.firestore()
			.collection('farmers')
			.doc(uid)
			.collection('products')
			.onSnapshot((snap) => {
				if (!snap.empty)
					setProducts(snap.docs.map((p) => ({ id: p.id, ...p.data() })))
			})
		return () => {
			unsubscribe()
		}
	}, [])
	return (
		<Layout>
			<ProductTable
				products={products}
				onSearch={setQuery}
				onSort={(e) => {
					setSort(e.target.value)
				}}
				sort={sort}
			>
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
