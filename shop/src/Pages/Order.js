/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import AppLayout from '../Containers/AppLayout'
import OrderHistory from '../Containers/OrderHistory'
import OrderDetail from '../Components/OrderDetail'
import ActiveOrders from '../Containers/ActiveOrders'

function Tabs({ set, view }) {
	return (
		<div className="tabs is-centered">
			<ul>
				<li className={`${view.id === 0 && 'is-active'}`}>
					<a
						role="button"
						tabIndex="0"
						onClick={() => set({ id: 0 })}
						onKeyDown={() => set({ id: 0 })}
					>
						Active Orders
					</a>
				</li>
				<li className={`${view.id === 1 && 'is-active'}`}>
					<a
						role="button"
						tabIndex="0"
						onClick={() => set({ id: 1 })}
						onKeyDown={() => set({ id: 0 })}
					>
						OrderHistory
					</a>
				</li>
			</ul>
		</div>
	)
}

function Order() {
	const [view, set] = useState({ id: 0 })
	function getView(view) {
		switch (view.id) {
			case 0:
				return <ActiveOrders go={set} />
			case 1:
				return <OrderHistory go={set} />
			default:
				return <div>NotFound</div>
		}
	}
	return (
		<AppLayout>
			<Tabs set={set} view={view} />
			{view.id < 3 ? (
				getView(view)
			) : (
				<OrderDetail
					order={view.order}
					back={() => {
						set({ id: 0 })
					}}
				/>
			)}
		</AppLayout>
	)
}

export default Order
