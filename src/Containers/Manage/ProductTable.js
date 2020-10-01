import {
	Button,
	makeStyles,
	Paper,
	Table,
	TableBody,
	Toolbar,
	Typography,
	IconButton,
	Switch,
	colors,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useContext, useState, useEffect } from 'react'
import { dialogContext } from './context'
import { toggleProducts } from './functions'

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(7),
		overflowX: 'auto',
	},
	tool: {
		backgroundColor: '#7CB342',
	},
	title: {
		color: 'white',
		fontWeight: 'bolder',
	},
	green: {
		color: '#7CB342',
	},
	add: {
		marginLeft: '1em',
		backgroundColor: 'white',
	},
	colorSwitchBase: {
		color: 'white',
		'&$colorChecked': {
			color: colors.green[500],
			'& + $colorBar': {
				backgroundColor: 'white',
			},
		},
	},
	colorBar: {},
	colorChecked: {},
	end: {
		position: 'absolute',
		right: 0,
		marginRight: '7em',
	},
	light: {
		'&$check': {
			color: colors.green[200],
		},
		'&$check + $track': {
			backgroundColor: 'white',
		},
	},
	track: {
		backgroundColor: 'white',
	},
	check: {},
}))

function ProductTable({ children, products }) {
	const { display } = useContext(dialogContext)
	const [toggle, change] = useState(false)
	useEffect(() => {
		change(products.some(p => p.status))
	}, [products])
	const classes = useStyles()
	return (
		<Paper className={classes.root}>
			<Toolbar className={classes.tool}>
				<IconButton />
				<Typography variant="h6" className={classes.title}>
					My Products
				</Typography>

				<Button
					variant="contained"
					classes={{
						contained: classes.add,
						label: classes.green,
					}}
					onClick={() => {
						display({ id: 0, state: true, type: 'add' })
					}}
				>
					+ New Item
				</Button>
				<span className={classes.end}>
					<Switch
						checked={toggle}
						value="checkedA"
						classes={{
							colorSecondary: classes.light,
							checked: classes.check,
							track: classes.track,
						}}
						onChange={event => {
							toggleProducts(products, event.target.checked)
						}}
					/>
				</span>
			</Toolbar>

			<Table className={classes.table}>
				<TableBody>{children}</TableBody>
			</Table>
		</Paper>
	)
}

ProductTable.propTypes = {
	children: PropTypes.node.isRequired,
}

export default ProductTable
