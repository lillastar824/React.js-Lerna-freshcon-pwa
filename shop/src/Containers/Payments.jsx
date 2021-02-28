import React, { useContext, createContext, useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import CardsList from './CardsList'
import { checkoutContext } from '../Pages/Checkout'
import { getActualPrice, pay } from '../utils/helpers'
import { ArrowLeft } from 'react-feather'
import classes from './summary.module.css'
import PaymentInfo from '../Components/PaymentInfo'
import AddCard from '../Components/AddCard'
import { DEFAULT_CARD, SETUP_INTENT, UPDATE_INTENT } from '../utils/graphql'
import { useQuery, useMutation } from 'react-apollo'
import produce from 'immer'
import { useStripe } from '@stripe/react-stripe-js'
import { appContext } from '../Provider'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const paymentContext = createContext()

function Payments() {
	const { reset } = useContext(appContext)
	const { order, set } = useContext(checkoutContext)
	const history = useHistory()
	const [payment, setPayment] = useState({})
	const [secret, setSecret] = useState(false)
	const stripe = useStripe()
	const [updateIntent] = useMutation(UPDATE_INTENT)
	const [setupIntent] = useMutation(SETUP_INTENT)
	const MySwal = withReactContent(Swal)
	let { loading, error, data, refetch } = useQuery(DEFAULT_CARD)
	async function getIntent(amount) {
		try {
			let result = await setupIntent({
				variables: {
					amount,
				},
			})
			setSecret(result.data.setupIntent.secret)
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		if (order && order.total && !order.done) {
			console.log('carefull')
			getIntent(order.total).then((result) => {
				console.log(result)
			})
		}
	}, [stripe, order])
	if (!order.total) return <Redirect to="/checkout" />
	// if (!loading)
	// 	console.log(loading || (data.getDefaultCard.length ? false : true))
	return (
		<paymentContext.Provider
			value={{
				payment,
				setPayment,
			}}
		>
			<nav
				className="level is-mobile"
				style={{
					minHeight: '63px',
					backgroundColor: '#7CB342',
					padding: '0 1em',
					position: 'sticky',
					top: '0',
					zIndex: 10,
				}}
			>
				<div className="level-left">
					<span
						className="level-item has-text-light"
						onClick={() => {
							history.goBack()
						}}
					>
						<ArrowLeft />
					</span>
				</div>
				<span className={'level-left'}>
					<Link to={'/'}>
						<img
							src="/Logo.svg"
							style={{ maxHeight: '45px' }}
							width="140"
							alt="logo"
						/>
					</Link>
				</span>

				<span className="level-right">
					<span
						className="delete"
						onClick={() => {
							history.push('/market')
						}}
					></span>
				</span>
			</nav>
			<div
				className={'container ' + classes.cont}
				style={{ marginBottom: '9em' }}
			>
				<div className="section" style={{ paddingTop: '0' }}>
					<div className="level is-mobile">
						<div className="leve-left">
							<div className="level-item">
								<div className="is-size-4 has-text-dark">Payments</div>
							</div>
						</div>
						<div className="level-right">
							<div className="level-item">
								<button
									className="button is-info"
									onClick={() => {
										setPayment({ add: true })
									}}
								>
									Add
								</button>
							</div>
						</div>
					</div>
					{payment.add && (
						<AddCard
							finish={() => {
								setPayment({ add: false })
							}}
						/>
					)}
					{!error && !loading ? (
						<CardsList
							main={data.getDefaultCard}
							onChange={() => {
								refetch()
							}}
						/>
					) : (
						<div>Loading</div>
					)}
				</div>
			</div>
			<form
				className="box"
				style={{
					position: 'fixed',
					bottom: 0,
					width: '100%',
					borderTop: '1px solid #e5e5e5',
				}}
				onSubmit={async (e) => {
					e.preventDefault()
					set((state) =>
						produce(state, (draft) => {
							draft.done = 'loading'
						})
					)

					// console.log(datadata)
					pay({
						order,
						card: data.getDefaultCard.id,
						stripe,
						secret,
						update: updateIntent,
					}).then((status) => {
						if (status !== 'failed') {
							set((state) =>
								produce(state, (draft) => {
									draft.done = true
								})
							)
							MySwal.fire({
								icon: 'success',
								title: 'Order',
								titleText: 'Order Placed',
								timer: 2000,
								onClose: () => {
									reset()
									history.replace('/orders')
								},
							})
						}
						if (status === 'pending') {
							set((state) =>
								produce(state, (draft) => {
									draft.done = true
								})
							)
							MySwal.fire({
								icon: 'warning',
								title: 'Order',
								titleText: 'Order will be placed once payment is completed',
								timer: 2000,
								onClose: () => {
									reset()
									history.replace('/orders')
								},
							})
						}
						if (status === 'requires_payment_method' || status === 'failed') {
							set((state) =>
								produce(state, (draft) => {
									draft.done = 'pending'
								})
							)
							MySwal.fire({
								icon: 'error',
								title: 'Payment',
								titleText: 'Payment failed, Try other payments',
								timer: 2000,
								onClose: () => {},
							})
						}
					})
				}}
			>
				<div className={'container ' + classes.cont}>
					{!loading && secret ? (
						<PaymentInfo card={data.getDefaultCard} short />
					) : (
						<div>Loading</div>
					)}
					{order.done === 'loading' ? (
						<button className={'button ' + classes.button} disabled>
							paying {getActualPrice(order.total)}
						</button>
					) : (
						<button
							className={'button ' + classes.button}
							type="submit"
							disabled={loading || (data.getDefaultCard.id ? false : true)}
						>
							pay {getActualPrice(order.total)}
						</button>
					)}
				</div>
			</form>
		</paymentContext.Provider>
	)
}

export default Payments
