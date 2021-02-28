import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	TableRow,
	Button,
	Switch,
	IconButton,
	colors,
	Typography,
} from '@material-ui/core'
import {
	AddCircleOutline as AddCircleOutlineIcon,
	Edit as EditIcon,
	Clear as ClearIcon,
} from '@material-ui/icons'
import CustomTableCell from './CustomTableCell'
import { metrics } from '@greenery/all/lib/utils'
import { perOff, getPrice } from '../../../utils'
import { Image } from './Image'

const styles = makeStyles(theme => ({
	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
	button: {
		margin: theme.spacing(1),
		backgroundColor: '#FFFFFF',
	},
	leftIcon: {
		marginRight: theme.spacing(1),
		color: '#7CB342',
	},
	leftIconAdd: {
		marginRight: theme.spacing(1),
		color: '#EF6C00',
	},
	colorSwitchBase: {
		color: colors.green[300],
		'&$colorChecked': {
			color: colors.green[500],
			'& + $colorBar': {
				backgroundColor: colors.green[500],
			},
		},
	},
	colorBar: {},
	colorChecked: {},
	delete: {
		color: '#EF6C00',
	},
	discountPrice: {
		textDecoration: 'line-through',
	},
	discount: {
		color: 'red',
	},
	average: {
		color: '#EF6C00',
	},
}))

function Price({ product, unit }) {
	const classes = styles()
	return (
		<>
			<Typography
				classes={{
					root: product.discount ? classes.discountPrice : classes.none,
				}}
			>
				{getPrice(product.price)}
				{unit}
			</Typography>
			{product.discount !== 0 && (
				<Typography variant="caption" classes={{ root: classes.discount }}>
					{getPrice(perOff(product.price, product.discount)) + unit}
				</Typography>
			)}
		</>
	)
}

function AveragePrice({ product }) {
	let avg = 0
	if (product.average) avg = product.average
	const classes = styles()
	return (
		<>
			<Typography variant="caption">Compared to:</Typography>
			<Typography classes={{ root: classes.average }}>
				{getPrice(avg) + metrics[product.metric - 1].unit}
			</Typography>
		</>
	)
}

function ProductRow({
	open = false,
	product,
	handleInventory,
	editProduct,
	toggleProduct,
	deleteProduct,
}) {
	const classes = styles()
	let unit = metrics[product.metric - 1].unit
	return (
		<TableRow className={classes.row} key={product.name}>
			<CustomTableCell component="th" scope="row">
				<Image type="product" size="200x200" image={product.image}></Image>
			</CustomTableCell>
			<CustomTableCell>
				<Typography>{product.name}</Typography>
				{product.discount !== 0 && (
					<Typography variant="caption" classes={{ root: classes.discount }}>
						{product.discount}% Discount Applied
					</Typography>
				)}
			</CustomTableCell>
			<CustomTableCell>
				<Price product={product} unit={unit} />
			</CustomTableCell>
			<CustomTableCell>
				<AveragePrice product={product} />
			</CustomTableCell>
			<CustomTableCell>
				<Button
					label="25/bu"
					variant="contained"
					size="small"
					className={classes.button}
					onClick={handleInventory}
				>
					<AddCircleOutlineIcon className={classes.leftIconAdd} />
					{product.inventory.stock} Inventory Levels
				</Button>
			</CustomTableCell>
			<CustomTableCell>
				<Button
					variant="contained"
					size="small"
					className={classes.button}
					onClick={editProduct}
				>
					<EditIcon className={classes.leftIcon} />
					Edit Product Details
				</Button>
			</CustomTableCell>
			<CustomTableCell>
				<Switch
					checked={product.status}
					value="checkedA"
					classes={{
						switchBase: classes.colorSwitchBase,
						checked: classes.colorChecked,
					}}
					onChange={toggleProduct}
				/>
			</CustomTableCell>
			<CustomTableCell>
				<IconButton
					size="small"
					aria-label="Add"
					className={classes.delete}
					onClick={deleteProduct}
				>
					<ClearIcon />
				</IconButton>
			</CustomTableCell>
		</TableRow>
	)
}

export default ProductRow
