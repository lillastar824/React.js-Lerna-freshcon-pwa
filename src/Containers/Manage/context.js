import React, { useState } from 'react'
const dialogContext = React.createContext(null)

function DialogProvider({ children }) {
	const [view, display] = useState(null)
	return (
		<dialogContext.Provider
			value={{
				view,
				display,
			}}
		>
			{children}
		</dialogContext.Provider>
	)
}

export default DialogProvider

export { dialogContext }
