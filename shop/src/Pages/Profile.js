/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import SelectableTitleCard from '../Components/SelectableCard'
import AddNewAddress from '../Components/AddNewAddress'
import AppLayout from '../Containers/AppLayout'
import Info from '../Containers/ProfileInfo'
import Share from '../Containers/Share'
import HowItWorks from '../Containers/HowItWorks'

function Tabs({ set, view }) {
	return (
		<div className="tabs is-centered">
			<ul>
				<li className={`${view.id === 0 && 'is-active'}`}>
					<a
						role="button"
						tabIndex="0"
						onClick={() => set({ id: 0 })}
						onKeyDown={() => set({ id: 0 })}
					>
						Profile
					</a>
				</li>
				<li className={`${view.id === 1 && 'is-active'}`}>
					<a
						role="button"
						tabIndex="0"
						onClick={() => set({ id: 1 })}
						onKeyDown={() => set({ id: 1 })}
					>
						Addressbook
					</a>
				</li>
				<li className={`${view.id === 2 && 'is-active'}`}>
					<a
						role="button"
						tabIndex="0"
						onClick={() => set({ id: 2 })}
						onKeyDown={() => set({ id: 2 })}
					>
						Share
					</a>
				</li>
				<li className={`${view.id === 3 && 'is-active'}`}>
					<a
						role="button"
						tabIndex="0"
						onClick={() => set({ id: 3 })}
						onKeyDown={() => set({ id: 3 })}
					>
						FAQ
					</a>
				</li>
			</ul>
		</div>
	)
}

function getAddressBook(setBook, address) {
	const { uid } = firebase.auth().currentUser
	return firebase
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('private')
		.doc('address')
		.collection('book')
		.onSnapshot(snap => {
			setBook(
				snap.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
					selected: doc.id === address.id,
				}))
			)
		})
}

function setDefaultAdress(address) {
	const { uid } = firebase.auth().currentUser
	return firebase
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('private')
		.doc('address')
		.set(address)
}

function getDefaultAdress(setDefault) {
	const { uid } = firebase.auth().currentUser
	return firebase
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('private')
		.doc('address')
		.onSnapshot(snap => {
			setDefault({ id: snap.id, ...snap.data() })
		})
}

function AddressBook({ defaultAddress }) {
	const [book, setBook] = useState([])
	const [add, set] = useState(false)
	const [address, setDefault] = useState({})
	useEffect(() => {
		let unsub = getAddressBook(setBook, address)
		let unpub = getDefaultAdress(setDefault)
		return () => {
			unsub()
			unpub()
		}
	}, [defaultAddress, address])
	return (
		<div className="container">
			<div style={{ paddingTop: '18px', paddingBottom: '18px' }}>
				<p className="title is-size-5">Address Book</p>
				{book.map((address, idx) => (
					<SelectableTitleCard
						key={idx}
						name={address.name}
						address={address.address}
						zip={address.zip}
						city={address.city}
						state={address.state}
						note={address.note}
						onClick={() => {
							setDefaultAdress(address)
						}}
						selected={address.selected}
					/>
				))}
				<button className="button" onClick={() => set(true)}>
					Add New Address
				</button>
			</div>

			{add && (
				<AddNewAddress
					fin={() => {
						set(false)
					}}
				/>
			)}
		</div>
	)
}

function getView(view) {
	switch (view.id) {
		case 1:
			return <AddressBook />
		case 2:
			return <Share />
		case 3:
			return <HowItWorks />
		default:
			return <Info />
	}
}
function Profile() {
	const [view, set] = useState({ id: 0 })
	return (
		<AppLayout>
			<Tabs set={set} view={view} />
			{getView(view)}
		</AppLayout>
	)
}

export default Profile
