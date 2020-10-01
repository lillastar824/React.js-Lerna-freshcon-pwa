import { Button, Grid, Paper, Popover, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import React, { useContext, useEffect, useState } from 'react'
import { dialogContext } from '../context'
import { deleteProduct } from '../functions'

function DeleteConfirmation() {
	const {
		display,
		view: { product, state, el },
	} = useContext(dialogContext)
	const [loading, load] = useState(false)
	useEffect(
		() => () => {
			display(null)
		},
		[display]
	)
	function handleClose() {
		display({ id: 2, state: false })
	}
	function handleDelete() {
		load(true)
		deleteProduct({ product }).then(() => {
			load(false)
		})
	}
	return (
		<Popover
			anchorEl={el}
			open={state}
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
			{loading ? (
				<CircularProgress
					size={18}
					style={{ height: '2rem', width: '2rem', padding: '1rem' }}
				/>
			) : (
				<Paper>
					<Typography align="center">Are you sure</Typography>
					<Grid container>
						<Grid item>
							<Button onClick={handleDelete}>Yes</Button>
						</Grid>
						<Grid item>
							<Button onClick={handleClose}>No</Button>
						</Grid>
					</Grid>
				</Paper>
			)}
		</Popover>
	)
}

export default DeleteConfirmation
