import React, { createContext, useState } from 'react'

const dialogContext = createContext({
	market: false,
})

function DialogProvider({ children }) {
	const [state, set] = useState(false)

	return (
		<dialogContext.Provider
			value={{
				state,
				close: () => set(false),
				open: () => set(true),
			}}
		>
			{children}
		</dialogContext.Provider>
	)
}

export { DialogProvider, dialogContext }
