import React, { useEffect, useState, useContext } from 'react'
import classes from './MarketSelect.module.css'
import { marketContext } from '../Pages/Market'
import { useMedia } from 'react-use'
import { X } from 'react-feather'
import firebase from 'firebase/app'
import { DayMarkets } from './DayMarkets'
import { FavoriteMarkets } from './FavoriteMarkets'
import { days } from '../utils/helpers'
/**
 * Select Markets and Display Fav
 * @param {function} props.close close modal
 */

function getFavorites(set) {
	const { uid } = firebase.auth().currentUser
	let unsub = firebase
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('favorites')
		.onSnapshot(snap => {
			if (!snap.empty)
				set(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
			else set([])
		})
	return unsub
}

function getMarkets(set) {
	let p = Array.from(Array(7)).map((_, i) =>
		firebase
			.firestore()
			.collection('markets')
			.where('day', '==', i)
			.get()
	)
	let running = true
	Promise.all(p).then(md => {
		if (running)
			set(
				md.map(res =>
					res.docs.map(market => ({
						id: market.id,
						snap: market,
						...market.data(),
					}))
				)
			)
	})
	return () => {
		running = false
	}
}

function MarketSelect() {
	const [dayMarkets, setDayMarkets] = useState([])
	const [favorites, setFavorites] = useState([])
	const { view, set } = useContext(marketContext)
	useEffect(() => {
		let unsubFav = getFavorites(setFavorites)
		let cancel = getMarkets(setDayMarkets)
		return () => {
			unsubFav()
			// unsubMark()
			cancel()
		}
	}, [])

	function sort_days() {
		let day_of_week = new Date().getDay()

		let sorted_list = days.slice(day_of_week).concat(days.slice(0, day_of_week))
		return sorted_list
		// days.sort(function(a, b) {
		// 	return sorted_list.indexOf(a) > sorted_list.indexOf(b)
		// })
	}
	let list = sort_days()
	const isWide = useMedia('(min-width: 480px)')

	return (
		<div
			className={`${classes.container} ${
				isWide ? (false ? classes.popup : classes.desktop) : classes.mobile
			}`}
		>
			{/* {!popup && (
				<div className={classes.zip}>
					<input
						type="number"
						className={classes.input}
						placeholder="zipcode"
					/>
					<FontAwesomeIcon icon={faSearch} />
				</div>
			)} */}
			{view.market && (
				<button
					className={`button ${classes.close}`}
					onClick={() => set({ ...view, id: 1 })}
				>
					<X style={{ fontSize: '3.5em' }} />
				</button>
			)}
			<div className={classes.header}>
				<h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef6c00' }}>
					Pick a market to begin
				</h1>
				<p>
					You shop and we deliver from local farm stands and farmers markets
					near you
				</p>
				{/* <div className={classes.search}>
						<input
							type="text"
							placeholder="Search for a market"
							className={classes.input}
							onChange={e => query(e.target.value)}
						/>
						<button className={classes.searchbutton}>
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</div> */}
			</div>
			<FavoriteMarkets favorites={favorites} />
			<section className={classes.weeks}>
				<div className={classes.content}>
					{dayMarkets.length &&
						list.map((day, index) =>
							dayMarkets[day.id].length ? (
								<DayMarkets
									key={day.id}
									day={day}
									markets={dayMarkets[day.id]}
									favorites={favorites}
								/>
							) : null
						)}
				</div>
			</section>
		</div>
	)
}

export default MarketSelect
