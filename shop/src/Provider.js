import React, { createContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import produce from 'immer'

const appContext = createContext(null)

function Provider({ children }) {
	const [state, set] = useState({
		view: false,
		cart: { items: [], count: 0, donation: 0, sum: 0, total: 0, fee: 0 },
		profile: {
			email: '',
			phone: '',
			name: '',
			image: null,
		},
	})
	function reset() {
		localStorage.removeItem('cart')
		set(
			produce(state, (draft) => {
				draft.view = false
				draft.cart = { items: [], count: 0, donation: 0, sum: 0, total: 0 }
			})
		)
	}
	useEffect(() => {
		const { uid, displayName } = firebase.auth().currentUser
		let unsub = firebase
			.firestore()
			.collection('users')
			.doc(uid)
			.onSnapshot((snap) => {
				set((state) =>
					produce(state, (draft) => {
						draft.profile = { name: displayName, ...snap.data() }
					})
				)
			})
		if (window.localStorage.getItem('cart'))
			set((state) =>
				produce(state, (draft) => {
					let cart = JSON.parse(window.localStorage.getItem('cart'))
					draft.cart = cart
				})
			)
		return () => {
			unsub()
		}
	}, [])
	return (
		<appContext.Provider
			value={{
				state,
				set,
				reset,
			}}
		>
			{children}
		</appContext.Provider>
	)
}

export { appContext }
export default Provider
