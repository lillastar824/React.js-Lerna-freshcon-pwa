import React from 'react'
import {
	ListItem,
	ExpansionPanelSummary,
	ExpansionPanel,
	Typography,
	ListItemText,
	ListItemAvatar,
	List,
	Avatar,
	ExpansionPanelDetails,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

function MarketOrders({ market }) {
	return (
		<ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
			<ExpansionPanelSummary
				style={{
					padding: '0 1em 0 0',
				}}
				expandIcon={<ExpandMore />}
				aria-controls="panel1bh-content"
				id="panel1bh-header"
			>
				<ListItem dense>
					<ListItemAvatar>
						<Avatar />
					</ListItemAvatar>
					<ListItemText
						primary={
							<Typography style={{ fontWeight: 500 }}>{market.name}</Typography>
						}
						secondary={
							<Typography variant="body2">{market.address}</Typography>
						}
					/>
				</ListItem>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				{market.orders.map(order => (
					<div>{order.customer.name}</div>
				))}
			</ExpansionPanelDetails>
		</ExpansionPanel>
	)
}

export default MarketOrders
