import React, { useContext } from 'react'
import {
	Drawer,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { appContext } from '../App'
import Sidebar from './Sidebar'

function Layout({ children }) {
	const context = useContext(appContext)
	function handleClose() {
		context.set(state => ({
			...state,
			drawer: false,
		}))
	}
	function handleOpen() {
		context.set(state => ({
			...state,
			drawer: true,
		}))
	}
	return (
		<>
			<Drawer open={context.state.drawer} onClose={handleClose}>
				<Sidebar toggleDrawer={handleClose} />
			</Drawer>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" aria-label="drawer" onClick={handleOpen}>
						<MenuIcon htmlColor="white" />
					</IconButton>
					<Typography variant="h6">Driver</Typography>
				</Toolbar>
			</AppBar>
			{children}
		</>
	)
}

export default Layout
