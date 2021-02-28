import React, { useContext } from 'react'
import { appContext } from '../Provider'
import { updateCart } from '../utils/cart'
import ProductCard from '../Components/ProductCard'

function ProductContainer({ market, product, to }) {
	const { state, set } = useContext(appContext)
	return (
		<ProductCard
			product={product}
			to={to}
			addToCart={() => {
				updateCart(state, set, market, product)
			}}
		/>
	)
}

export default ProductContainer
