import React, { useState, useEffect } from 'react'
import {
	Typography,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Table,
	TableRow,
	TableCell,
	TableBody,
	Checkbox,
} from '@material-ui/core'
import { get12HourClock } from '../utils/helper'
import { withStyles } from '@material-ui/core/styles'
import { ExpandMore } from '@material-ui/icons'
import Layout from '../Views/Layout'
import {
	mySubscribtion,
	getMarketsByWeek,
	handleSubscribtion,
} from '../utils/firebase'

const MarketDetail = withStyles(theme => ({
	root: {
		padding: 0,
	},
}))(ExpansionPanelDetails)

function Schedule() {
	const [loading, done] = useState(true)
	const [subs, load] = useState([])
	const [data, set] = useState([])
	useEffect(() => {
		let ret = mySubscribtion({ load })
		done(false)

		return () => {
			if (ret) ret()
		}
	}, [])
	useEffect(() => {
		let l = true
		getMarketsByWeek().then(data => {
			let temp = data.map(day => ({
				...day,
				markets: day.markets.map(market => ({
					...market,
					subscribed: subs.some(m => market.id === m.id),
				})),
			}))
			if (l) set(temp)
		})
		return () => {
			l = false
		}
	}, [subs])

	return (
		<Layout>
			{loading ? (
				<div>loading</div>
			) : (
				data.map((day, idx) => (
					<ExpansionPanel
						TransitionProps={{ unmountOnExit: true }}
						key={day.id}
					>
						<ExpansionPanelSummary
							expandIcon={<ExpandMore />}
							id={`${day.id}-header`}
						>
							<Typography>{day.name}</Typography>
						</ExpansionPanelSummary>
						<MarketDetail>
							<Table>
								<TableBody>
									{day.markets.length ? (
										day.markets.map(market => (
											<TableRow key={market.id}>
												<TableCell padding="checkbox">
													<Checkbox
														checked={market.subscribed}
														disabled={idx > day.id}
														inputProps={{
															'aria-label': `select ${market.name}`,
														}}
														onChange={handleSubscribtion(market)}
													/>
												</TableCell>
												<TableCell>
													<Typography noWrap color="primary">
														{get12HourClock(market.open)}-
														{get12HourClock(market.close)}
													</Typography>
												</TableCell>
												<TableCell>{market.name}</TableCell>
												<TableCell>{market.address}</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell>No markets yet</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</MarketDetail>
					</ExpansionPanel>
				))
			)}
		</Layout>
	)
}

export default Schedule
