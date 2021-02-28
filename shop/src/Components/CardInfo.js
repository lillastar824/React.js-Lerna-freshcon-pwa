import React from 'react'
import classes from './CardInfo.module.css'
import { ReactComponent as Generic } from '@greenery/all/src/cards/generic.svg'
import { ReactComponent as Master } from '@greenery/all/src/cards/mastercard.svg'
import { ReactComponent as Visa } from '@greenery/all/src/cards/visa.svg'
import { ReactComponent as Amex } from '@greenery/all/src/cards/amex.svg'
import { ReactComponent as Diner } from '@greenery/all/src/cards/diners.svg'
import { ReactComponent as Discover } from '@greenery/all/src/cards/discover.svg'
import { ReactComponent as JCB } from '@greenery/all/src/cards/jcb.svg'
import { ReactComponent as UnionPay } from '@greenery/all/src/cards/unionpay.svg'

function CardInfo({ card, short }) {
	function renderCard(brand) {
		if (brand === 'visa') return <Visa height="2rem" width="2rem" />
		if (brand === 'diners') return <Diner height="2rem" width="2rem" />
		if (brand === 'discover') return <Discover height="2rem" width="2rem" />
		if (brand === 'jcb') return <JCB height="2rem" width="2rem" />
		if (brand === 'UnionPay') return <UnionPay height="2rem" width="2rem" />
		if (brand === 'MasterCard') return <Master height="2rem" width="2rem" />
		if (brand === 'American Express') return <Amex height="2rem" width="2rem" />
		return <Generic height="2rem" width="2rem" />
	}
	return (
		<div
			className={`${classes.card}`}
			style={{
				gridTemplateColumns: `1fr auto ${short ? '' : '1fr'}`,
			}}
		>
			<div className={classes.brand}>{renderCard(card.brand)}</div>
			<div>{'**** **** **** ' + card.last4}</div>
			{!short && (
				<div className={classes.date}>
					<div>{card.exp_month}</div>/<div>{card.exp_year}</div>
				</div>
			)}
		</div>
	)
}

export default CardInfo
