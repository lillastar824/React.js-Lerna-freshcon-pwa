import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	Popover,
	Switch,
	TextField,
	Typography,
} from '@material-ui/core'
import produce from 'immer'
import React, { useContext, useEffect, useState } from 'react'
import { dialogContext } from '../context'
import { updateInventory } from '../functions'

function Inventory() {
	const {
		view: {
			product: { inventory, ...product },
			state,
			el,
		},
		display,
	} = useContext(dialogContext)
	const [data, set] = useState(inventory)
	useEffect(
		() => () => {
			display(null)
		},
		[display]
	)
	function handleChange() {
		updateInventory({
			id: product.id,
			inventory: data,
		})
	}
	function handleClose() {
		display({ view: 1, state: false })
	}
	return (
		<Popover
			open={state}
			anchorEl={el}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			onClose={handleClose}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<Grid container spacing={2} style={{ width: '30em', margin: '1em' }}>
				<Grid item xs={4}>
					<FormControl>
						<InputLabel shrink htmlFor="amount">
							Inventory Amount
						</InputLabel>
						<TextField
							name="stock"
							margin="normal"
							value={data.stock}
							onChange={e =>
								set(
									produce(data, draft => {
										draft.stock = e.target.value
											? Number.parseInt(e.target.value)
											: 0
									})
								)
							}
							InputProps={{
								endAdornment: (
									<Button
										style={{
											color: 'white',
											backgroundColor: '#7CB342',
										}}
										onClick={() => {
											handleChange(data)
										}}
									>
										SET
									</Button>
								),
							}}
						/>
					</FormControl>
					<FormControl>
						<InputLabel shrink htmlFor="warning">
							Inventory Warning Amount
						</InputLabel>
						<TextField
							name="warning"
							margin="normal"
							value={data.warning}
							onChange={e =>
								set(
									produce(data, draft => {
										draft.warning = e.target.value
											? Number.parseInt(e.target.value)
											: 0
									})
								)
							}
							InputProps={{
								endAdornment: (
									<Button
										style={{
											color: 'white',
											backgroundColor: '#7CB342',
										}}
										onClick={() => {
											handleChange(data)
										}}
									>
										SET
									</Button>
								),
							}}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={8}>
					<Grid container>
						<Grid item>
							<Grid container justify="center" alignItems="center">
								<Typography display="block" variant="title">
									Automatic Update
								</Typography>
							</Grid>
						</Grid>
						<Grid item>
							<Switch
								name="auto"
								checked={data.auto}
								onChange={e => {
									if (Number.parseInt(data.warning)) {
										handleChange(
											set(
												produce(data, draft => {
													draft.auto = !draft.auto
												})
											)
										)
									}
								}}
							/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item>
							<Typography display="block" variant="subtitle1">
								Our automatic inventory update option will increase your
								inventory to the amount you set each week so you don't have to.
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Popover>
	)
}

export default Inventory
