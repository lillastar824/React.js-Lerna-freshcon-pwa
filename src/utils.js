import firebase from '@firebase/app'
import React from 'react'

async function addImage(image) {
	let storage = firebase.storage().ref()
	let imageName = image.name
	let productImage = storage.child(`products/${imageName}`)
	let snap = await productImage.put(image)
	let downloadURL = await snap.ref.getDownloadURL()
	return downloadURL
}

function get12HourClock(hour) {
	let n = 0
	if (hour % 12) {
		n = hour % 12
	} else {
		n = hour
	}
	return n + ' ' + (n > 12 ? 'pm' : 'am')
}

async function uploadImage({ name, blob }) {
	const storage = firebase.storage().ref()
	let snap = await storage.child(`farmers/${name}`).put(blob)
	let url = await snap.ref.getDownloadURL()
	return url
}

function perOff(price, off) {
	return price - discounted(price, off)
}

function discounted(price, off) {
	return price * (off / 100)
}

function getPrice(number) {
	let formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	})
	return formatter.format(number)
}
const withProvider = (Provider, Component) => (
	<Provider>
		<Component />
	</Provider>
)

export { addImage, get12HourClock, withProvider, uploadImage, getPrice, perOff }
