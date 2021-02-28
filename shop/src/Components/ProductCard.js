import React from 'react'
import classes from './ProductCard.module.css'
import { PlusCircle } from 'react-feather'
import { metrics } from '@greenery/all'
import { getPrice, discounted, perOff } from '../utils/helpers'
// import { appContext } from '../Provider'
import Image from '../Containers/Image'
// import { marketContext } from '../Pages/Market'
/**
 * product Card
 * @param {string} props.product.name	name
 * @param {string} props.product.price	adddress
 * @param {string} props.product.image	image
 * @param {string} props.product.metric	favorite
 * @param {string} props.product.farmer.name	favorite
 * @param {function} props.add	update favorites
 * @param {function} props.to	navigate to
 */

function ProductCard({
	product: { name, price, metric, farmer, image, discount },
	addToCart = () => {},
	to = () => {},
}) {
	return (
		<div className={classes.card}>
			<div
				className={classes.add}
				onClick={() => {
					addToCart()
				}}
			>
				<PlusCircle />
			</div>
			<div onClick={to}>
				<Image
					type="products"
					name={image}
					className={classes.image}
					variant={'Card'}
				/>
				{/* <img src={image} className={classes.image} alt={name} /> */}
			</div>
			<div className={classes.content} onClick={to}>
				{discount !== 0 ? (
					<>
						<div className={classes.price}>
							<span className={classes.discount}>
								{getPrice(perOff(price, discount)) + metrics[metric - 1].unit}
							</span>{' '}
							<span className={classes.original}>
								{getPrice(price) + metrics[metric - 1].unit}
							</span>
						</div>
						<div className={classes.save}>
							save {getPrice(discounted(price, discount))}
						</div>
					</>
				) : (
					<div className={classes.price}>
						{getPrice(price) + metrics[metric - 1].unit}
					</div>
				)}

				<div className={classes.title}>{name}</div>
				<div className={classes.sub}>{farmer}</div>
			</div>
		</div>
	)
}

export default ProductCard
