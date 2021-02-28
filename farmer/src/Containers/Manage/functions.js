import firebase from 'firebase/app'

async function toggleProducts(products, toggle) {
	const { uid } = firebase.auth().currentUser
	await Promise.all(
		products.map(p =>
			firebase
				.firestore()
				.collection('farmers')
				.doc(uid)
				.collection('products')
				.doc(p.id)
				.update({
					status: toggle,
				})
		)
	)
}
async function updateProduct({ id, product, markets, pricing, type = false }) {
	const { uid } = firebase.auth().currentUser
	const storage = firebase.storage().ref()
	if (product.image.blob)
		await storage
			.child(`products/${product.image.name}`)
			.put(product.image.blob)
	let ref = firebase
		.firestore()
		.collection('farmers')
		.doc(uid)
		.collection('products')
		.doc(id)
	await ref.update({
		...product,
		image: product.image.name,
	})
	if (pricing.dynamic) {
		let promises = []
		for (let market of markets) {
			promises.push(
				ref
					.collection('dynamic')
					.doc(market.id)
					.update({
						price: market.price,
					})
			)
		}
		await Promise.all(promises)
	}
}
async function addProduct({ product, markets, pricing }) {
	const { uid } = firebase.auth().currentUser
	await firebase
		.storage()
		.ref()
		.child(`products/${product.image.name}`)
		.put(product.image.blob)
	let ref = await firebase
		.firestore()
		.collection('farmers')
		.doc(uid)
		.collection('products')
		.add({
			...product,
			image: product.image.name,
			status: false,
			inventory: {
				stock: 0,
				warning: 0,
				auto: false,
			},
		})
	if (pricing.dynamic) {
		let promises = []
		for (let market of markets) {
			promises.push(
				ref
					.collection('dynamic')
					.doc(market.id)
					.set({
						price: market.price,
					})
			)
		}
		await Promise.all(promises)
	}
}

function deleteProduct({ product }) {
	const { uid } = firebase.auth().currentUser
	return firebase
		.firestore()
		.collection('farmers')
		.doc(uid)
		.collection('products')
		.doc(product.id)
		.delete()
}

function toggleProduct({ product }) {
	const { uid } = firebase.auth().currentUser
	return firebase
		.firestore()
		.collection('farmers')
		.doc(uid)
		.collection('products')
		.doc(product.id)
		.update({
			status: !product.status,
		})
}

async function updateInventory({ id, inventory }) {
	const { uid } = firebase.auth().currentUser
	await firebase
		.firestore()
		.collection('farmers')
		.doc(uid)
		.collection('products')
		.doc(id)
		.update({
			inventory,
		})
}

export {
	updateInventory,
	addProduct,
	updateProduct,
	toggleProduct,
	toggleProducts,
	deleteProduct,
}
