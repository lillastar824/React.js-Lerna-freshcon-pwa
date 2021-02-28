import React from 'react'
import classes from './home.module.css'
import Image from './Image'
export function MarketBanner({ market }) {
	let publicBanner = process.env.PUBLIC_URL + '/banner.webp'
	return (
		<div
			style={{
				backgroundImage: `linear-gradient(rgba(62, 71, 79, 0.4),rgba(62, 71, 79, 0.4)),url(${publicBanner})`,
			}}
		>
			<section
				className="section"
				style={{
					backdropFilter: 'brightness(70%)',
				}}
			>
				<div className="container">
					<div className={classes.bannerimage}>
						<div style={{ textAlign: 'center' }}>
							<Image
								style={{
									border: '2px solid',
									height: '128px',
									width: '128px',
									objectFit: 'cover',
									borderRadius: '50%',
									borderColor: 'white',
								}}
								name={market.logo}
								size="S"
								type="markets"
								variant={'MarketBanner'}
							/>
						</div>
						<div className={classes.webcontent}>
							<p className="has-text-white">
								<strong className="is-size-5 has-text-white">
									You're shopping at
								</strong>

								<strong className="is-size-3 has-text-white">
									{' '}
									{market.name}
								</strong>
							</p>
							<span className="is-size-6 has-text-white">{market.mission}</span>
						</div>
					</div>
					<div className={classes.mobilecontent}>
						<p className="has-text-white has-text-centered">
							<span>You're shopping at</span>
							<br />
							<strong className="is-size-3 has-text-white">
								{' '}
								{market.name}
							</strong>
						</p>
					</div>
				</div>
			</section>
		</div>
	)
}
