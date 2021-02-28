import React, { useContext } from 'react'
import { metrics } from '@greenery/all'
import classes from './summary.module.css'
import { useHistory, Link } from 'react-router-dom'
import { checkoutContext } from '../Pages/Checkout'
import { appContext } from '../Provider'
import { getPrice, getActualPrice } from '../utils/helpers'
import Image from './Image'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { ArrowLeft } from 'react-feather'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
function OrderSummary() {
	const {
		state: { cart },
	} = useContext(appContext)
	const { order } = useContext(checkoutContext)
	const history = useHistory()
	if (!order.items) {
		history.push('/checkout/delivery')
		return <></>
	}
	return (
		<Elements stripe={stripePromise}>
			<div
				className="level is-mobile"
				style={{
					minHeight: '63px',
					backgroundColor: '#7CB342',
					padding: '0 1em',
					color: 'white',
					position: 'sticky',
					top: 0,
					marginBottom: 0,
				}}
			>
				<div className="level-left">
					<span
						className="level-item"
						onClick={() => {
							history.goBack()
						}}
					>
						<ArrowLeft />
					</span>
				</div>
				<span className={'level-item'}>
					<Link to={'/'}>
						<img
							src="/Logo.svg"
							style={{ maxHeight: '45px' }}
							width="140"
							alt="logo"
						/>
					</Link>
				</span>

				<div className="level-right">
					<div className="level-item">
						<button
							onClick={() => {
								history.push('/market')
							}}
							className="delete"
						/>
					</div>
				</div>
			</div>
			<div className="level" style={{ position: 'sticky', top: '63px' }}>
				<div
					className="level-item box has-text-centered"
					style={{ marginBottom: 0 }}
				>
					<strong>
						Review your {cart.items.length} Items from {cart.count} Markets
					</strong>
				</div>
			</div>
			<div className={classes.summ}>
				<div>
					{order.items.map((market) => (
						<section
							className="section"
							key={market.name}
							style={{
								padding: '.7rem',
							}}
						>
							<div className="content">
								<div
									className="level is-mobile"
									style={{
										borderBottom: '1px solid lightgrey',
										padding: '0 1em 1em 1em',
									}}
								>
									<p
										className="level-left"
										style={{ color: '#7CB342', margin: '0' }}
									>
										<strong>{market.name}</strong>
										<br />
									</p>
									<p
										className="level-right has-text-weight-bold"
										style={{ color: '#7CB342' }}
									>
										{' '}
										{getPrice(market.sum)}
									</p>
								</div>
								{market.products.map((product) => (
									<div
										className={`${classes.itembox} box`}
										key={product.name}
										style={{
											padding: '1vh',
											minHeight: '2em',
											overflow: 'hidden',
											marginBottom: '.5rem',
										}}
									>
										<div
											style={{
												display: 'grid',
												gridTemplateColumns: '1fr 1fr 1fr 1fr',
												alignItems: 'center',
												justifyContent: 'space-evenly',
											}}
										>
											<Image
												type="products"
												size="S"
												name={product.image}
												className={classes.image}
												variant={'CartItem'}
											/>
											<div
												className="content is-marginless"
												style={{ color: '#B5B5B5', maxWidth: '20vw' }}
											>
												<p className="title is-size-6 is-marginless">
													{product.name}
												</p>
												<p
													className="is-size-7 is-marginless"
													style={{ maxHeight: '2.5vh', overflow: 'hidden' }}
												>
													{product.farmer.name}
												</p>
												<p className="is-size-7">
													{getPrice(product.price)}
													{
														metrics.find(
															(metrics) => metrics.id === product.metric
														).unit
													}
												</p>
											</div>
											<div
												className="content is-marginless"
												style={{
													color: '#B5B5B5',
													display: 'flex',
													alignItems: 'center',
												}}
											>
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
											</div>
											<div className="content is-marginless">
												<p
													className="has-text-weight-bold"
													style={{ color: '#7CB342' }}
												>
													{getPrice(product.sum)}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</section>
					))}
				</div>
				<section
					className="section"
					style={{ backgroundColor: '#F5F5F5', padding: '.7rem' }}
				>
					<div className="box">
						<div className="media-right">
							<div className="content">
								<p className="has-text-right is-size-6">
									Sub Total:{' '}
									<strong style={{ color: '#7CB342' }}>
										{getPrice(order.sum)}
									</strong>{' '}
									<br />
									<strong
										className="tooltip is-tooltip-left"
										data-tooltip="DeliveryFee is $ 9.99 per Market you purchase from"
									>
										Delivery Fee: {getActualPrice(order.fee)}
									</strong>
									<br />
									Rhode Island Environmental Education Association donation:
									<small
										style={{ color: '#7CB342' }}
										className="subtitle is-size-7"
									>
										{' '}
										{getActualPrice(order.donation)}
										<br />
									</small>
									Total :{' '}
									<strong style={{ color: '#7CB342' }}>
										{getActualPrice(order.total)}
									</strong>
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>

			<div
				className="box"
				style={{
					position: 'fixed',
					bottom: 0,
					width: '100%',
					borderTop: '1px solid #e5e5e5',
				}}
			>
				<div className={'container ' + classes.cont}>
					<button
						className="button is-medium is-fullwidth has-text-white"
						style={{
							borderRadius: '5px',
							backgroundColor: '#7CB342',
							display: 'inline-flex',
							placeContent: 'center',
							fontVariant: 'small-caps',
							fontWeight: 'bolder',
						}}
						onClick={() => {
							history.push('/checkout/payments')
						}}
					>
						proceed to pay
					</button>
				</div>
			</div>
		</Elements>
	)
}

export default OrderSummary
