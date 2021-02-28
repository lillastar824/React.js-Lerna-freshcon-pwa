import produce from 'immer'
import { perOff } from './helpers'
export function updateCart(state, set, market, product, qty = 1) {
	const next = produce(state, (draft) => {
		let marketIdx = draft.cart.items.findIndex((m) => market.id === m.id)
		if (marketIdx >= 0) {
			let productIdx = draft.cart.items[marketIdx].products.findIndex(
				(p) => p.id === product.id
			)
			let toBeDeleted = false
			if (productIdx >= 0) {
				if (
					(draft.cart.items[marketIdx].products[productIdx].qty <= 1 &&
						qty <= 0) ||
					qty === 0
				)
					toBeDeleted = true
				else {
					let product = draft.cart.items[marketIdx].products[productIdx]
					if (product.qty <= product.stock && product.qty + qty < product.stock)
						draft.cart.items[marketIdx].products[productIdx].qty += qty
					draft.cart.items[marketIdx].products[productIdx].actual += qty
					draft.cart.items[marketIdx].products[productIdx].sum =
						product.price * draft.cart.items[marketIdx].products[productIdx].qty
					if (product.discount !== 0)
						draft.cart.items[marketIdx].products[productIdx].sum = perOff(
							product.price *
								draft.cart.items[marketIdx].products[productIdx].qty,
							product.discount
						)
				}
				if (toBeDeleted)
					draft.cart.items[marketIdx].products.splice(productIdx, 1)
			} else {
				let { snap, ...temp } = product
				draft.cart.items[marketIdx].products.push({
					...temp,
					actual: qty,
					qty,
					sum:
						product.discount !== 0
							? perOff(product.price * qty, product.discount)
							: product.price * qty,
					ref: temp.ref.id,
				})
			}

			let msum = 0
			for (let i of draft.cart.items[marketIdx].products) {
				msum += i.sum
			}
			draft.cart.items[marketIdx].sum = msum

			if (qty <= 0 && !draft.cart.items[marketIdx].products.length) {
				draft.cart.items.splice(marketIdx, 1)
			} else {
			}
			let count = 0

			for (let i of draft.cart.items) {
				count += i.products.length
			}
			draft.cart.count = count
		} else {
			let { snap, ...temp } = product
			draft.cart.items.push({
				...market,
				sum:
					product.discount !== 0
						? perOff(product.price * qty, product.discount)
						: product.price * qty,
				products: [
					{
						...temp,
						actual: qty,
						qty,
						sum:
							product.discount !== 0
								? perOff(product.price * qty, product.discount)
								: product.price * qty,
						ref: temp.ref.id,
					},
				],
			})
			draft.cart.count = 1
		}
	})
	set(next)
	window.localStorage.setItem('cart', JSON.stringify(next.cart))
}
