import React, { useContext, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router-dom'
import stlyes from './Payment.module.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { checkoutContext } from '../Pages/Checkout'
import { appContext } from '../Provider'

function Payment() {
	const { reset } = useContext(appContext)
	const { order } = useContext(checkoutContext)
	const history = useHistory()
	const [state, over] = useState(false)
	useEffect(() => {
		const MySwal = withReactContent(Swal)

		if (order.done === 'succeeded') {
			MySwal.fire({
				icon: 'success',
				title: 'Order',
				titleText: 'Order Success',
				timer: 2000,
				onClose: () => {
					over(true)
				},
			})
		}
		if (order.done === 'failure') {
			MySwal.fire({
				icon: 'error',
				title: 'Order',
				titleText: 'Payment failed',
				timer: 2000,
				onClose: () => {
					over(true)
				},
			})
		}
	}, [order])

	if (state) {
		reset()
		history.push('/orders')
	}
	return (
		<div className={stlyes.payment}>
			<Loader type="Bars" color={'#EF6C00'} height={100} width={100} />
			<div>Please Wait...</div>
			<div>Paying {order.total}</div>
		</div>
	)
}

export default Payment
