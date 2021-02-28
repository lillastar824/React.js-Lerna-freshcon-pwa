import React from 'react'

function WelcomeContainer({ children }) {
	return (
		<section
			className="hero is-fullheight"
			style={{
				position: 'relative',
			}}
		>
			<picture>
				<source srcSet={process.env.PUBLIC_URL + '/ban.jpg'} />
				<source srcSet={process.env.PUBLIC_URL + '/ban.webp'} />
				<img
					style={{
						position: 'absolute',
						objectFit: 'cover',
						height: '100%',
					}}
					src={process.env.PUBLIC_URL + '/ban.webp'}
					alt="Flowers"
				></img>
			</picture>

			<div
				className="hero-body"
				style={{
					backdropFilter: 'brightness(40%)',
					WebkitBackdropFilter: 'brightness(40%)',
				}}
			>
				<div className="container">
					<div
						class="title is-size-2 has-text-weight-bold"
						style={{
							display: 'flex',
							lineHeight: '1.75rem',
							justifyContent: 'center',
							color: 'white',
							textAlign: 'center',
							fontWeight: 'bolder',
						}}
					>
						Fresh groceries
					</div>
					<div
						class="title is-size-2 has-text-weight-bold"
						style={{
							display: 'flex',
							lineHeight: '1.75rem',
							justifyContent: 'center',
							color: 'white',
							textAlign: 'center',
							fontWeight: 'bolder',
						}}
					>
						delivered from local
					</div>
					<div
						class="title is-size-2 has-text-weight-bold"
						style={{
							display: 'flex',
							lineHeight: '1.75rem',
							justifyContent: 'center',
							color: 'white',
							textAlign: 'center',
							paddingBottom: '1em',
							fontWeight: 'bolder',
						}}
					>
						farm stands
					</div>
					{children}
				</div>
			</div>
		</section>
	)
}

export default WelcomeContainer
