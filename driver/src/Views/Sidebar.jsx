import React from 'react'
import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core'
import { Home, Event, AttachMoney, Face, Help } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

function Sidebar({ toggleDrawer }) {
	const history = useHistory()
	const items = [
		{
			text: 'Home',
			icon: <Home />,
			link: '/home',
		},
		{
			text: 'Schedule',
			icon: <Event />,
			link: '/schedule',
		},
		{
			text: 'Deposit',
			icon: <AttachMoney />,
			link: '/payout',
		},
		{
			text: 'Profile',
			icon: <Face />,
			link: '/profile',
		},
		{
			text: 'Help',
			icon: <Help />,
			link: '/help',
		},
	]
	return (
		<div role="presentation">
			<Divider />
			<List>
				{items.map((item, index) => (
					<ListItem
						button
						key={index}
						onClick={() => {
							history.push(item.link)
							toggleDrawer()
						}}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</div>
	)
}

export default Sidebar
