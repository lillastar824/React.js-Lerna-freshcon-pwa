import React, { useState } from 'react'
import firebase from 'firebase/app'
import { ArrowLeft } from 'react-feather'

var zipcodes = require('zipcodes-perogi')

async function addHomeAddress(address) {
	const { uid } = firebase.auth().currentUser
	return await firebase
		.firestore()
		.collection('users')
		.doc(uid)
		.collection('private')
		.doc('address')
		.collection('book')
		.add(address)
}

function AddNewAddress({ fin }) {
	const [address, setAddress] = useState({
		name: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		note: '',
	})
	const handleSubmit = e => {
		e.preventDefault()
		fin()
		addHomeAddress(address)
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					marginBottom: '1em',
				}}
			>
				<div>
					<p className="title is-size-5">Add new address</p>
				</div>
				<ArrowLeft onClick={() => fin(address)} />
			</div>

			<form onSubmit={handleSubmit}>
				<input
					required
					className="input"
					style={{ borderRadius: '5px', marginBottom: '1em' }}
					name="name"
					onChange={e => setAddress({ ...address, name: e.target.value })}
					type="text"
					placeholder="Name"
				/>
				<input
					required
					className="input"
					style={{ borderRadius: '5px', marginBottom: '1em' }}
					name="address"
					onChange={e => setAddress({ ...address, address: e.target.value })}
					type="text"
					placeholder="Address"
				/>
				<div style={{ display: 'flex', marginBottom: '1em' }}>
					<div style={{ width: '35%', marginRight: '1em' }}>
						<input
							className="input"
							name="zipcode"
							type="text"
							required
							onChange={e => {
								let result = zipcodes.lookup(e.target.value)
								if (result)
									setAddress({
										...address,
										state: result.state,
										city: result.city,
										zip: result.zip,
									})
							}}
							placeholder="Zipcode"
						/>
					</div>
					<div style={{ width: '40%', marginRight: '1em' }}>
						<input
							className="input"
							name="city"
							type="text"
							value={address.city}
							placeholder="City"
							disabled
						/>
					</div>
					<div style={{ width: '25%' }}>
						<input
							className="input"
							name="state"
							type="text"
							value={address.state}
							placeholder="State"
							disabled
						/>
					</div>
				</div>
				<input
					required
					className="input"
					style={{ borderRadius: '5px', marginBottom: '1em' }}
					name="note"
					onChange={e => setAddress({ ...address, note: e.target.value })}
					type="text"
					placeholder="Note to leave"
				/>
				<button
					className="button"
					type="submit"
					style={{ textAlign: 'center' }}
				>
					Add Address
				</button>
			</form>
		</>
	)
}

export default AddNewAddress
