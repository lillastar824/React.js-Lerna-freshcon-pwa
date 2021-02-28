import React, { useEffect, useState, useContext } from 'react'
import firebase from 'firebase/app'
import SaleHead from './SaleHead'
import { marketContext } from '../Pages/Market'
import ProductContainer from './ProductContainer'
import classes from './Sales.module.css'
function getProductsforCategory(market, category, set) {
	if (category)
		firebase
			.firestore()
			.collection('markets')
			.doc(market.id)
			.collection('products')
			.where('category', '==', category)
			.get()
			.then(snap => {
				if (!snap.empty)
					set(
						snap.docs.map(product => ({
							id: product.id,
							snap: product,
							...product.data(),
						}))
					)
			})
	else
		firebase
			.firestore()
			.collection('markets')
			.doc(market.id)
			.collection('products')
			.where('discount', '>', 0)
			.get()
			.then(snap => {
				if (!snap.empty)
					set(
						snap.docs.map(product => ({
							id: product.id,
							snap: product,
							...product.data(),
						}))
					)
			})
}
// function addMore(products, set, market, category) {
// 	if (category)
// 		firebase
// 			.firestore()
// 			.collection('markets')
// 			.doc(market.id)
// 			.collection('products')
// 			.where('category', '==', category)
// 			.startAfter(products[products.length - 1].snap)
// 			.get()
// 			.then(snap => {
// 				if (!snap.empty)
// 					set([
// 						...products,
// 						...snap.docs.map(product => ({
// 							id: product.id,
// 							snap: product,
// 							...product.data(),
// 						})),
// 					])
// 			})
// 	else
// 		firebase
// 			.firestore()
// 			.collection('markets')
// 			.doc(market.id)
// 			.collection('products')
// 			.startAfter(products[products.length - 1].snap)
// 			.limit(5)
// 			.get()
// 			.then(snap => {
// 				if (!snap.empty)
// 					set([
// 						...products,
// 						...snap.docs.map(product => ({
// 							id: product.id,
// 							snap: product,
// 							...product.data(),
// 						})),
// 					])
// 			})
// }
function Sales({ market, category = 0 }) {
	const [products, setProducts] = useState([])
	const { set } = useContext(marketContext)
	useEffect(() => {
		getProductsforCategory(market, category, setProducts)
		return () => {
			set(state => ({ ...state, category: 0 }))
		}
	}, [category, market, set])
	return (
		<>
			<SaleHead market={market} category={category} />
			<div className="container is-fluid">
				<div className={classes.sales}>
					{products.map(product => (
						<ProductContainer
							product={product}
							market={market}
							to={() => {
								set({ id: 3, product, market })
							}}
						/>
					))}
				</div>
			</div>
			{/* <button
				className="button"
				onClick={() => {
					addMore(products, set, market)
				}}
			>
				More
			</button> */}
		</>
	)
}

export default Sales
