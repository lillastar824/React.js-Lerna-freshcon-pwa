import React, { useContext } from 'react'
import { appContext } from '../Provider'
import { getPrice, getDeliveryDate } from '../utils/helpers'
import { CartAmount } from './CartAmount'
import { CheckoutButton } from './CheckoutButton'
import { CartProduct } from './CartProduct'
import classes from './CartView.module.css'
function CartMarket({ market, children }) {
	return (
		<section
			className="section"
			key={market.name}
			style={{ backgroundColor: '#F5F5F5', padding: '.7rem' }}
		>
			<div className="content">
				<div className="level is-marginless" style={{ display: 'flex' }}>
					<p style={{ color: '#7CB342' }}>
						<strong>{market.name}</strong>
						<br />
						{getDeliveryDate(market)}
					</p>
					<p className="has-text-weight-bold" style={{ color: '#7CB342' }}>
						{' '}
						Total: {getPrice(market.sum)}
					</p>
				</div>
				{children}
			</div>
		</section>
	)
}
function CartView(props) {
	const { state } = useContext(appContext)

	let cart = state.cart
	return (
		<nav
			className="panel"
			style={{ backgroundColor: '#F5F5F5', height: '100%' }}
		>
			<div className="panel-heading" style={{ backgroundColor: '#FFFFFF' }}>
				<div className="level" style={{ display: 'flex' }}>
					<strong>
						{cart.count.item} Items from {cart.count.market} Markets
					</strong>
					<button onClick={props.close} className="delete" />
				</div>
			</div>
			{cart.items.length ? (
				<div className={classes.cart}>
					<div>
						{cart.items.map((market) => (
							<CartMarket market={market}>
								{market.products.map((product) => (
									<CartProduct market={market} product={product} />
								))}
							</CartMarket>
						))}
					</div>
					<div>
						<CartAmount />
						<CheckoutButton />
					</div>
				</div>
			) : (
				<section className="section" style={{ backgroundColor: '#F5F5F5' }}>
					<strong>Cart is Empty</strong>
				</section>
			)}
		</nav>
	)
}

export default CartView
