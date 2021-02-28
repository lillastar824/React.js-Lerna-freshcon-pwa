/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import categories from '@greenery/all/lib/utils/categories'
function SaleHead({ market, category }) {
	return (
		<div
			className="level"
			style={{
				marginTop: '1em',
			}}
		>
			<div className="level-item">
				<nav className="breadcrumb" aria-label="breadcrumbs">
					<ul>
						<li>
							<a href="#">{market.name}</a>
						</li>
						<li>
							<a href="#">{category ? categories[category - 1].name : 'All'}</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default SaleHead
