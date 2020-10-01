import React from 'react'
import {
	Typography,
	Grid,
	TextField,
	FormGroup,
	Checkbox,
	FormControlLabel,
	Box,
	ExpansionPanel,
	ExpansionPanelSummary,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { metrics } from '@greenery/all'
import produce from 'immer'
export function DynamicPricing({ values, pricing, markets, setPricing }) {
	return (
		<>
			<Grid container spacing={2} direction="row-reverse" justify="flex-end">
				<Grid item>
					<Typography>Average price in your area </Typography>
					<Box color="#EF6C00">
						${values.average}
						{values.metric === 0
							? ''
							: metrics.find(metric => metric.id === values.metric).unit}
					</Box>
				</Grid>
				<Grid item>
					<ExpansionPanel
						expanded={pricing.dynamic}
						onChange={(e, expanded) => {
							setPricing(
								produce(pricing, draft => {
									draft.dynamic = !pricing.dynamic
								})
							)
						}}
					>
						<ExpansionPanelSummary expandIcon={<ExpandMore />}>
							Dynamic
						</ExpansionPanelSummary>
					</ExpansionPanel>
				</Grid>
			</Grid>
			<Grid container direction="column">
				{pricing.dynamic &&
					markets.map((market, index) => (
						<Grid item key={index}>
							<FormGroup row={true}>
								<FormControlLabel
									control={
										<Checkbox
											checked={pricing.markets.some(e => e.id === market.id)}
											onChange={() => {
												if (pricing.markets.some(e => e.id === market.id)) {
													let i = pricing.markets.findIndex(
														m => m.id === market.id
													)
													setPricing(
														produce(pricing, draft => {
															draft.markets.splice(i, 1)
														})
													)
												} else
													setPricing(
														produce(pricing, draft => {
															draft.markets.push({
																id: market.id,
																price: 0,
															})
														})
													)
											}}
										/>
									}
									labelPlacement="end"
									label={market.name}
								/>
								{pricing.markets.some(i => i.id === market.id) ? (
									<TextField
										label="Price"
										name={`pricing[${index}].price`}
										id={`pricing[${index}].price`}
										value={pricing.markets.find(i => i.id === market.id).price}
										onChange={e => {
											let i = pricing.markets.findIndex(m => m.id === market.id)
											setPricing(
												produce(pricing, draft => {
													draft.markets[i].price = Number.parseFloat(
														e.target.value
													)
												})
											)
										}}
										type="number"
										margin="normal"
										variant="outlined"
									/>
								) : (
									<TextField disabled />
								)}
							</FormGroup>
						</Grid>
					))}
			</Grid>
		</>
	)
}
