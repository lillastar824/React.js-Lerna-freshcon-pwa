import React from 'react'
import classes from './MarketCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as out } from '@fortawesome/free-regular-svg-icons'
import Image from '../Containers/Image'

/**
 * Market Card
 * @param {string} props.name    name
 * @param {string} props.address adddress
 * @param {number} props.open    opening
 * @param {number} props.close   closing
 * @param {string} props.logo   image
 */
function MarketCard({
	market: { name, address, open, close, logo, favorite = false },
	fav = () => {},
	to = () => {},
}) {
	return (
		<div className={classes.card}>
			<FontAwesomeIcon
				size={'lg'}
				className={classes.fav}
				icon={favorite ? faHeart : out}
				color={'#EF6C00'}
				onClick={fav}
			/>
			<div onClick={to}>
				<Image
					name={logo}
					className={classes.image}
					type="markets"
					variant={'Card'}
				/>
			</div>
			<div className={classes.content} onClick={to}>
				<div className={classes.title}>{name}</div>
				<div className={classes.sub}>{address}</div>
				<div className={classes.sub}>
					{open}:00 - {close}:00
				</div>
			</div>
		</div>
	)
}

export default MarketCard
