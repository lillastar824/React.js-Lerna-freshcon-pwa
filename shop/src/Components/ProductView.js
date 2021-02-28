// eslint-disable-next-line
import React, { useState } from 'react'
import { X } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { faFrown } from '@fortawesome/free-regular-svg-icons'
// import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { metrics } from '@greenery/all'
import Image from '../Containers/Image'
import classes from './ProductView.module.css'

import { getPrice, perOff, discounted } from '../utils/helpers'
/**
 * product Card
 * @param {string} props.product.name	name
 * @param {string} props.product.price	adddress
 * @param {string} props.product.image	image
 * @param {string} props.product.metric	favorite
 * @param {string} props.product.description	description
 * @param {string} props.product.facts	facts
 * @param {string} props.product.producer	producer
 * @param {string} props.product.farmer.name	favorite
 * @param {function} props.add	update favorites
 * @param {function} props.to	navigate to
 */

function ProductView({
	product: {
		name,
		discount,
		price,
		metric,
		farmer,
		image,
		description,
		facts,
		producer,
	},
	add = () => {},
	to = () => {},
}) {
	const [qty, set] = useState(1)
	return (
		<div className={classes.view}>
			<button className={`button ${classes.close}`} onClick={to}>
				<X />
			</button>
			<div className={classes.overview}>
				<div>
					<Image
						type={'products'}
						name={image}
						className={classes.image}
						size={'M'}
						variant={'ProductView'}
					/>
				</div>
				<div className={classes.specs}>
					<div className={classes.title}>
						{name}
						{discount !== 0 ? (
							<>
								<div className={classes.price}>
									<span className={classes.discount}>
										{getPrice(perOff(price, discount)) +
											metrics[metric - 1].unit}
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
					</div>
					<div className={classes.subtitle}>{farmer}</div>
					<select
						className={classes.select}
						value={qty}
						onChange={e => set(Number.parseInt(e.target.value))}
					>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
					</select>
					<button
						className={`button ${classes.add}`}
						onClick={() => {
							add({ qty })
						}}
					>
						Add to cart
					</button>
					<div className={classes.rating}>
						<div>
							<FontAwesomeIcon size="3x" icon={faSmile} color={'#EF6C00'} />
						</div>
						<div>
							<FontAwesomeIcon size="3x" icon={faFrown} color={'#EF6C00'} />
						</div>
					</div>
				</div>
			</div>
			{/* <div className={classes.recent}>
				recent
			</div> */}
			<div className={classes.content}>
				{/* TODO: preferences
				<div className={classes.check}>
					<FontAwesomeIcon size={'4x'} icon={faCheckCircle} color={'#616161'} />
					<div className={classes.icontitle}>keto</div>
				</div> */}
				<div className={classes.para}>
					<div className={classes.ptitle}>Description</div>
					<div className={classes.des}>{description}</div>
				</div>
				<div className={classes.para}>
					<hr />
					<div className={classes.ptitle}>Facts</div>
					<div className={classes.des}>{facts}</div>
				</div>
				<div className={classes.para}>
					<hr />
					<div className={classes.ptitle}>Producer</div>
					<div className={classes.des}>{producer}</div>
				</div>
			</div>
		</div>
	)
}

export default ProductView
