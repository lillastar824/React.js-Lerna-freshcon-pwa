import React from 'react'
import CardInfo from './CardInfo'
import classes from './PaymentInfo.module.css'
function PaymentInfo({ card }) {
	return (
		<section
			className="section"
			style={{
				backgroundColor: '#F5F5F5',
				padding: '.7rem',
				display: 'grid',
				gridAutoColumns: '1fr auto 1fr',
			}}
		>
			<div
				className={`box`}
				style={{
					marginBottom: '0',
					padding: '0.5em 1em',
					borderRadius: '6px 6px 0 0',
				}}
			>
				<div className={classes.short}>
					<div>Payment :</div>

					{card.id ? (
						<CardInfo key={card.last4} card={card} short />
					) : (
						<div className={classes.short}>
							<p>No Cards Added</p>{' '}
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default PaymentInfo
