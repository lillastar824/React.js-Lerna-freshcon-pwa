import React from 'react'
import OrderItems from './OrderItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { getPrice, getOriginalTotal } from '../utils/helpers'

function OrderDetail({ order, back }) {
	let home = order.items.some(i => i.delivery.type === 'home')
	return (
		<React.Fragment>
			<div onClick={back}>
				<FontAwesomeIcon icon={faArrowLeft} size="lg" />
			</div>
			<section className="section" style={{ paddingBottom: '0px' }}>
				<div className="field">
					<button
						className="button"
						style={{ backgroundColor: '#EF6C00', color: 'white' }}
					>
						Order Progress
					</button>
				</div>
				{
					// Progress
				}
				<ul
					style={{ marginTop: '2em' }}
					className="steps is-small is-centered has-content-centered"
				>
					<li
						className={`steps-segment ${
							order.state.length <= 1 ? 'has-gaps' : ''
						} ${order.state.length === 1 ? 'is-active' : ''}`}
					>
						<span className="steps-marker">
							<span className="icon">
								<i className="fa fa-shopping-cart"></i>
							</span>
						</span>
						<div className="steps-content">
							<p className="heading">Order Recieved</p>
							<p>
								{order.state.length >= 1
									? order.state[0].toDate().toLocaleString('en-US')
									: ''}
							</p>
						</div>
					</li>
					<li
						className={`steps-segment ${
							order.state.length <= 2 ? 'has-gaps' : ''
						} ${order.state.length === 2 ? 'is-active' : ''}`}
					>
						<span className="steps-marker">
							<span className="icon">
								<i className="fa fa-user"></i>
							</span>
						</span>
						<div className="steps-content">
							<p className="heading">Weight & Price Confirmation</p>
							{order.state.length >= 2
								? order.state[1].toDate().toLocaleString('en-US')
								: ''}
						</div>
					</li>
					{home && (
						<li
							className={`steps-segment ${
								order.state.length <= 3 ? 'has-gaps' : ''
							} ${order.state.length === 3 ? 'is-active' : ''}`}
						>
							<span className="steps-marker">
								<span className="icon">
									<i className="fas fa-dollar-sign"></i>
								</span>
							</span>
							<div className="steps-content">
								<p className="heading">Picked-up From Market</p>
								{order.state.length >= 3
									? order.state[2].toDate().toLocaleString('en-US')
									: ''}
							</div>
						</li>
					)}
					<li
						className={`steps-segment ${
							order.state.length <= 4 ? 'has-gaps' : ''
						} ${order.state.length === 4 ? 'is-active' : ''}`}
					>
						<span className="steps-marker">
							<span className="icon">
								<i className="fa fa-check"></i>
							</span>
						</span>
						<div className="steps-content">
							<p className="heading">Delivered</p>
							{order.state.length >= 4
								? order.state[3].toDate().toLocaleString('en-US')
								: ''}
						</div>
					</li>
				</ul>
			</section>
			<section className="section" style={{ paddingBottom: '0px' }}>
				<div className="field">
					<button
						className="button"
						style={{ backgroundColor: '#EF6C00', color: 'white' }}
					>
						Adjusted Order Total
					</button>
				</div>
				<div className="field">
					<p className="has-text-justified">
						All weighted items may be subject to small price change once your
						farmer weighs each item individually. You will be notified once the
						final weight has been submitted
					</p>
				</div>
				<div className="field">
					<div className="tags">
						<span
							className="tag is-small"
							style={{
								height: '8vh',
								border: '1px solid',
								borderColor: '#EBECF0',
								borderRadius: '15px',
							}}
						>
							<ul>
								<li className="has-text-weight-bold">{getPrice(order.sum)}</li>
								<li>Estimated price</li>
							</ul>
						</span>
						<h1 style={{ color: '#7CB342' }}>
							+ {getPrice(getOriginalTotal(order.items) - order.sum)} +
						</h1>
						<span
							className="tag is-small"
							style={{
								height: '8vh',
								border: '1px solid',
								borderColor: '#EBECF0',
								borderRadius: '15px',
								color: '#7CB342',
							}}
						>
							<ul>
								<li className="has-text-weight-bold">
									{getPrice(getOriginalTotal(order.items))}
								</li>
								<li>Adjusted price</li>
							</ul>
						</span>
					</div>
				</div>
			</section>
			<section className="section">
				<div className="field">
					<button
						className="button"
						style={{ backgroundColor: '#EF6C00', color: 'white' }}
					>
						My Items
					</button>
				</div>
				<OrderItems items={order.items} />
			</section>
		</React.Fragment>
	)
}

export default OrderDetail
