import React, { useState, useEffect, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import {
	Checkbox,
	Table,
	TextField,
	InputAdornment,
	Paper,
} from '@material-ui/core'
import AlarmIcon from '@material-ui/icons/Alarm'
import EventNoteIcon from '@material-ui/icons/EventNote'
import { get12HourClock } from '../../../utils'
import firebase from 'firebase/app'
import { marketContext } from '../context'
import SearchIcon from '@material-ui/icons/Search'

const CustomTableCell = withStyles(theme => ({
	root: {
		whiteSpace: 'nowrap',
	},
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell)

const styles = theme => ({
	search: {
		marginTop: '2vh',
		marginBottom: '2vh',
		height: '2.5em',
	},

	table: {
		minWidth: 700,
	},
	demo: {},
	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
})
function changeSub(subs, market) {
	const { uid } = firebase.auth().currentUser
	let found = subs.some(mk => mk.ref.id === market.id)
	let index = subs.findIndex(mk => mk.ref.id === market.id)
	if (!found)
		firebase
			.firestore()
			.collection('farmers')
			.doc(uid)
			.collection('subscribed')
			.doc(market.id)
			.set({
				ref: firebase
					.firestore()
					.collection('markets')
					.doc(market.id),
				name: market.name,
				orders: 0,
				incomplete: 0,
				revenue: 0,
				potential: 0,
				status: true,
			})
	else
		firebase
			.firestore()
			.collection('farmers')
			.doc(uid)
			.collection('subscribed')
			.doc(market.id)
			.update({
				status: !subs[index].status,
			})
}
function ListMarkets({ classes, onSelect }) {
	const [markets, set] = useState([])
	const { subs } = useContext(marketContext)
	useEffect(() => {
		firebase
			.firestore()
			.collection('markets')
			.get()
			.then(snap => {
				if (!snap.empty)
					set(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
			})
	}, [])
	return (
		<Paper>
			<TextField
				id="outlined-adornment-search"
				className={classes.search}
				variant="outlined"
				placeholder="Search state, city, zipcode or name of the market"
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>

			<Table className={classes.table}>
				{markets.map(market => (
					<TableRow className={classes.row} key={market.id}>
						<CustomTableCell component="th" scope="row">
							<Checkbox
								checked={subs.some(
									subscribedMarket => subscribedMarket.ref.id === market.id
								)}
								onChange={() => changeSub(subs, market)}
								value="a"
								name="radio-button-demo"
								aria-label="A"
							/>
						</CustomTableCell>
						<CustomTableCell>{market.name}</CustomTableCell>
						<CustomTableCell>{market.address}</CustomTableCell>
						<CustomTableCell>
							<AlarmIcon className={classes.leftIconAdd} />
							Apr - Oct
						</CustomTableCell>
						<CustomTableCell>
							<EventNoteIcon className={classes.leftIcon} />
							{get12HourClock(market.open)}-{get12HourClock(market.close)}
						</CustomTableCell>
					</TableRow>
				))}
			</Table>
		</Paper>
	)
}

export default withStyles(styles)(ListMarkets)
