import React from 'react'
import classes from './cardDrawer.module.css'
function CardDrawer({ open, children, onClose }) {
	if (open)
		return (
			<div className={`${classes.drawer} ${open ? 'enabled' : ''}`}>
				<div
					className={classes.overlay}
					onClick={() => {
						onClose()
					}}
				/>
				<span className={classes.children}>{children}</span>
			</div>
		)
	return null
}

export default CardDrawer
