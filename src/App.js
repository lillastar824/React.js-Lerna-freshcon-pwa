import React from 'react'
import Routes from './router'
import { authContext } from './Context/Auth'
import { SnackbarProvider } from 'notistack'

class AuthLoad extends React.Component {
	static contextType = authContext
	render() {
		if (this.context.hasAuthLoaded) {
			return this.props.children
		} else {
			return <div>Loading</div>
		}
	}
}

export default () => (
	<AuthLoad>
		<SnackbarProvider
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<Routes />
		</SnackbarProvider>
	</AuthLoad>
)
