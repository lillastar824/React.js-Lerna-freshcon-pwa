import React from 'react'

function HowItWorks() {
	return (
		<div>
			<section
				className="hero is-fullheight"
				style={{ backgroundColor: '#F5F5F5', alignItems: 'center' }}
			>
				<div className="container" style={{ margin: '1em' }}>
					<h1
						className="title is-1 has-text-weight-bold"
						style={{ color: '#616161', paddingTop: '2rem' }}
					>
						How It Works
					</h1>
					<div className="box">
						<article>
							<div className="columns">
								<div className="column" style={{ textAlign: 'center' }}>
									<img
										style={{ height: '96px', width: '96px' }}
										src="Hand.svg"
										alt="hand"
									/>
								</div>
							</div>
							<div className="content has-text-centered">
								<p>
									<strong>Order farm fresh food</strong>
									<br />
									Select your favorite market and order fresh, local groceries
									from local farmers and artisans in your state.
								</p>
							</div>
						</article>
					</div>
					<div className="box">
						<article>
							<div className="columns">
								<div className="column" style={{ textAlign: 'center' }}>
									<img
										style={{ height: '96px', width: '96px' }}
										src="Car.svg"
										alt="car"
									/>
								</div>
							</div>
							<div className="content has-text-centered">
								<p>
									<strong>We pick-up from the farmers market</strong>
									<br />
									Trained Harvest Carriers pick-up your order at the farmers
									market and head for your home, office, gym and other
									locations.
								</p>
							</div>
						</article>
					</div>
					<div className="box">
						<article>
							<div className="columns">
								<div className="column" style={{ textAlign: 'center' }}>
									<img
										style={{ height: '96px', width: '96px' }}
										src="Box.svg"
										alt="box"
									/>
								</div>
							</div>
							<div className="content has-text-centered">
								<p>
									<strong>
										Get your local groceries delivered to your door
									</strong>
									<br />
									Recive a fresh, insulated tote of groceries the market's hours
									of operation.
								</p>
							</div>
						</article>
					</div>
				</div>
				<div
					className="container"
					style={{ margin: '.5em', paddingTop: '2rem' }}
				>
					<h1 className="title is-1 has-text-weight-bold">F.A.Q.</h1>
					<strong style={{ margin: '.5em' }}>
						What if I need to cancel my order?
					</strong>
					<div className="box" style={{ margin: '.5em' }}>
						<article className="media">
							<div className="media-content">
								<div className="content">
									<p>
										You can cancel your order upto 48 hours before the selected
										market's date of operation. Within the 48 hour window,
										Orders will be final unless there is an issue with the
										quality of your order.
									</p>
								</div>
							</div>
						</article>
					</div>
					<strong style={{ margin: '.5em' }}>Is there an order minimum?</strong>
					<div className="box" style={{ margin: '.5em' }}>
						<article className="media">
							<div className="media-content">
								<div className="content">
									<p>Freshconn does not require a minimum order amount.</p>
								</div>
							</div>
						</article>
					</div>
					<strong style={{ margin: '.5em' }}>
						Can I order from Freshconn in my town?
					</strong>
					<div className="box" style={{ margin: '.5em' }}>
						<article className="media">
							<div className="media-content">
								<div className="content">
									<p>
										Freshconn is offered in selected cities and towns throughout
										the United States. If you want to bring Freshconn to your
										city,reach out to us at hellofreshconn@gmail.com
									</p>
								</div>
							</div>
						</article>
					</div>
					<strong style={{ margin: '.5em' }}>
						What is Freshconn's delivery hours?
					</strong>
					<div className="box" style={{ margin: '.5em' }}>
						<article className="media">
							<div className="media-content">
								<div className="content">
									<p>
										Freshconn's harvest carriers deliver all orders during the
										market, food hub, CSA or farm stand hours of operation. Due
										to the unpredictable nature of traffic or car issues, some
										orders may be delivered later than expected windows of time.
									</p>
								</div>
							</div>
						</article>
					</div>
					<strong style={{ margin: '.5em' }}>
						What is Freshconn's delivery fees?
					</strong>
					<div className="box" style={{ margin: '.5em' }}>
						<article className="media">
							<div className="media-content">
								<div className="content">
									<p>
										Delivery fee: $9.99
										<br />
										Pick-up: Free
										<br />
										Please note that an additional delivery fee of $9.99 will be
										added to each market you order from.
									</p>
								</div>
							</div>
						</article>
					</div>
					<strong style={{ margin: '.5em' }}>
						How does my order stay fresh in transit?
					</strong>
					<div className="box" style={{ margin: '.5em' }}>
						<article className="media">
							<div className="media-content">
								<div className="content">
									<p>
										All Freshconn orders are delivered in insulated totes to
										preserve freshness and quality of food. if you are not home
										for delivery, our insulated totes will keep your food fresh
										2-4 hours after delivery is depending on the weather. We do
										not restock orders fter the order cut off day 48 hours
										before the delivery day.
									</p>
								</div>
							</div>
						</article>
					</div>
					<strong style={{ padding: '.5em' }}>
						What if I am not completely satisfied with my order?
					</strong>
					<div className="box" style={{ margin: '.5em' }}>
						<article className="media">
							<div className="media-content">
								<div className="content">
									<p>
										If you are not satisfied with your order,please contact us
										at (401)594-9438 or email us at hellofreshconn@gmail.com
									</p>
								</div>
							</div>
						</article>
					</div>
				</div>
			</section>
		</div>
	)
}

export default HowItWorks
