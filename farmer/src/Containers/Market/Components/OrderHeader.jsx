import React from 'react'
import { Typography, Grid } from '@material-ui/core'

function OrderHeader() {
	return (
		<Grid
			container
			justify="space-between"
			alignItems="center"
			style={{
				width: '90%',
			}}
		>
			<Grid item>
				<Typography></Typography>
			</Grid>
			<Grid item>
				<Typography>Date</Typography>
			</Grid>
			<Grid item>
				<Typography>Name</Typography>
			</Grid>
			<Grid item>
				<Typography>Type</Typography>
			</Grid>
			<Grid item>
				<Typography>Total</Typography>
			</Grid>
			<Grid item>
				<Typography>Note</Typography>
			</Grid>
			<Grid item>
				<Typography></Typography>
			</Grid>
		</Grid>
	)
}

export default OrderHeader
