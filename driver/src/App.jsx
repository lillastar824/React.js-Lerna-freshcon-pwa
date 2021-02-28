import React, { createContext, useState, useContext, useEffect } from 'react'
import Routes from './routes'
import { auth } from './auth'
import Splash from './Views/Splash'
import { Helmet } from 'react-helmet'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import firebase from 'firebase/app'

export const appContext = createContext()

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#EF6C00',
		},
		secondary: {
			main: '#7CB342',
		},
	},
	status: {
		danger: orange[500],
	},
})

function App() {
	const [state, set] = useState({ drawer: false, profile: null })
	const context = useContext(auth)
	useEffect(() => {
		if (context) {
			set({
				profile: context.user,
			})
		}
	}, [context])

	if (context.user === 'loading') return <Splash />
	return (
		<ThemeProvider theme={theme}>
			<appContext.Provider value={{ state, set }}>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Freshconn Driver</title>
				</Helmet>
				<Routes />
			</appContext.Provider>
		</ThemeProvider>
	)
}

export default App
