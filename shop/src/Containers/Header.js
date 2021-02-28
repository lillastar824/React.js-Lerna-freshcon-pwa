/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { marketContext } from '../Pages/Market'
import CartIcon from '../Components/CartIcon'
import MarketIcon from '../Components/Icons/MarketIcon'
import MyProfile from '../Components/Icons/MyProfile'
import House from '../Components/Icons/House'
import Cart from '../Components/Icons/Cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { ChevronDown } from 'react-feather'
import firebase from 'firebase/app'
import { appContext } from '../Provider'
import classes from './Header.module.css'

function Header({ draw, children }) {
	const currentUser = firebase.auth().currentUser
	const context = useContext(marketContext)
	const { reset } = useContext(appContext)
	const history = useHistory()
	return (
		<div
			style={{
				position: 'sticky',
				top: '0',
				zIndex: '99',
			}}
		>
			<div
				className="navbar"
				role="navigation"
				aria-label="main navigation"
				style={{
					display: 'flex',
					justifyItems: 'center',
					minHeight: '63px',
					backgroundColor: '#7CB342',
				}}
			>
				<div className="navbar-brand">
					<Link to={'/'} className="navbar-item">
						<img
							src="/Logo.svg"
							style={{ maxHeight: '45px' }}
							width="140"
							alt="logo"
						/>
					</Link>
				</div>

				<div
					className="navbar-end"
					style={{
						display: 'flex',
						justifyItems: 'center',
						marginLeft: 'auto',
					}}
				>
					<div role="button" tabIndex="0" className="navbar-item">
						<span
							style={{ color: '#FFFFFF', height: '41px', width: '41px' }}
							className="icon"
						>
							<FontAwesomeIcon icon={faSearch} />
						</span>
					</div>
					<div
						role="button"
						tabIndex="0"
						className={`navbar-item ${classes.onlyweb}`}
					>
						<div className="dropdown is-hoverable">
							<div className="dropdown-trigger">
								<button
									className="button"
									aria-haspopup="true"
									aria-controls="dropdown-menu2"
									style={{ color: 'white', backgroundColor: '#7CB342' }}
								>
									<span style={{ fontWeight: 'bold' }}>Account</span>
									<span className="icon" style={{ height: '1em' }}>
										<ChevronDown />
									</span>
								</button>
							</div>
							<div className="dropdown-menu" id="dropdown-menu2" role="menu">
								<div className="dropdown-content">
									<div className="dropdown-item">
										<p className={classes.level2}>
											Hi,{' '}
											<strong
												style={{
													fontSize: '24px',
													textTransform: 'capitalize',
												}}
											>
												{currentUser.displayName}
											</strong>
										</p>
									</div>
									<hr className="dropdown-divider" />
									<div className="dropdown-item">
										<Link to="/profile" style={{ display: 'inline-block' }}>
											<p className={classes.level2}>Your Account</p>
										</Link>
									</div>
									<div className="dropdown-item">
										<Link to="/orders" style={{ display: 'inline-block' }}>
											<p className={classes.level2}>Your Orders</p>
										</Link>
									</div>
									<div className="dropdown-item">
										<p className={classes.level2}>Coupon Codes</p>
									</div>
									<div className="dropdown-item">
										<p className={classes.level2}>How Freshconn works</p>
									</div>
									<hr className="dropdown-divider" />
									<div href="#" className="dropdown-item">
										<button
											className={classes.level2}
											style={{ border: 'none', cursor: 'pointer' }}
											onClick={() => {
												reset()
												window.localStorage.clear()
												firebase.auth().signOut()
											}}
										>
											Logout
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="navbar-item">
						<a
							onClick={() => {
								if (history.location.pathname === '/market')
									context.set({ ...context.view, id: 0 })
								else history.push('/')
							}}
						>
							<span
								role="button"
								tabIndex="0"
								style={{ color: '#FFFFFF', height: '41px', width: '41px' }}
								className="icon"
							>
								<FontAwesomeIcon icon={faStore} />
							</span>
						</a>
					</div>
					<div className="navbar-item" style={{ cursor: 'pointer' }}>
						<CartIcon open={draw} />
					</div>
				</div>
			</div>
			<section className={classes.mobileheader}>
				<div className={`tabs ${classes.tabview}`} style={{ width: '100%' }}>
					<ul className={classes.tabpad}>
						<li
							className={
								history.location.pathname === '/market' && context.view.id === 1
									? 'is-active'
									: ''
							}
						>
							<a
								style={{ display: 'inline-block' }}
								onClick={() => {
									if (history.location.pathname === '/market')
										context.set({ ...context.view, id: 1 })
									else history.push('/')
								}}
							>
								<div
									className={classes.icondisplay}
									style={{ textAlign: 'center' }}
								>
									<span className="icon">
										<House />
									</span>
								</div>
								<span>Home</span>
							</a>
						</li>
						<li className={context && context.view.id === 2 ? 'is-active' : ''}>
							{/* // TODO: link for sales */}
							<a
								role="button"
								style={{ display: 'inline-block' }}
								onClick={() => {
									if (history.location.pathname !== '/market')
										history.push('/market', { id: 2 })
									else context.set({ ...context.view, id: 2 })
								}}
							>
								<div
									className={classes.icondisplay}
									style={{ textAlign: 'center' }}
								>
									<span className="icon">
										<MarketIcon />
									</span>
								</div>
								<span>Sales</span>
							</a>
						</li>
						<li
							className={
								history.location.pathname === '/orders' ? 'is-active' : ''
							}
						>
							<Link to="/orders" style={{ display: 'inline-block' }}>
								<div
									className={classes.icondisplay}
									style={{ textAlign: 'center' }}
								>
									<span className="icon">
										<Cart />
									</span>
								</div>
								<span>My Orders</span>
							</Link>
						</li>
						<li
							className={
								history.location.pathname === '/profile' ? 'is-active' : ''
							}
						>
							<Link to="/profile" style={{ display: 'inline-block' }}>
								<div
									className={classes.icondisplay}
									style={{ textAlign: 'center' }}
								>
									<span className="icon">
										<MyProfile />
									</span>
								</div>
								<span>Profile</span>
							</Link>
						</li>
					</ul>
				</div>
			</section>
			{children && children}
		</div>
	)
}

export default Header
