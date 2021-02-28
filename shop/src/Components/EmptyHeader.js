import React from 'react'
export function EmptyHeader() {
	return (
		<nav
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
				<a className="navbar-item" href="/home">
					<img
						src="Logo.svg"
						style={{ maxHeight: '45px' }}
						width="140"
						alt="logo"
					/>
				</a>
			</div>
		</nav>
	)
}
