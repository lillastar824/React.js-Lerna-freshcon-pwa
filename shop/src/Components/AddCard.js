import React, { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useMutation, useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { CARDS, DEFAULT_CARD } from '../utils/graphql'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ADD_CARD = gql`
	mutation($token: String) {
		addCard(token: $token) {
			id
			brand
			exp_month
			exp_year
			last4
			fingerprint
		}
	}
`

const SET_CARD = gql`
	mutation($id: String!) {
		setDefaultCard(source: $id)
	}
`

const SETUP_CARD = gql`
	query {
		setupCard
	}
`

function AddCard({ finish }) {
	const { loading, data, refetch } = useQuery(SETUP_CARD)

	let [addCard] = useMutation(ADD_CARD)
	const [disabled, set] = useState(false)
	const [setDefaultCard] = useMutation(SET_CARD)
	const stripe = useStripe()
	const elements = useElements()
	const MySwal = withReactContent(Swal)
	async function process(e) {
		e.preventDefault()
		set(true)
		let response = await stripe.confirmCardSetup(data.setupCard, {
			payment_method: {
				type: 'card',
				card: elements.getElement(CardElement),
			},
		})
		console.log(response)
		let { setupIntent, error } = response
		if (!error) {
			try {
				await addCard({
					variables: {
						token: setupIntent.payment_method,
					},
					update: (proxy, { data }) => {
						// Read the data from our cache for this query.
						const cards = proxy.readQuery({ query: CARDS })
						if (cards.listAllCards.length === 0) {
							proxy.writeQuery({
								query: DEFAULT_CARD,
								data: {
									getDefaultCard: data.addCard,
								},
							})
							setDefaultCard({
								variables: {
									id: data.addCard.id,
								},
							})
						}

						proxy.writeQuery({
							query: CARDS,
							data: {
								listAllCards: [...cards.listAllCards, data.addCard],
							},
						})
					},
				})
				MySwal.fire({
					toast: true,
					position: 'top',
					text: 'Card Added',
					timer: 2000,
					showConfirmButton: false,
				})
			} catch (e) {
				console.log(e)
			}
		} else {
			console.log(error)
			MySwal.fire({
				toast: true,
				position: 'top',
				text: 'Unable to add card ' + error.message,
				timer: 2000,
				showConfirmButton: false,
			})
			refetch()
		}

		set(false)
		finish()
	}
	return (
		<section
			className="section box"
			style={{ backgroundColor: '#F5F5F5', padding: '.7rem' }}
		>
			<form style={{ margin: '1rem' }} onSubmit={process}>
				<CardElement
					options={{
						style: {
							base: {
								color: '#32325d',
								fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
								fontSmoothing: 'antialiased',
								fontSize: '16px',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#fa755a',
								iconColor: '#fa755a',
							},
						},
					}}
				/>
				{!loading && (
					<button className="button" type="submit" disabled={disabled}>
						Save Card
					</button>
				)}
			</form>
		</section>
	)
}

export default AddCard
