import React, { useState, useContext, useEffect } from 'react'
import DeliverySelect from './DeliverySelect'
import firebase from 'firebase/app'
import { appContext } from '../Provider'
import produce from 'immer'
import { checkoutContext } from '../Pages/Checkout'
import { useHistory, Link } from 'react-router-dom'
import classes from './Delivery.module.css'

function getAddressAndBooks(setDefault, setBook) {
	const { uid } = firebase.auth().currentUser
	return firebase
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('private')
		.doc('address')
		.onSnapshot((snap) => {
			if (snap.exists) setDefault({ ...snap.data() })
		})
}

function comfirmAddressToMarket(set, address, market, index) {
	set((state) =>
		produce(state, (draft) => {
			draft.items[index].delivery = address
			let fee = 0
			let sum = 0
			for (let m of draft.items) {
				if (m.delivery && m.delivery.type === 'home') {
					fee += 9.99
				}
				for (let p of m.products) {
					sum += p.sum
				}
			}
			draft.fee = fee
			draft.total = fee + draft.donation + (sum + sum * 0.1)
		})
	)
}
function updateOrder(cart, profile, setOrder) {
	const { uid } = firebase.auth().currentUser
	setOrder((order) =>
		produce(order, (draft) => {
			draft.items = cart.items.map((m) => ({
				...m,
				products: m.products.map((p) => ({ ...p, status: false })),
			}))
			draft.sum = 0
			for (let m of draft.items) {
				for (let p of m.products) {
					draft.sum += p.sum
				}
			}
			draft.donation = cart.donation
			draft.total = cart.donation + (draft.sum + draft.sum * 0.1)
			draft.customer = {
				name: profile.name ? profile.name : '',
				image: '',
				ref: firebase.firestore().collection('users').doc(uid),
			}
		})
	)
}
function Delivery() {
	const { state } = useContext(appContext)
	const { order, set } = useContext(checkoutContext)
	const [address, setDefault] = useState(null)
	const history = useHistory()
	useEffect(() => {
		let unsub = getAddressAndBooks(setDefault)
		updateOrder(state.cart, state.profile, set)
		return () => {
			unsub()
		}
	}, [set, state])

	if (order.items) {
		const cond = order.items?.every(
			(m) => m.delivery && (m.delivery.address || m.delivery.type === 'pick')
		)
		return (
			<>
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
				<div className=" has-text-centered">
					Select a delivery method for each market
				</div>
				<div
					className={'section ' + classes.mar}
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{order.items.map((market, index) => (
						<div className="box" key={index}>
							<div
								className="label"
								style={{ color: '#7CB342', width: '100%' }}
							>
								{market.name}
							</div>
							<DeliverySelect
								index={index}
								defaultAddress={address}
								market={market.id}
								onDeliveryChange={(delivery) => {
									if (delivery.type === 'home' && delivery.address)
										delivery.address =
											delivery.address.name +
											', ' +
											delivery.address.address +
											', ' +
											delivery.address.city +
											', ' +
											delivery.address.state

									comfirmAddressToMarket(set, delivery, market, index)
								}}
							/>
						</div>
					))}
				</div>
				{cond && (
					<div
						className="box"
						style={{
							position: 'fixed',
							bottom: 0,
							width: '100%',
							borderTop: '1px solid #e5e5e5',
							zIndex: 5,
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
									history.push('/checkout/review')
								}}
							>
								continue
							</button>
						</div>
					</div>
				)}
			</>
		)
	} else return <></>
}

export default Delivery
