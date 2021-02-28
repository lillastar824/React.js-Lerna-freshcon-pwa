import {
	Avatar,
	Button,
	Chip,
	FormGroup,
	Grid,
	Paper,
	TextField,
} from '@material-ui/core'
import firebase from 'firebase/app'
import React, { useState } from 'react'
import produce from 'immer'
import { styles } from './Profile'
import { useSnackbar } from 'notistack'
function Password() {
	const [state, set] = useState({ current: '', password: '', confirm: '' })
	const [error, raise] = useState(false)
	const snack = useSnackbar()
	const classes = styles()
	return (
		<Paper>
			<form
				onSubmit={async e => {
					e.preventDefault()

					const user = firebase.auth().currentUser

					const condition = state.password === state.confirm
					raise(!condition)
					if (condition) {
						let credential = firebase.auth.EmailAuthProvider.credential(
							user.email,
							state.current
						)
						try {
							await user.reauthenticateWithCredential(credential)
							await user.updatePassword(state.confirm)
							snack.enqueueSnackbar('Password Changed', {
								variant: 'success',
							})
						} catch (e) {
							console.log(e)
							snack.enqueueSnackbar('Wrong Password', {
								variant: 'error',
							})
							raise(true)
						}
					}
				}}
			>
				<Grid container spacing={2} justify="space-around">
					<Grid item xs={8}>
						<Chip
							avatar={<Avatar className={classes.avatar}>3</Avatar>}
							label="Change your password here"
							className={classes.chip}
							color="primary"
						/>

						<FormGroup>
							<TextField
								type="password"
								label="Current Password"
								margin="normal"
								variant="outlined"
								error={error}
								value={state.current}
								onChange={e =>
									set(
										produce(state, draft => {
											draft.current = e.target.value
										})
									)
								}
							/>
							<TextField
								type="password"
								label="New Password"
								margin="normal"
								variant="outlined"
								error={error}
								value={state.password}
								onChange={e =>
									set(
										produce(state, draft => {
											draft.password = e.target.value
										})
									)
								}
							/>
							<TextField
								type="password"
								label="Confirm Password"
								margin="normal"
								variant="outlined"
								error={error}
								value={state.confirm}
								onChange={e =>
									set(
										produce(state, draft => {
											draft.confirm = e.target.value
										})
									)
								}
							/>
							<Button
								className={`${classes.bt} ${classes.allset}`}
								type="submit"
								variant="contained"
							>
								Change Password
							</Button>
						</FormGroup>
					</Grid>
					<Grid item xs={8} />
				</Grid>
			</form>
		</Paper>
	)
}
export default Password
