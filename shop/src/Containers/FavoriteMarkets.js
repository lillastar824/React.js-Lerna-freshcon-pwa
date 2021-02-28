import React, { useContext } from 'react'
import classes from './MarketSelect.module.css'
import { marketContext } from '../Pages/Market'
import Image from './Image'
export function FavoriteMarkets({ favorites = [] }) {
	const { set } = useContext(marketContext)
	return (
		<div className={classes.favorites}>
			<div>
				<strong style={{ color: '#7CB342' }}>Favorite Markets</strong>
			</div>
			<div className={classes.content}>
				{favorites.length ? (
					favorites.map(market => (
						<div
							className={classes.favorite}
							key={market.name}
							tabIndex="0"
							role="button"
							onKeyDown={() => {
								let { snap, ...temp } = market
								// mcontext.setMarket(market.id)
								window.localStorage.setItem(
									'market',
									JSON.stringify({ id: 1, market: temp })
								)
								set({ id: 1, market })
							}}
							onClick={() => {
								// mcontext.setMarket(market.id)
								let { snap, ...temp } = market
								// mcontext.setMarket(market.id)
								window.localStorage.setItem('market', JSON.stringify(temp))
								set({ id: 1, market })
							}}
						>
							<Image
								name={market.logo}
								className={classes.favAvatar}
								style={{
									maxHeight: '60px',
									minHeight: '60px',
									maxWidth: '60px',
									minWidth: '60px',
									borderRadius: '50%',
									objectFit: 'cover',
									marginRight: '1vw',
								}}
								type={'markets'}
								size="S"
								variant={'Fav'}
							/>

							<p
								style={{
									fontSize: '10px',
									textOverflow: 'ellipsis',
									maxWidth: '60px',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
								}}
							>
								{market.name}
							</p>
						</div>
					))
				) : (
					<div className={classes.none}>No Favorites yet</div>
				)}
			</div>
		</div>
	)
}
