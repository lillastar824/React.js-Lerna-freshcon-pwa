import React, { useEffect, useState } from 'react'
import { categories } from '@greenery/all'
import firebase from 'firebase/app'
import { Categories } from './Categories'
import { MarketBanner } from './MarketBanner'
import { getDeliveryDate } from '../utils/helpers'
import ContentLoader from 'react-content-loader'

function getCategoriesOfProducts({ market, set, done }) {
	let p = []
	for (let cat of categories) {
		p.push(
			firebase
				.firestore()
				.collection('markets')
				.doc(market.id)
				.collection('products')
				.where('category', '==', cat.id)
				.onSnapshot((snap) => {
					let data = snap.docs.map((product) => ({
						id: product.id,
						snap: product,
						...product.data(),
					}))
					let productsofCategory = new Map([[cat.id, data]])
					set((state) => new Map([...state, ...productsofCategory]))
					done(false)
				})
		)
	}
	return () => {
		for (let c of p) {
			c()
		}
	}
}
// export function addMore(products, set, market, cat) {
// 	firebase
// 		.firestore()
// 		.collection('markets')
// 		.doc(market.id)
// 		.collection('products')
// 		.where('category', '==', cat)
// 		.startAfter(products[products.length - 1].snap)
// 		.limit(5)
// 		.get()
// 		.then(snap => {
// 			if (!snap.empty)
// 				set([
// 					...products,
// 					...snap.docs.map(product => ({
// 						id: product.id,
// 						snap: product,
// 						...product.data(),
// 					})),
// 				])
// 		})
// }
function Loading({ loading, children }) {
	if (loading) return <ContentLoader />
	else return children
}
function MarketProducts({ market }) {
	const [categoriesOfProducts, set] = useState(new Map())
	const [loading, done] = useState(true)
	useEffect(() => {
		let cancel = getCategoriesOfProducts({ market, set, done })
		return () => {
			cancel()
		}
	}, [market])
	return (
		<div className="Home">
			<div className="MarketHome" key={market.id}>
				{/*  For Firestore Banner Image
					style={{ backgroundImage: "url(" + market.kimage + ")", backgroundSize: 'cover'}}
					data.kimage = await sr.child('/markets/'+data.kimage).getDownloadURL() */}
				<MarketBanner market={market} />
				<section
					className="section"
					style={{
						backgroundColor: '#F5F5F5',
						padding: '.7rem',
						marginTop: '.3rem',
					}}
				>
					<Loading loading={loading}>
						<div className="container">
							<div
								style={{
									border: '1px solid F5F5F5',
									borderRadius: '15px',
									paddingLeft: '.5rem',
									marginBottom: '.5rem',
									width: '11rem',
									backgroundColor: 'rgb(239, 108, 0)',
									color: 'white',
									fontSize: '14px',
									boxShadow: '1px 4px 11px 0px rgba(112,112,112,0.36)',
								}}
							>
								{getDeliveryDate(market)}
							</div>
							{categoriesOfProducts.size > 0 ? (
								<>
									<Categories cats={categoriesOfProducts} />
								</>
							) : (
								<div>There is No Product yet...</div>
							)}
						</div>
					</Loading>
				</section>
			</div>
		</div>
	)
}

export default MarketProducts
