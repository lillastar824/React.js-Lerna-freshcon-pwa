import {
	makeStyles,
	Grid,
	Typography,
	Avatar,
	Chip,
	GridListTile,
	GridList,
} from '@material-ui/core'
import React, { useContext, useState, useEffect } from 'react'
import Order from './Order'
import firebase from 'firebase/app'
import { marketContext } from '../context'
import OrderHeader from './OrderHeader'

const styles = makeStyles((theme) => ({
	root: {
		width: '100%',
		height: '5em',
		padding: '0 1em',
	},
}))
function getAvailableDrivers(market, set) {
	const { uid } = firebase.auth().currentUser
	firebase
		.firestore()
		.collection('farmers')
		.doc(uid)
		.collection('subscribed')
		.doc(market.ref.id)
		.collection('drivers')
		.onSnapshot((snapshot) => {
			if (snapshot.empty) set([])
			else set(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
		})
}

function OrderByCustomer({ orders }) {
	const { market } = useContext(marketContext)
	const [drivers, setDrivers] = useState([])
	useEffect(() => {
		getAvailableDrivers(market, setDrivers)
	}, [market])
	const classes = styles()
	return (
		<div>
			<Grid
				container
				justify="space-between"
				alignItems="center"
				classes={{
					root: classes.root,
				}}
			>
				<Grid item>
					<Chip color="secondary" size="small" label="New Orders"></Chip>
				</Grid>
				<Grid item />
				<Grid item>
					<Typography> Harvest Carriers </Typography>
					{drivers.length === 0 && (
						<Typography variant="caption">No carriers</Typography>
					)}
					<GridList className={classes.gridList} cols={2.5}>
						{drivers.map((driver) => (
							<GridListTile key={driver.ref.id}>
								<Avatar alt={driver.name} />
							</GridListTile>
						))}
					</GridList>
				</Grid>
			</Grid>
			<div>
				<OrderHeader></OrderHeader>
				{orders.map((order, index) => (
					<Order order={order} key={index} />
				))}
			</div>
		</div>
	)
}

export default OrderByCustomer
