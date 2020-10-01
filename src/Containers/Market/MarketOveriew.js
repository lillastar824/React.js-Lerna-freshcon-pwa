import React, { useContext } from 'react'
import {
	makeStyles,
	Grid,
	Typography,
	List,
	Select,
	MenuItem,
	ListItem,
	TextField,
	InputAdornment,
	InputBase,
} from '@material-ui/core'
import SvgManageMyItems from '../../Components/ManageMyItems'
import { getPrice } from '../../utils'
import { marketContext } from './context'

const styles = makeStyles(theme => ({
	titleMarket: {
		margin: theme.spacing(),
		color: 'white',
	},
	formControl: {
		margin: theme.spacing(3),
		backgroundColor: '#FFFFFF',
		borderRadius: 4,
		width: '9em',
	},
	marketTool: {
		backgroundColor: '#7CB342',
	},
	troot: {
		width: '100%',
		overflowX: 'auto',
	},

	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
	tool: {
		backgroundColor: '#616161',
		color: '#636361',
		position: 'relative',
		padding: '1.5em 0.75em',
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
	orders: {
		backgroundColor: 'white',
	},
}))

function NoOfOrders({ orders }) {
	const classes = styles()
	return (
		<ListItem>
			<TextField
				disabled
				id="outlined-adornment-order"
				size="small"
				variant="outlined"
				className={classes.orders}
				value={orders}
				InputProps={{
					classes: {
						input: classes.input,
					},
					startAdornment: (
						<InputAdornment position="start">
							<SvgManageMyItems />
						</InputAdornment>
					),
				}}
			/>
		</ListItem>
	)
}
function Revenue({ revenue }) {
	const classes = styles()
	return (
		<ListItem>
			<TextField
				disabled
				id="outlined-adornment-orderValue"
				size="small"
				variant="outlined"
				value={getPrice(revenue)}
				InputProps={{
					classes: {
						input: classes.input,
					},
				}}
			/>
		</ListItem>
	)
}
function MarketOveriew({ market }) {
	const { order, setOrder } = useContext(marketContext)
	const classes = styles()
	return (
		<div className={classes.tool}>
			<Grid container>
				<Grid item>
					<Typography variant="h6" className={classes.titleMarket}>
						{market.name} Orders
					</Typography>
					<List>
						<NoOfOrders orders={market.incomplete} />
						<Revenue revenue={market.potential} />
					</List>
				</Grid>
				<Grid item style={{ marginLeft: 'auto' }}>
					<Select
						value={order}
						onChange={e => {
							setOrder(e.target.value)
						}}
						input={
							<InputBase
								classes={{
									root: classes.formControl,
									input: classes.input,
								}}
							/>
						}
					>
						<MenuItem value={0}>Per Customer</MenuItem>
						<MenuItem value={1}>Per Metric</MenuItem>
					</Select>
				</Grid>
			</Grid>
		</div>
	)
}

MarketOveriew.propTypes = {}

export default MarketOveriew
