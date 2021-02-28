import React, { useContext } from 'react'
import ProductView from '../Components/ProductView'
import { marketContext } from '../Pages/Market'
import { appContext } from '../Provider'
import { updateCart } from '../utils/cart'

function ProductDetail({ market, product }) {
	const context = useContext(marketContext)
	const { state, set } = useContext(appContext)
	return (
		<ProductView
			product={product}
			to={() => {
				context.set({ id: 1, market })
			}}
			add={({ qty }) => {
				updateCart(state, set, context.view.market, product, qty)
			}}
		/>
	)
}

export default ProductDetail
