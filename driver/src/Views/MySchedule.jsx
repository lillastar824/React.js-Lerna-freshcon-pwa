import React, { useEffect, useState } from 'react'
import { mySubscribtion } from '../utils/firebase'
import { days, get12HourClock } from '../utils/helper'
import {
	Typography,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Table,
	TableRow,
	TableCell,
	TableBody,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ExpandMore } from '@material-ui/icons'
const MarketDetail = withStyles(theme => ({
	root: {
		padding: 0,
	},
}))(ExpansionPanelDetails)

function MySchedule() {
	const [subs, load] = useState([])
	useEffect(() => {
		let ret = mySubscribtion({ load })

		return () => {
			if (ret) ret()
		}
	}, [])
	// group subs by day of the week
	let marketsByDays = days.map((day, index) => ({
		...day,
		markets: subs.filter(sub => sub.day === index),
	}))
	return marketsByDays.map(day => {
		if (day.markets.length) {
			// return if markets are found
			return (
				<ExpansionPanel TransitionProps={{ unmountOnExit: true }} key={day.id}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMore />}
						id={`${day.id}-header`}
					>
						<Typography>{day.name}</Typography>
					</ExpansionPanelSummary>
					<MarketDetail>
						<Table>
							<TableBody>
								{day.markets.map(market => (
									<TableRow key={market.id}>
										<TableCell align="center">
											<Typography color="primary">
												{get12HourClock(market.open)}-
												{get12HourClock(market.close)}
											</Typography>
										</TableCell>
										<TableCell>
											<div>
												<Typography style={{ fontWeight: 500 }}>
													{market.name}
												</Typography>
												<Typography variant="body2">
													{market.address}
												</Typography>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</MarketDetail>
				</ExpansionPanel>
			)
		} else {
			// if not null
			return null
		}
	})
}

export default MySchedule
