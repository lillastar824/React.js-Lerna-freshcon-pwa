import React from 'react'
import { getPrice } from '../utils/helpers'

function OrderItems({ order }) {
	return (
		<div className="OrderItems">
			<div className="columns">
				<div className="column is-one-quarter">
					<div className="box" style={{ minHeight: '44vh' }}>
						<article className="media">
							<div className="media-content">
								<div className="content">
									<p
										className="title is-5 has-text-weight-bold"
										style={{ color: '#7CB342' }}
									>
										Order Details :
									</p>
									<p>
										<strong>Ordered:</strong>{' '}
										{order.state[0].toDate().toLocaleString('en-US')}
									</p>
									<p>
										<strong>Market:</strong>{' '}
										{order.items.map(market => market.name)}
									</p>
									<p>
										<strong>Address:</strong>{' '}
										{order.items.map(market => market.address)}
									</p>
									<p>
										<strong>Total:</strong> {getPrice(order.total)}
									</p>
								</div>
							</div>
						</article>
					</div>
				</div>
				<div className="column is-three-quarters">
					<div className="box " style={{ minHeight: '44vh' }}>
						{/* <OrderedProduct /> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderItems
