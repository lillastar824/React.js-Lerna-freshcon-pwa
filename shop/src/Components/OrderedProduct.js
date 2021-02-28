import React, { Component } from 'react'
import DiscoverMore from './DiscoverMore'
import { metrics } from '@greenery/all'

const Modal = ({ children, closeModal, modalState, title }) => {
	if (!modalState) {
		return null
	}

	return (
		<div className="modal is-active">
			<div className="modal-background" onClick={closeModal} />
			<div className="modal-card" style={{ width: '80%' }}>
				<section className="modal-card-body is-paddingless">
					<div className="content">{children}</div>
				</section>
			</div>
		</div>
	)
}

function OrderedProduct() {
	return (
		<div className="columns" style={{ display: 'flex', overflowX: 'scroll' }}>
			{this.state.products.map((product) => (
				<div className="column" key={product.name} style={{ minWidth: '25vw' }}>
					<div
						className="card"
						onClick={this.toggleModal}
						style={{ borderRadius: '5px' }}
					>
						<div className="card-image">
							<div
								style={{
									position: 'absolute',
									right: 0,
									zIndex: 2,
								}}
							>
								<span className="icon">
									<img className="is-overlay" src="plusicon.svg" alt="sample" />
								</span>
							</div>
							<figure className="image is-marginless is-4by3">
								<img
									src="squash.webp"
									style={{ objectFit: 'cover' }}
									alt="sample"
								/>
							</figure>
						</div>
						<div className="card-content">
							<div className="media">
								<div className="media-content">
									<p className="title is-6">
										${product.price}
										{
											metrics.find((metrics) => metrics.id === product.metric)
												.unit
										}
									</p>
									<p className="subtitle is-6">
										{product.name} <br />
										<small>The Local Patch</small>
									</p>
								</div>
							</div>
						</div>
					</div>
					<Modal
						closeModal={this.toggleModal}
						modalState={this.state.modalState}
						title="Example modal title"
					>
						<section
							className="section is-paddingless"
							style={{ backgroundColor: '#F5F5F5' }}
						>
							<div className="section" style={{ backgroundColor: 'white' }}>
								<article className="media">
									<div className="media-left">
										<figure className="image">
											<img
												src="Radish.webp"
												style={{
													objectFit: 'cover',
													height: '40vh',
													width: '35vw',
												}}
												alt="sample"
											/>
										</figure>
									</div>
									<div className="media-content">
										<div className="content level">
											<p>
												<strong className="title is-4">{product.name}</strong>
												<br />
												Radical Root Farm
											</p>
											<p>
												{' '}
												<strong style={{ color: '#7CB342' }}>
													${product.price}
													{
														metrics.find(
															(metrics) => metrics.id === product.metric
														).unit
													}
												</strong>
											</p>
										</div>
										<div class="field">
											<div class="control">
												<div class="select">
													<select style={{ width: '25vw' }}>
														<option>0</option>
														<option>1</option>
														<option>2</option>
														<option>3</option>
														<option>4</option>
														<option>5</option>
													</select>
												</div>
											</div>
										</div>
										<button
											class="button"
											style={{ width: '25vw', marginBottom: '3vh' }}
										>
											Add to Cart
										</button>
										<nav className="level is-mobile">
											<div className="level-item">
												<p className="level-item" aria-label="reply">
													<span className="icon is-large">
														<i
															class="far fa-smile fa-2x"
															style={{ color: '#EF6C00' }}
														></i>
														<span>yay!</span>
													</span>
												</p>
												<p className="level-item" aria-label="retweet">
													<span className="icon is-large">
														<i class="far fa-frown fa-2x"></i>
														<span>Ehh!</span>
													</span>
												</p>
											</div>
										</nav>
									</div>
								</article>
							</div>
							<DiscoverMore />
							<section
								className="section is-paddingless"
								style={{ backgroundColor: 'white' }}
							>
								<div className="section">
									<nav className="level">
										<p className="level-item" aria-label="reply">
											<span className="icon is-large">
												<i class="fas fa-check-circle fa-3x"></i>
												<span>keto</span>
											</span>
										</p>
										<p className="level-item" aria-label="retweet">
											<span className="icon is-large">
												<i
													class="fas fa-check-circle fa-3x"
													style={{ color: '#7CB342' }}
												></i>
												<span>paleo</span>
											</span>
										</p>
										<p className="level-item" aria-label="retweet">
											<span className="icon is-large">
												<i
													class="fas fa-check-circle fa-3x"
													style={{ color: '#7CB342' }}
												></i>
												<span>Organic</span>
											</span>
										</p>
										<p className="level-item" aria-label="retweet">
											<span className="icon is-large">
												<i
													class="fas fa-check-circle fa-3x"
													style={{ color: '#7CB342' }}
												></i>
												<span>Vegan</span>
											</span>
										</p>
										<p className="level-item" aria-label="retweet">
											<span className="icon is-large">
												<i class="fas fa-check-circle fa-3x"></i>
												<span>GrassFed</span>
											</span>
										</p>
									</nav>
								</div>
								<div className="section">
									<p className="title is-5">Description</p>
									<p>
										{' '}
										Creamy harvest peach yogurt for the perfect breakfast on the
										go or afternoon snack. Gluten free; no artifical flavours,
										no high fructose corn syrup and no colors from artifical
										sources. Contains live and active cultures
									</p>
									<hr />
									<p className="title is-5">Nutrition</p>
									<p>
										{' '}
										Creamy harvest peach yogurt for the perfect breakfast on the
										go or afternoon snack. Gluten free; no artifical flavours,
										no high fructose corn syrup and no colors from artifical
										sources. Contains live and active cultures
									</p>
									<hr />
									<p className="title is-5">Producer</p>
									<p>
										{' '}
										Creamy harvest peach yogurt for the perfect breakfast on the
										go or afternoon snack. Gluten free; no artifical flavours,
										no high fructose corn syrup and no colors from artifical
										sources. Contains live and active cultures
									</p>
								</div>
							</section>
						</section>
					</Modal>
				</div>
			))}
		</div>
	)
}

export default OrderedProduct
