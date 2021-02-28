import React, { Fragment } from 'react'
import style from './OrderCompact.module.sass'
import { getStatus } from '../utils/status'
import { getPrice, getOriginalTotal } from '../utils/helpers'

function OrderCompact({ order, go = () => {} }) {
	let {
		customer: { name },
		sum,
		items,
		state,
		completed,
	} = order
	let home = items.some((i) => i.delivery.type === 'home')
	return (
		<div className={style.card}>
			<div className={style.content} onClick={go}>
				<div className={style.name}>
					Order: {name} {'\t' + state[0].toDate().toLocaleDateString('en-US')}{' '}
				</div>
				<div className={style.market}>
					<span style={{ fontWeight: 'bold' }}>Market: </span>
					{items.map((item) => (
						<span key={item}>{item.name}</span>
					))}
				</div>
				<div className={style.address}>
					<span style={{ fontWeight: 'bold' }}>Adress: </span> {''}
				</div>
			</div>
			<div className={style.status}>
				<div className={style.adjusted}>{getPrice(sum)}</div>
				<div className={style.plus}>
					<svg
						width="8"
						height="8"
						viewBox="0 0 5 5"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M2.5 0V5M0 2.5H5" stroke="#606060" />
					</svg>
				</div>
				<div className={style.price}>
					{getPrice(sum - getOriginalTotal(items))}
				</div>
			</div>
			<div className={style.line} />
			{completed ? (
				<div className={style.delivered}>COMPLETED</div>
			) : (
				<Fragment>
					<div className={style.states}>
						<ul className={`steps is-horizontal is-small is-primary`}>
							{Array.from({ length: home ? 4 : 3 }).map((_, index) => (
								<li
									key={index}
									className={`steps-segment ${
										index === state.length - 1 && 'is-active'
									}`}
								>
									<span href="#" className="steps-marker"></span>
								</li>
							))}
						</ul>
					</div>
					<div className={style.beam}>{getStatus(state, home)}</div>
				</Fragment>
			)}
		</div>
	)
}

export default OrderCompact
