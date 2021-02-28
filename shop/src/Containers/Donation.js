import React, { useContext } from 'react'
import { appContext } from '../Provider'
import produce from 'immer'
export function Donation({ onUpdate }) {
	const { state, set } = useContext(appContext)
	function donate(d) {
		set((state) =>
			produce(state, (draft) => {
				draft.cart.donation = d
				draft.cart.total = d + (draft.cart.sum + draft.cart.sum * 0.1)
			})
		)
	}
	return (
		<section
			className="section"
			style={{ backgroundColor: '#F5F5F5', padding: '1rem' }}
		>
			<p className="subtitle is-5">Pay it Forward</p>
			<p className="has-text-weight-bold" style={{ color: '#7CB342' }}>
				Help your neighbor stock their fridge too!
			</p>
			<p className="is-6">
				100% of your donation will be given to the Rhode Island Environmental
				Education Association
			</p>
			<div className="control" style={{ marginTop: '1rem', display: 'flex' }}>
				<div>
					<input
						type="radio"
						id="none"
						checked={state.cart.donation === 0}
						onChange={(e) => donate(0)}
						name="rsvp"
						value="0"
					/>
					<label
						className="radio"
						htmlFor="none"
						style={{ marginRight: '1rem', color: '#616161' }}
					>
						{' '}
						None{' '}
					</label>
				</div>
				<div>
					<input
						type="radio"
						id="1"
						checked={state.cart.donation === 1}
						onChange={(e) => donate(1)}
						name="rsvp"
						value="1"
					/>
					<label
						className="radio"
						htmlFor="1"
						style={{ marginRight: '1rem', color: '#616161' }}
					>
						{' '}
						$1{' '}
					</label>
				</div>
				<div>
					<input
						type="radio"
						id="3"
						onChange={(e) => donate(3)}
						name="rsvp"
						value="3"
					/>
					<label
						className="radio"
						htmlFor="3"
						style={{ marginRight: '1rem', color: '#616161' }}
					>
						{' '}
						$3{' '}
					</label>
				</div>
				<div>
					<input
						type="radio"
						id="5"
						onChange={(e) => donate(5)}
						name="rsvp"
						value="5"
					/>
					<label className="radio" htmlFor="5" style={{ color: '#616161' }}>
						{' '}
						$5{' '}
					</label>
				</div>
			</div>
		</section>
	)
}
