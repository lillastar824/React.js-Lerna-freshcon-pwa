import React, { useContext } from 'react'
import { metrics } from '@greenery/all'
import { Plus, Minus, Trash2 } from 'react-feather'
import classes from './CartView.module.css'
import { appContext } from '../Provider'
import { getPrice } from '../utils/helpers'
import Image from './Image'
import { updateCart } from '../utils/cart'
export function CartProduct({ product, market }) {
	const { state, set } = useContext(appContext)
	return (
		<div className={`box ${classes.item}`} key={product.id}>
			<div className={classes.cartview}>
				<div className={classes.content}>
					<Image
						name={product.image}
						className={classes.cartitem}
						type="products"
						size="S"
						variant={'CartItem'}
					/>
					<div
						style={{
							color: '#B5B5B5',
							maxWidth: '20vw',
							paddingRight: '1vw',
							paddingLeft: '1vw',
						}}
					>
						<p className={`is-marginless ${classes.title}`}>{product.name}</p>
						<p className={`is-marginless ${classes.subtitle}`}>
							{product.farmer}
						</p>
						<p className={`is-marginless ${classes.subtitle}`}>
							{getPrice(product.price)}
							{metrics.find((metrics) => metrics.id === product.metric).unit}
						</p>
					</div>
				</div>
				<div
					className="content is-marginless"
					style={{
						color: '#B5B5B5',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<span
						tabIndex={product.id}
						className="icon"
						style={{ fontSize: '10px' }}
						role="button"
						onClick={() => {
							updateCart(state, set, market, product, -1)
						}}
						onKeyDown={() => {}}
					>
						<Minus
							style={{
								color: '#EF6C00',
								border: '1px solid whitesmoke',
								boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.3)',
								backgroundColor: 'white',
								textAlign: 'center',
								cursor: 'pointer',
								height: '20px',
								width: '20px',
								borderRadius: '50%',
							}}
						/>
					</span>
					<div
						style={{
							margin: '1vh',
							backgroundColor: '#BDBDBD',
							color: 'white',
							minHeight: '30px',
							minWidth: '30px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '50%',
						}}
					>
						{' '}
						{product.qty}
					</div>

					<span
						className="icon"
						role="button"
						style={{}}
						tabIndex={0}
						onKeyDown={() => {}}
						onClick={() => {
							updateCart(state, set, market, product)
						}}
					>
						<Plus
							style={{
								color: '#EF6C00',
								border: '1px solid whitesmoke',
								boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.3)',
								backgroundColor: 'white',
								textAlign: 'center',
								cursor: 'pointer',
								height: '20px',
								width: '20px',
								borderRadius: '50%',
							}}
						/>
					</span>
				</div>
				<div className="content is-marginless">
					<p className={classes.title} style={{ color: '#7CB342' }}>
						{getPrice(product.sum)}
					</p>
				</div>
				<div className="content is-marginless">
					<Trash2
						className={classes.remove}
						onClick={() => {
							updateCart(state, set, market, product, 0)
						}}
					/>
				</div>
			</div>
		</div>
	)
}
