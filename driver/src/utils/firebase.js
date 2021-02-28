import firebase from 'firebase/app'
import { days } from './helper'

export async function getMarketsByWeek() {
	let marketsSnap = await firebase
		.firestore()
		.collection('markets')
		.orderBy('day')
		.get()
	let now = new Date()
	let markets = marketsSnap.docs.map(market => {
		let data = market.data()
		return {
			id: market.id,
			subscribed: false,
			available: data.day > now.getDay() ? true : false,
			...data,
		}
	})
	// find current week days
	let temp = [...days]
	let sorted = temp.splice((now.getDay() + 3) % 6)
	sorted.push(...temp)
	let dayMarkets = sorted.map((day, index) => ({
		...day,
		markets: markets.filter(market => market.day === day.id),
	}))
	return dayMarkets
}
export function mySubscribtion({ load }) {
	let auth = firebase.auth().currentUser
	let unsub = firebase
		.firestore()
		.collection(`drivers/${auth.uid}/schedule`)
		.orderBy('day')
		.onSnapshot(snap => {
			if (!snap.empty) {
				let data = snap.docs.map(doc => ({
					id: doc.id,
					ref: doc.ref,
					...doc.data(),
				}))
				load(data)
			}
		})
	return unsub
}

export function handleSubscribtion(market) {
	const { uid } = firebase.auth().currentUser
	const scheduleRef = firebase.firestore().collection(`drivers/${uid}/schedule`)
	async function handleEvent(_) {
		if (market.subscribed) {
			//remove subscribtion
			await scheduleRef.doc(market.id).delete()
		} else {
			// add
			let { available, subscribed, id, ...temp } = market
			await scheduleRef.doc(id).set(temp)
		}
	}
	return handleEvent
}

export async function getOrders(load) {
	let auth = typeof window !== `undefined` && firebase.auth().currentUser
	const sched = await firebase
		.firestore()
		.collection(`drivers/${auth.uid}/schedule`)
		.get()

	let dayOfWeek = new Date().getDay()
	let data = sched.docs
		.map(doc => ({
			ref: doc.ref,
			...doc.data(),
		}))
		.filter(m => m.day === dayOfWeek)
	let p = data.map(doc =>
		doc.ref
			.collection('orders')
			.where('completed', '==', false)
			.get()
	)
	let k = (await Promise.all(p)).map(snap =>
		snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	)
	return data
		.map((dat, index) => ({ ...dat, orders: k[index] }))
		.filter(d => d.orders.length)
}
