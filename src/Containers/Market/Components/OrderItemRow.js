import metrics from '@greenery/all/lib/utils/metrics'
import {
	Button,
	InputAdornment,
	TableCell,
	TableRow,
	TextField,
} from '@material-ui/core'
import { Check as CheckIcon } from '@material-ui/icons'
import CloseIcon from '@material-ui/icons/Close'
import firebase from 'firebase/app'
import produce from 'immer'
import React, { useContext, useState } from 'react'
import { getPrice } from '../../../utils'
import { Image } from '../../Manage/Components/Image'
import { marketContext } from '../context'
import { useSnackbar } from 'notistack'

function checkProduct(market, { id, ...order }, index, actual) {
	const { uid } = firebase.auth().currentUser
	firebase
		.firestore()
		.collection('farmers')
		.doc(uid)
		.collection('subscribed')
		.doc(market)
		.collection('orders')
		.doc(id)
		.update(
			produce(order, draft => {
				draft.items[index].actual = actual
				draft.items[index].sum = actual * draft.items[index].price
				draft.items[index].status = true
				let total = 0
				for (let p of draft.items) {
					total += p.sum
				}
				draft.total = total
			})
		)
}

function OrderItemRow({ item, order, index }) {
	const context = useContext(marketContext)
	const [actual, set] = useState(order.items[index].actual)
	const snack = useSnackbar()
	return (
		<TableRow>
			<TableCell>
				<Image type="product" size="200x200" image={item.image}></Image>
			</TableCell>
			<TableCell>{item.name}</TableCell>
			<TableCell>{item.qty + metrics[item.metric - 1].unit}</TableCell>
			<TableCell>
				<TextField
					type="number"
					variant="outlined"
					value={actual}
					InputProps={{
						endAdornment: (
							<InputAdornment>{metrics[item.metric - 1].unit}</InputAdornment>
						),
					}}
					onChange={e => set(e.target.valueAsNumber)}
				/>
			</TableCell>
			<TableCell>{getPrice(item.sum)}</TableCell>
			<TableCell>
				{!item.status ? (
					<Button
						color="primary"
						variant="contained"
						startIcon={<CloseIcon />}
						onClick={() => {
							checkProduct(context.market.ref.id, order, index, actual)
							snack.enqueueSnackbar('order updated', {
								variant: 'info',
							})
						}}
					>
						Check
					</Button>
				) : (
					<Button disabled startIcon={<CheckIcon />}>
						Checked
					</Button>
				)}
			</TableCell>
		</TableRow>
	)
}

export default OrderItemRow
