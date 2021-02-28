import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { appContext } from '../Provider'

function CartIcon({ open }) {
	let {
		state: {
			cart: { count },
		},
	} = useContext(appContext)
	return (
			<span
				tabIndex="0"
				role="button"
				onKeyDown={open}
				onClick={open}
				style={{ color: '#FFFFFF', height: '41px', width: '41px' }}
				className="icon badge1"
				data-badge={count ? count : null}
			>
				<FontAwesomeIcon icon={faShoppingCart} />
			</span>
	)
}

export default CartIcon
