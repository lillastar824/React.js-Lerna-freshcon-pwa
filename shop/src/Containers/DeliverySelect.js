import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion'
import SelectableTitleCard from '../Components/SelectableCard'
// import { Disc } from 'react-feather'
import AddNewAddress from '../Components/AddNewAddress'

function getAddressBook(setBook) {
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
function DeliverySelect({ onDeliveryChange, defaultAddress, market, index }) {
	const [book, setBook] = useState([])
	const [add, set] = useState(false)
	const [radio, check] = useState(false)
	useEffect(() => {
		let unsub = getAddressBook(setBook)

		return () => {
			unsub()
		}
	}, [])

	useEffect(() => {
		setBook(state =>
			state.map(add => ({
				...add,
				selected: add.id === (defaultAddress ? defaultAddress.id : false),
			}))
		)
	}, [defaultAddress])
	return (
		<div className="DeliverySelect">
			<Accordion
				style={{ border: 'none' }}
				onChange={([e]) => {
					check(e)
					if (e === 0) {
						onDeliveryChange({
							type: 'pick',
						})
					}
					if (e === 1) {
						onDeliveryChange({
							type: 'site',
						})
					}
					if (e === 2) {
						if (defaultAddress)
							onDeliveryChange({
								type: 'home',
								address: defaultAddress,
							})
						else
							onDeliveryChange({
								type: 'home',
							})
					}
				}}
			>
				<AccordionItem
					style={{ margin: '0.5em 0em', borderRadius: '5px' }}
					uuid={0}
				>
					<AccordionItemHeading>
						<AccordionItemButton>
							<input
								checked={radio === 0 ? true : false}
								style={{
									display: 'none',
								}}
								name={`radio-group${market}`}
								id={`pick${market}`}
								type="radio"
								onChange={() => {
									onDeliveryChange({
										type: 'pick',
									})
								}}
							/>
							<label style={{ minWidth: '1em' }} htmlFor={`pick${market}`}>
								Pick-Up
							</label>
						</AccordionItemButton>
					</AccordionItemHeading>
				</AccordionItem>
				{/* <AccordionItem
					style={{ margin: '0.5em 0em', borderRadius: '5px' }}
					uuid={1}
				>
					<AccordionItemHeading>
						<AccordionItemButton>
							<input
								checked={radio === 1 ? true : false}
								name={`radio-group${market}`}
								id={`site${market}`}
								type="radio"
								onChange={() => {
									onDeliveryChange({
										type: 'site',
									})
								}}
							/>
							<label style={{ minWidth: '1em' }} htmlFor={`site${market}`}>
								Site Pick-Up
							</label>
						</AccordionItemButton>
					</AccordionItemHeading>
					<AccordionItemPanel style={{ padding: '0px' }}>
						<div style={{ paddingTop: '18px', paddingBottom: '18px' }}>
							<div className="field">
								<p className="control">
									<input
										className="input"
										style={{ borderRadius: '5px' }}
										id="name"
										type="name"
										placeholder="Search Location Site Pick-Up"
									/>
								</p>
							</div>
						</div>
					</AccordionItemPanel>
				</AccordionItem> */}
				<AccordionItem
					style={{ margin: '0.5em 0em', borderRadius: '5px' }}
					uuid={2}
				>
					<AccordionItemHeading>
						<AccordionItemButton>
							<input
								checked={radio === 2 ? true : false}
								name={`radio-group${market}`}
								id={`home${market}`}
								type="radio"
								onChange={() => {
									if (defaultAddress)
										onDeliveryChange({
											type: 'home',
											address: defaultAddress,
										})
									else
										onDeliveryChange({
											type: 'home',
										})
								}}
							/>
							<label style={{ minWidth: '1em' }} htmlFor={`home${market}`}>
								Home Delivery
							</label>
						</AccordionItemButton>
					</AccordionItemHeading>
					<AccordionItemPanel style={{ padding: '0px' }}>
						<div style={{ paddingTop: '18px', paddingBottom: '18px' }}>
							<p className="title is-size-5">Select address</p>
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
										onDeliveryChange({
											type: 'home',
											address: address,
										})
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
								fin={address => {
									if (!book.length) {
										onDeliveryChange({
											type: 'home',
											address: address,
										})
									}
									set(false)
								}}
							/>
						)}
					</AccordionItemPanel>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

export default DeliverySelect
