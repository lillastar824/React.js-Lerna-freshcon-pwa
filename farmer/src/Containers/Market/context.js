import React, { createContext, useState } from 'react'

const marketContext = createContext({
	market: false,
})

function MarketProvider({ children }) {
	const [market, setMarket] = useState(false)
	const [subscribed, setSubs] = useState([])
	const [order, setOrder] = useState(0)
	return (
		<marketContext.Provider
			value={{
				market,
				set: setMarket,
				subs: subscribed,
				setSubs,
				order,
				setOrder,
			}}
		>
			{children}
		</marketContext.Provider>
	)
}

export { MarketProvider, marketContext }
