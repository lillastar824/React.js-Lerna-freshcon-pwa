import React, { useContext } from 'react'
import {
	Dialog,
	Grid,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Container,
} from '@material-ui/core'
import { DialogProvider, dialogContext } from './dialog'
import ListMarkets from './Components/ListMarkets'

function LayoutControl({ children }) {
	const context = useContext(dialogContext)
	return (
		<Container>
			<Grid container spacing={5} wrap="nowrap">
				<Grid item xs={4}>
					{children[0]}
				</Grid>
				<Grid item xs={8}>
					{React.Children.count(children) > 1 ? children[1] : <div />}
				</Grid>
			</Grid>
			<Dialog
				open={context.state}
				onClose={context.close}
				fullWidth
				maxWidth={'lg'}
			>
				<DialogContent>
					<DialogContentText>
						What markets do you want to add?
					</DialogContentText>

					<ListMarkets />
				</DialogContent>
				<DialogTitle>Select Markets</DialogTitle>
			</Dialog>
		</Container>
	)
}

function Layout({ children }) {
	return (
		<DialogProvider>
			<LayoutControl>{children}</LayoutControl>
		</DialogProvider>
	)
}

export default Layout
