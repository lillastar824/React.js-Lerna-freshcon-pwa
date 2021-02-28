import React, { Fragment } from 'react'
import { metrics } from '@greenery/all/lib/utils'
import { getPrice, perOff } from '../utils/helpers'
import Image from '../Containers/Image'
// import { findMetricName } from '@greenery/all/lib/utils'

function OrderItems({ items }) {
	return (
		<div className="content">
			{items.map(market => (
				<Fragment>
					<div className="level" style={{ display: 'flex' }}>
						<div>
							<p>
								<strong>{market.name}</strong>
								<br />
							</p>
						</div>
						<div>
							<p> Total: {getPrice(market.sum)}</p>
						</div>
					</div>
					<hr style={{ borderBottom: '1px solid #616161' }} />
					{market.products.map(product => (
						<article className="media">
							<figure
								className="media-left"
								style={{ margin: '1em', marginTop: '0px' }}
							>
								<p className="image is-64x64">
									<Image
										type="products"
										size="L"
										name={product.image}
										variant="CartItem"
									/>
								</p>
							</figure>
							<div className="media-content">
								<div className="content">
									<p className="is-size-7">
										<strong>{product.name}</strong>
										<br />
										{product.farmer}
										<br />
										{getPrice(product.price) + metrics[product.metric - 1].unit}
									</p>
								</div>
							</div>
							<div className="media-content">
								<p>
									{getPrice(
										product.qty *
											(product.discount
												? perOff(product.price, product.discount)
												: product.price)
									)}
								</p>
							</div>
							<div className="media-content">
								<p>
									{' '}
									{getPrice(
										product.actual *
											(product.discount
												? perOff(product.price, product.discount)
												: product.price)
									)}
								</p>
							</div>
						</article>
					))}
				</Fragment>
			))}
		</div>
	)
}

export default OrderItems
