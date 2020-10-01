import {
	Avatar,
	Badge,
	Button,
	CircularProgress,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContentText,
	DialogContent,
} from '@material-ui/core'
import { ExpandMore, Message } from '@material-ui/icons'
import firebase from 'firebase/app'
import React, { useContext, useState } from 'react'
import { getPrice } from '../../../utils'
import { marketContext } from '../context'
import OrderItemRow from './OrderItemRow'

function confirmOrder(market, order) {
	const { uid } = firebase.auth().currentUser
	firebase
		.firestore()
		.collection('farmers')
		.doc(uid)
		.collection('subscribed')
		.doc(market)
		.collection('orders')
		.doc(order.id)
		.update({
			completed: true,
		})
}

function Confirm({ market, order }) {
	const [open, set] = useState(false)
	function handleClose() {
		set(!open)
	}
	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Complete Order</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Has{' '}
						{order.delivery.type === 'home' ? 'carrier' : order.customer.name}{' '}
						picked up the order ?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							confirmOrder(market, order)
						}}
						color="primary"
						variant="contained"
					>
						Confirm
					</Button>
					<Button onClick={handleClose} color="primary" autoFocus>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
			<Button color="secondary" variant="contained" onClick={handleClose}>
				Complete
			</Button>
		</>
	)
}

function checkCompletness(order) {
	let cond = true
	for (let product of order.items) {
		if (product.status) cond = false
	}
	return cond
}
function completeActualMetric(market, { id }) {
	const { uid } = firebase.auth().currentUser
	firebase
		.firestore()
		.collection('farmers')
		.doc(uid)
		.collection('subscribed')
		.doc(market)
		.collection('orders')
		.doc(id)
		.update({
			state: new Date(),
		})
}
function Order({ order }) {
	const context = useContext(marketContext)
	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMore />}>
				<Grid
					container
					justify="space-between"
					alignItems="center"
					style={{
						width: '90%',
					}}
				>
					<Grid item>
						<Avatar />
					</Grid>
					<Grid item>
						<Typography>
							{order.orderedAt
								.toDate()
								.toLocaleString('en-US', { timeZone: 'America/New_York' })}
						</Typography>
					</Grid>
					<Grid item>
						<Typography>{order.customer.name}</Typography>
						<Typography variant="body2" color="textSecondary">
							{order.address}
						</Typography>
					</Grid>
					<Grid item>
						<Typography>{order.delivery.type}</Typography>
					</Grid>
					<Grid item>
						<Typography>{order.amount}</Typography>
					</Grid>
					<Grid item>
						<Typography color="secondary">{getPrice(order.total)}</Typography>
					</Grid>
					<Grid item>
						{order.delivery.type === 'home' ? (
							<Badge color="primary" variant="dot">
								<Tooltip
									title={order.delivery.type ? order.delivery.type : 'note'}
								>
									<Button variant="outlined">
										<Message fontSize="small" />
										<Typography>Note</Typography>
									</Button>
								</Tooltip>
							</Badge>
						) : (
							<Typography>None</Typography>
						)}
					</Grid>
				</Grid>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container direction="column" alignItems="flex-end">
					<Grid item>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell>Product Name</TableCell>
									<TableCell>Order Metric</TableCell>
									<TableCell>Actual Metric</TableCell>
									<TableCell>Revenue Earned</TableCell>
									<TableCell>Order Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{order.items.map((item, idx) => (
									<OrderItemRow
										item={item}
										order={order}
										key={idx}
										index={idx}
									/>
								))}
							</TableBody>
						</Table>
					</Grid>
					<Grid
						item
						style={{ paddingTop: '1em' }}
						container
						justify="space-between"
						alignItems="center"
					>
						{checkCompletness(order) ? (
							<Typography>Check in all items</Typography>
						) : order.state ? (
							order.delivery.type === 'home' ? (
								order.driver ? (
									<>
										<Grid
											item
											container
											alignItems="center"
											style={{ width: 'auto' }}
										>
											<Avatar />
											<span>{order.driver.name} will pick up</span>
										</Grid>
										<Grid item>
											<Confirm order={order} market={context.market.ref.id} />
										</Grid>
									</>
								) : (
									<>
										<span>
											<CircularProgress size={14} />
										</span>{' '}
										Finding Driver{' '}
									</>
								)
							) : (
								<>
									<Grid
										item
										container
										alignItems="center"
										style={{ width: 'auto' }}
									>
										<Avatar />
										<span> {order.customer.name} will pick up </span>
									</Grid>
									<Grid item>
										<Confirm order={order} market={context.market.ref.id} />
									</Grid>
								</>
							)
						) : (
							<Button
								color="secondary"
								variant="contained"
								onClick={() => {
									completeActualMetric(context.market.ref.id, order)
								}}
							>
								Ready For Pickup
							</Button>
						)}
					</Grid>
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	)
}

export default Order
