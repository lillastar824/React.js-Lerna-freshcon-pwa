/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'

class Profile extends Component {
	render() {
		return (
			<div className="Profile">
				<section className="hero is-medium">
					<div className="hero-body">
						<div
							className="container"
							style={{ width: '100%', paddingTop: '2rem', textAlign: 'center' }}
						>
							<div className="columns">
								<div className="column">
									<img
										style={{ height: '30vh' }}
										src="/sticker.png"
										alt="sample"
									/>
								</div>
								<div className="column">
									<label className="label title is-1">
										Friends Care, Friends Share
									</label>
									<p>
										Share with 10 of your friends and get $10 off your next
										purchase
									</p>
								</div>
							</div>
							<div className="control has-text-centered ">
								<div className="box" style={{ width: '100%' }}>
									<label className="label">Share with Friends</label>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
											/>
										</div>
									</div>
									<button
										className="button"
										style={{ backgroundColor: '#EF6C00', color: '#FFFFFF' }}
									>
										Share
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default Profile
