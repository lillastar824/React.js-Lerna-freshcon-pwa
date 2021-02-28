import React, { useEffect, useState, createContext } from 'react'
import MarketSelect from '../Containers/MarketSelect'
import MarketProducts from '../Containers/MarketProducts'
import AppLayout from '../Containers/AppLayout'
import { EmptyHeader } from '../Components/EmptyHeader'
import Sales from '../Containers/Sales'
import ProductDetail from '../Containers/ProductDetail'
import { useHistory } from 'react-router-dom'

const marketContext = createContext()

function Market() {
	const [view, set] = useState({ id: 0 })
	const [loaded, done] = useState(false)
	const history = useHistory()
	useEffect(() => {
		let device = window.localStorage.getItem('market')
		if (device && !loaded) {
			set({ id: 1, market: JSON.parse(device) })
			done(true)
		}
	}, [loaded, view])
	function get(view, set) {
		if (history.location.state) {
			// set({ id: 2 })
			let c = history.location.state
			let m = JSON.parse(window.localStorage.getItem('market'))
			history.location.state = undefined
			set({ id: c.id, market: m })
		}
		switch (view.id) {
			case 1:
				return <MarketProducts market={view.market} />
			case 2:
				let market = view.market
					? view.market
					: JSON.parse(window.localStorage.getItem('market'))
				return <Sales market={market} category={view.category} />
			case 3:
				return <ProductDetail product={view.product} market={view.market} />
			default:
				// TODO: replace with notfound
				return <MarketSelect />
		}
	}
	return (
		<marketContext.Provider
			value={{
				view,
				set,
			}}
		>
			{view.id ? (
				<AppLayout>{get(view, set)}</AppLayout>
			) : (
				<>
					<EmptyHeader />
					<MarketSelect />
				</>
			)}
		</marketContext.Provider>
	)
}
export { marketContext }
export default Market
