import React, { Component } from 'react'
import Routes from './router.js'
import AuthProvider from './Context/Auth.js'

class App extends Component {
	render() {
		return (
			<AuthProvider>
				<div className="App">
					<Routes />
				</div>
			</AuthProvider>
		)
	}
}

export default App
