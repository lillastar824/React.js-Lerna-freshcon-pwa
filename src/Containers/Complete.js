import React, { useEffect } from 'react'
import { Button, Grid } from '@material-ui/core'
import firebase from 'firebase/app'
import { useHistory } from 'react-router-dom'
export function Complete({ next }) {
	const history = useHistory()
	useEffect(() => {
		const { uid } = firebase.auth().currentUser
		firebase
			.firestore()
			.collection('farmers')
			.doc(uid)
			.update({
				welcome: false,
			})
	}, [])
	return (
		<Grid container spacing={2} justify="center">
			<Grid item>
				<Button onClick={() => history.push('/')}>GET STARTED</Button>
			</Grid>
		</Grid>
	)
}
