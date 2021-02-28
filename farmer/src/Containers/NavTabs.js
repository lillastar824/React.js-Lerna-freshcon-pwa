import React from 'react'
import { Tabs, Tab } from '@material-ui/core'
import HomeIcon from '../Components/HomeIcon'
import ManageMyItems from '../Components/ManageMyItems'
import MyNumbers from '../Components/MyNumbers'
import MyProfile from '../Components/MyProfile'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

const styles = makeStyles(theme => ({
	indicator: {
		backgroundColor: '#7CB342',
	},
	svg: {
		height: '2em',
		width: '2em',
	},
	tborder: {
		border: 'solid grey 1px',
		borderRadius: '5px',
		margin: '1em',
		backgroundColor: '#FFFFFF',
		height: '13vh',
		textTransform: 'none',
		'&$tabSelected': {
			backgroundColor: '#F9E957',
		},
	},
	tabSelected: {},
	pad: {
		[theme.breakpoints.up('md')]: {
			padding: '30px 150px',
		},
	},
}))
function NavTabs({ path }) {
	const classes = styles()
	return (
		<Tabs
			classes={{
				indicator: classes.indicator,
			}}
			className={classes.pad}
			value={path}
			variant="fullWidth"
			centered
		>
			<Tab
				component={Link}
				icon={<HomeIcon className={classes.svg} />}
				label="Home"
				className={classes.tborder}
				classes={{
					selected: classes.tabSelected,
				}}
				to="/"
			/>
			<Tab
				component={Link}
				icon={<ManageMyItems className={classes.svg} />}
				label="Manage My Items"
				className={classes.tborder}
				classes={{
					selected: classes.tabSelected,
				}}
				to="/manage"
			/>
			<Tab
				component={Link}
				icon={<MyNumbers className={classes.svg} />}
				label="My Numbers"
				className={classes.tborder}
				classes={{
					selected: classes.tabSelected,
				}}
				to="/numbers"
			/>
			<Tab
				component={Link}
				icon={<MyProfile className={classes.svg} />}
				label="My Profile"
				className={classes.tborder}
				classes={{
					selected: classes.tabSelected,
				}}
				to="/profile"
			/>
		</Tabs>
	)
}

export default NavTabs
