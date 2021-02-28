import {
	Button,
	makeStyles,
	fade,
	InputBase,
	Paper,
	Table,
	TableBody,
	Toolbar,
	Typography,
	IconButton,
	Switch,
	colors,
	FormControl,
	Select,
	MenuItem,
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useContext, useState, useEffect } from 'react'
import { dialogContext } from './context'
import { toggleProducts } from './functions'
import { SORTING } from './utils'

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		backgroundColor: 'white',
	},
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
	inputRoot: {
		color: 'white',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		color: 'white',
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))

function ProductTable({ children, products, onSearch, onSort, sort }) {
	const { display } = useContext(dialogContext)
	const [toggle, change] = useState(false)

	useEffect(() => {
		change(products.some((p) => p.status))
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
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Search…"
						onChange={(event) => {
							onSearch(event.target.value)
						}}
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
					/>
				</div>
				<FormControl className={classes.formControl}>
					<Select value={sort} onChange={onSort}>
						<MenuItem value={SORTING.DEFAULT}>Name</MenuItem>
						<MenuItem value={SORTING.PRICE}>Price</MenuItem>
					</Select>
				</FormControl>
				<span className={classes.end}>
					<Switch
						checked={toggle}
						value="checkedA"
						classes={{
							colorSecondary: classes.light,
							checked: classes.check,
							track: classes.track,
						}}
						onChange={(event) => {
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
