/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useContext } from 'react'
import { categories } from '@greenery/all'
import styles from './home.module.css'
import { marketContext } from '../Pages/Market'
// import { addMore } from './MarketProducts'
import ProductContainer from './ProductContainer'
export function ProductsOfCategory({ cat, prods, market, anchor }) {
	const [products, get] = useState(prods)
	const { set } = useContext(marketContext)
	useEffect(() => {
		get(prods)
	}, [prods])
	return (
		<div className="tab-content">
			<div label={categories[cat.id - 1].name} key={cat.id} ref={anchor}>
				<div
					className="section is-paddingless"
					key={cat.id}
					style={{ marginTop: '1rem' }}
				>
					<div
						className="level is-paddingless is-marginless"
						style={{ display: 'flex' }}
						onClick={() => {
							set({ id: 2, market, category: cat.id })
						}}
					>
						<h1 className="subtitle is-marginless">{cat.name}</h1>
						<a style={{ display: 'inline-block' }}>
							<span
								className="tag "
								style={{
									backgroundColor: '#7CB342',
									color: '#FFFFFF',
									borderRadius: '15px',
									boxShadow: '0 3px 3px rgba(0, 0, 0, 0.12)',
								}}
							>
								view all >
							</span>
						</a>
					</div>
					<div
						className="box"
						style={{
							backgroundColor: 'white',
							marginTop: '1rem',
						}}
					>
						<div className={`${styles.productlist} container`}>
							{products.map((product) => (
								<div className={styles.product} key={product.id}>
									<ProductContainer
										product={product}
										market={market}
										to={() => {
											set({ id: 3, product, market })
										}}
									/>
								</div>
							))}
						</div>
						{/* <button
							className="button"
							onClick={() => {
								addMore(products, set, market, cat)
							}}
						>
							More
						</button> */}
					</div>
				</div>
			</div>
		</div>
	)
}
