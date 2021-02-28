import React from 'react'
import { useHistory } from 'react-router-dom'
export function CheckoutButton() {
	const history = useHistory()
	return (
		<section
			className="section"
			style={{ backgroundColor: '#F5F5F5', padding: '0.7rem' }}
		>
			<button
				className="button is-medium is-fullwidth has-text-white"
				style={{
					borderRadius: '5px',
					backgroundColor: '#7CB342',
					bottom: '0',
				}}
				onClick={() => {
					history.push('/checkout')
				}}
			>
				Proceed to Checkout
			</button>
		</section>
	)
}
