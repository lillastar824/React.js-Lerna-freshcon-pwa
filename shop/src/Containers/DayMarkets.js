import React, { useEffect, useContext } from 'react'
import MarketCard from '../Components/MarketCard'
import classes from './MarketSelect.module.css'
// import { ChevronRight } from 'react-feather'
import firebase from 'firebase/app'
import { useState } from 'react'
import { marketContext } from '../Pages/Market'

async function toggleFavorites({ market: { id, snap, favorite, ...market } }) {
	const { uid } = firebase.auth().currentUser
	if (!favorite)
		await firebase
			.firestore()
			.collection('users')
			.doc(uid)
			.collection('favorites')
			.doc(id)
			.set(market)
	else
		await firebase
			.firestore()
			.collection('users')
			.doc(uid)
			.collection('favorites')
			.doc(id)
			.delete()
}
// function addMore(markets, day, set) {
// 	firebase
// 		.firestore()
// 		.collection('markets')
// 		.where('day', '==', day.id)
// 		.startAfter(markets[markets.length - 1].snap)
// 		.limit(5)
// 		.get()
// 		.then(snap => {
// 			if (!snap.empty)
// 				set([
// 					...markets,
// 					...snap.docs.map(market => ({
// 						id: market.id,
// 						snap: market,
// 						...market.data(),
// 					})),
// 				])
// 		})
// }
export function DayMarkets({ day, markets = [], favorites }) {
	let [dayMarkets, set] = useState([])
	const context = useContext(marketContext)
	useEffect(() => {
		set(
			markets.map((m) => ({
				...m,
				favorite: favorites.some((f) => f.id === m.id),
			}))
		)
	}, [favorites, markets])
	return (
		<div key={day.id}>
			<p className={classes.day}>Farm stands delivering on {day.day}s</p>
			<div className={classes.markets}>
				{dayMarkets.map((market) => {
					return (
						<MarketCard
							className={classes.market}
							key={market.id}
							market={market}
							to={() => {
								context.set({ id: 1, market })
								let { snap, ...temp } = market
								window.localStorage.setItem('market', JSON.stringify(temp))
							}}
							fav={() => {
								toggleFavorites({ market })
							}}
						/>
					)
				})}
				{/* <button
					className={`button ${classes.arrow}`}
					onClick={() => {
						addMore(markets, day, set)
					}}
				>
					<ChevronRight style={{ fontSize: '3.5em' }} />
				</button> */}
			</div>
		</div>
	)
}
