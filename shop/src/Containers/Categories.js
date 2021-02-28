import React, { useState, useContext, createRef } from 'react'
import { categories } from '@greenery/all'
import Tab from '../Components/Tab'
import { marketContext } from '../Pages/Market'
import { ProductsOfCategory } from './ProductsOfCategory'
import classes from './categories.module.css'
export function Categories({ cats }) {
	const [active, set] = useState('')
	const { view } = useContext(marketContext)
	let catos = [...cats]
		.map((c) => ({
			...categories[c[0] - 1],
			products: c[1],
		}))
		.filter((s) => s.products.length && s.name)
	if (!catos.length) return <div>There are no Products</div>
	const refs = catos.reduce((acc, value) => {
		acc[value.id] = createRef()
		return acc
	}, {})
	const executeScroll = (id) => {
		refs[id].current.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		})
	}
	return (
		<>
			<div className={classes.stick}>
				<div className={`tabs  is-centered`}>
					<ul>
						{catos.map((cat, idx) => (
							<Tab
								activeTab={active}
								key={cat.id}
								label={cat.name}
								onClick={(_) => {
									set(cat.name)
									executeScroll(cat.id)
								}}
							/>
						))}
					</ul>
				</div>
			</div>
			{catos.map((cat, idx) => (
				<ProductsOfCategory
					anchor={refs[cat.id]}
					key={cat.id}
					prods={cat.products}
					cat={cat}
					market={view.market}
				/>
			))}
		</>
	)
}
