import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import ProductRow from './Components/ProductRow'
import { dialogContext } from './context'
import { toggleProduct } from './functions'

function ProductList({ products = [] }) {
	const { display } = useContext(dialogContext)
	return products.map(product => (
		<ProductRow
			key={product.id}
			product={product}
			editProduct={() => {
				display({ id: 0, type: 'edit', product, state: true })
			}}
			deleteProduct={e => {
				display({ id: 2, state: true, product, el: e.currentTarget })
			}}
			toggleProduct={_ => {
				toggleProduct({ product })
			}}
			handleInventory={e => {
				display({ id: 1, state: true, product, el: e.currentTarget })
			}}
		/>
	))
}

ProductList.propTypes = {
	products: PropTypes.array.isRequired,
}

export default ProductList
