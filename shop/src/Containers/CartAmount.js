import React, { useContext, useEffect } from 'react'
import { getPrice, getActualPrice } from '../utils/helpers'
import { appContext } from '../Provider'
import produce from 'immer'
import { Donation } from './Donation'

export function CartAmount() {
	const { state, set } = useContext(appContext)

	useEffect(() => {
		let sum = 0
		for (let m of state.cart.items) {
			sum += m.sum
		}
		if (sum !== state.cart.sum)
			set(
				produce(state, (draft) => {
					let sum = 0
					for (let m of draft.cart.items) {
						sum += m.sum
					}
					draft.cart.sum = sum
					draft.cart.total = draft.cart.donation + (sum + sum * 0.1)
				})
			)
	}, [state, set])
	return (
		<>
			<Donation />
			<section
				className="section"
				style={{ backgroundColor: '#F5F5F5', padding: '.7rem' }}
			>
				<div className="field has-addons">
					<div className="control" style={{ width: '100%' }}>
						<input
							className="input is-medium"
							type="text"
							placeholder="Coupon Code"
						/>
					</div>
					<div className="control">
						<button
							className="button is-medium is-info"
							style={{ backgroundColor: '#7CB342' }}
						>
							Apply
						</button>
					</div>
				</div>
			</section>
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
									{getPrice(state.cart.sum)}
								</strong>{' '}
								<br />
								Rhode Island Environmental Education Association donation:
								<small
									style={{ color: '#7CB342' }}
									className="subtitle is-size-7"
								>
									{' '}
									{getActualPrice(state.cart.donation)}
									<br />
								</small>
								Total :{' '}
								<strong style={{ color: '#7CB342' }}>
									{getActualPrice(state.cart.total)}
								</strong>
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
