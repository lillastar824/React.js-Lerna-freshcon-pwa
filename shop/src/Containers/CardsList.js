import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import CardInfo from '../Components/CardInfo'
import { CARDS } from '../utils/graphql'
import { Trash2 } from 'react-feather'
import classes from './cardList.module.css'

const SET_CARD = gql`
	mutation($id: String!) {
		setDefaultCard(source: $id)
	}
`

const DELETE_CARD = gql`
	mutation($id: String) {
		deleteCard(id: $id)
	}
`
function CardsList({ back, main = {}, onChange }) {
	const { data, loading, error } = useQuery(CARDS)
	const [setDefaultCard] = useMutation(SET_CARD)
	const [deleteCard] = useMutation(DELETE_CARD)

	if (loading) return <div>Loading</div>
	if (error) return <div>Error</div>
	return (
		<div className="">
			{data.listAllCards.length ? (
				<>
					{data.listAllCards.map((card) => (
						<div
							className={`box ${main.id === card.id ? classes.default : ''}`}
							style={{ cursor: 'pointer' }}
							key={card.id}
						>
							<div style={{ display: 'grid', gridTemplateColumns: '90% 1fr' }}>
								<span
									onClick={async () => {
										await setDefaultCard({
											variables: {
												id: card.id,
											},
										})
										onChange()
									}}
								>
									<CardInfo card={card} short />
								</span>
								<span
									onClick={async () => {
										deleteCard({
											variables: {
												id: card.id,
											},
											update: (proxy, { data }) => {
												// Read the data from our cache for this query.
												const cards = proxy.readQuery({ query: CARDS })
												// delete default card  card opportunisticly
												if (main.id === card.id) {
													console.log('deleting default card')
												}
												proxy.writeQuery({
													query: CARDS,
													data: {
														listAllCards: cards.listAllCards.filter(
															(c) => c.id !== card.id
														),
													},
												})
											},
										}).then(() => {
											onChange()
										})
									}}
								>
									<Trash2 />
								</span>
							</div>
						</div>
					))}
					{process.env.NODE_ENV === 'development' && (
						<div
							className={`box`}
							style={{ cursor: 'pointer' }}
							onClick={async () => {
								await setDefaultCard({
									variables: {
										id: 'none',
									},
								})
								back()
							}}
						>
							<div style={{ display: 'grid', gridTemplateColumns: '90% 1fr' }}>
								<span>None</span>
							</div>
						</div>
					)}
				</>
			) : (
				<div> No Card </div>
			)}
		</div>
	)
}

export default CardsList
