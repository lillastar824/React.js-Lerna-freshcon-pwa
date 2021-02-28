import React from 'react'
import { Link } from 'react-router-dom'
export function WelcomeHeader() {
	return (
		<nav
			className="navbar"
			role="navigation"
			aria-label="main navigation"
			style={{
				display: 'flex',
				justifyItems: 'center',
				minHeight: '63px',
				//TODO: change color
				backgroundColor: '#7CB342',
			}}
		>
			<div className="navbar-brand">
				<Link className="navbar-item" to="/">
					<img
						src={`${process.env.PUBLIC_URL + '/Logo.svg'}`}
						style={{ maxHeight: '45px' }}
						width="140"
						alt="logo"
					/>
				</Link>
			</div>
		</nav>
	)
}
